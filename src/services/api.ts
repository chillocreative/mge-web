import axios, { AxiosInstance, AxiosError } from "axios";

/**
 * Multi Green Engineering - API Service Layer
 * Connects to the Headless WordPress REST API backend.
 *
 * Two API bases:
 * - WP REST API: /wp-json/wp/v2/  (standard WordPress endpoints)
 * - MGE Custom:  /wp-json/mge/v1/ (custom formatted endpoints)
 */

// WordPress base URL (without /wp-json suffix)
const WP_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://mge-cms.test";

// Custom MGE API base
const MGE_API_URL = `${WP_BASE_URL}/wp-json/mge/v1`;

// Standard WP REST API base
const WP_API_URL = `${WP_BASE_URL}/wp-json/wp/v2`;

/**
 * Axios client for custom MGE endpoints (clean formatted responses).
 */
const mgeClient: AxiosInstance = axios.create({
    baseURL: MGE_API_URL,
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Axios client for standard WP REST API endpoints.
 */
const wpClient: AxiosInstance = axios.create({
    baseURL: WP_API_URL,
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Cache-bust every WP API request with a unique timestamp param.
 *
 * Why: the headless plugin sets `Cache-Control: public, s-maxage=600`
 * on /wp-json/mge/v1/* responses, and LiteSpeed (in front of WordPress)
 * happily caches them at the edge. When CI builds the static export it
 * fetches against that LiteSpeed cache and can get a 10-minute-stale
 * response — e.g. a freshly-published service is missing, so the build
 * silently generates a site without it. Adding `_t=Date.now()` to the
 * query string forces a unique URL on every request, which the cache
 * cannot match, guaranteeing a fresh response.
 *
 * No-op for the runtime (this is a static export, the only consumers
 * are the build process and any in-browser admin tools).
 */
const attachCacheBust = (config: import("axios").InternalAxiosRequestConfig) => {
    config.params = { ...(config.params ?? {}), _t: Date.now() };
    return config;
};
mgeClient.interceptors.request.use(attachCacheBust);
wpClient.interceptors.request.use(attachCacheBust);

/**
 * Unified error handler.
 */
const handleApiError = (error: AxiosError) => {
    if (error.response) {
        console.error(`API Error [${error.response.status}]:`, error.response.data);
    } else if (error.request) {
        console.error("API Error: No response from server.");
    } else {
        console.error("API Error:", error.message);
    }
    return null;
};

// ============================================================
// TYPE DEFINITIONS
// ============================================================

export interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    excerpt: string;
    icon: string;
    short_description: string;
    features: string[];
    display_order: number;
    featured_image: string | null;
}

export interface ProjectImage {
    id: number;
    url: string;
    alt: string;
    thumbnail: string;
    medium: string;
    large: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    excerpt: string;
    category: string;
    categories: string[];
    location: string;
    start_date: string;
    year: string;
    client: string;
    value: string;
    scope: string;
    status: string;
    featured: boolean;
    gallery: ProjectImage[];
    featured_image: string | null;
    date: string;
}

export interface GalleryItem {
    id: number;
    title: string;
    caption: string;
    image: {
        url: string;
        alt: string;
        width: number;
        height: number;
        thumbnail: string;
        medium: string;
        large: string;
    } | null;
    project_id: number | null;
    display_order: number;
    category: string[];
}

export interface CertificateDetail {
    label: string;
    value: string;
}

export interface Certificate {
    id: number;
    title: string;
    slug: string;
    icon: string;
    category: string;
    issuer: string;
    summary: string;
    details: CertificateDetail[];
    status: string;
    display_order: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    pages: number;
    page: number;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}

// ============================================================
// HELPERS
// ============================================================

function decodeHtmlEntities(text: string): string {
    return text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;/g, "'")
        .replace(/&apos;/g, "'");
}

function decodeFields<T>(item: T, fields: (keyof T)[]): T {
    const result = { ...item };
    for (const field of fields) {
        if (typeof result[field] === "string") {
            (result[field] as string) = decodeHtmlEntities(result[field] as string);
        }
    }
    return result;
}

// ============================================================
// RETRY HELPER
// ============================================================

/**
 * Retry an API call up to N times with linear backoff.
 *
 * Why: at build time the GitHub Actions runner is occasionally
 * rate-limited or briefly blocked by the WordPress host's protection
 * (Imunify Security on cPanel). A single transient block fails the
 * entire static export build even though the API is healthy seconds
 * later. Retrying gives the build a chance to recover.
 *
 * The wrapped function should already swallow errors and return null
 * on failure (apiService.getX methods do this) — withApiRetry just
 * keeps trying until a non-null result comes back or attempts run out.
 */
export async function withApiRetry<T>(
    fn: () => Promise<T | null>,
    attempts = 5,
    baseDelayMs = 2000,
): Promise<T | null> {
    for (let i = 0; i < attempts; i++) {
        const result = await fn();
        if (result) return result;
        if (i < attempts - 1) {
            await new Promise((resolve) => setTimeout(resolve, baseDelayMs * (i + 1)));
        }
    }
    return null;
}

// ============================================================
// API SERVICE
// ============================================================

export const apiService = {
    /**
     * Fetch all engineering services.
     */
    async getServices(params?: { per_page?: number; page?: number }): Promise<PaginatedResponse<Service> | null> {
        try {
            const response = await mgeClient.get("/services", { params });
            const data = response.data as PaginatedResponse<Service>;
            data.data = data.data.map((s) => decodeFields(s, ["title", "description", "excerpt", "short_description"]));
            return data;
        } catch (error) {
            return handleApiError(error as AxiosError);
        }
    },

    /**
     * Fetch projects with optional filters.
     */
    async getProjects(params?: {
        per_page?: number;
        page?: number;
        category?: string;
        featured?: string;
    }): Promise<PaginatedResponse<Project> | null> {
        try {
            const response = await mgeClient.get("/projects", { params });
            const data = response.data as PaginatedResponse<Project>;
            data.data = data.data.map((p) => decodeFields(p, ["title", "description", "excerpt", "category", "client", "scope"]));
            return data;
        } catch (error) {
            return handleApiError(error as AxiosError);
        }
    },

    /**
     * Fetch gallery images with optional filters.
     */
    async getGallery(params?: {
        per_page?: number;
        page?: number;
        category?: string;
        project_id?: number;
    }): Promise<PaginatedResponse<GalleryItem> | null> {
        try {
            const response = await mgeClient.get("/gallery", { params });
            const data = response.data as PaginatedResponse<GalleryItem>;
            data.data = data.data.map((g) => decodeFields(g, ["title", "caption"]));
            return data;
        } catch (error) {
            return handleApiError(error as AxiosError);
        }
    },

    /**
     * Fetch all certificates.
     */
    async getCertificates(params?: { per_page?: number; page?: number }): Promise<PaginatedResponse<Certificate> | null> {
        try {
            const response = await mgeClient.get("/certificates", { params });
            const data = response.data as PaginatedResponse<Certificate>;
            data.data = data.data.map((c) => decodeFields(c, ["title", "category", "issuer", "summary", "status"]));
            return data;
        } catch (error) {
            return handleApiError(error as AxiosError);
        }
    },

    /**
     * Fetch a WordPress page by slug.
     */
    async getPage(slug: string) {
        try {
            const response = await wpClient.get(`/pages`, {
                params: { slug, _embed: true },
            });
            return response.data[0] || null;
        } catch (error) {
            return handleApiError(error as AxiosError);
        }
    },

    /**
     * Submit contact form.
     */
    async submitContactForm(data: ContactFormData) {
        try {
            const response = await mgeClient.post("/contact", data);
            return response.data;
        } catch (error) {
            return handleApiError(error as AxiosError);
        }
    },
};

export default apiService;
