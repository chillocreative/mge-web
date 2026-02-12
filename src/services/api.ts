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
// API SERVICE
// ============================================================

export const apiService = {
    /**
     * Fetch all engineering services.
     */
    async getServices(params?: { per_page?: number; page?: number }): Promise<PaginatedResponse<Service> | null> {
        try {
            const response = await mgeClient.get("/services", { params });
            return response.data;
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
            return response.data;
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
            return response.data;
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
