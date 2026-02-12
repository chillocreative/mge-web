import { Metadata } from "next";

/**
 * Multi Green Engineering - SEO & Metadata configuration
 * Standardized SEO structure for CIDB G7 engineering firm visibility.
 */

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
}

export function constructMetadata({
    title = "Multi Green Engineering Sdn Bhd | CIDB G7 & PKK Class 'A' Certified",
    description = "Leading provider of civil, mechanical, and electrical engineering services in Malaysia. CIDB G7 & PKK Class 'A' certified specialists in industrial infrastructure and water piping systems.",
    image = "/og-image.jpg",
    noIndex = false,
}: SEOProps = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
            type: "website",
            siteName: "Multi Green Engineering",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@multigreeneng",
        },
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon.png",
            apple: "/apple-touch-icon.png",
        },
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mge-eng.com"),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
