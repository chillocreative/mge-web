import React from "react";

/**
 * MGE Engineering - JSON-LD Structured Data
 * Enhances SEO by providing Google with specific data about the organization and its services.
 */

interface SchemaProps {
    type: "Organization" | "LocalBusiness" | "Service" | "WebSite";
    data: any;
}

const StructuredData = ({ type, data }: SchemaProps) => {
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": type,
        ...data,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
        />
    );
};

export const OrganizationSchema = () => (
    <StructuredData
        type="Organization"
        data={{
            name: "MGE Engineering Sdn Bhd",
            url: "https://mge-engineering.com.my",
            logo: "https://mge-engineering.com.my/logo.png",
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+60-3-1234-5678",
                contactType: "customer service",
                areaServed: "MY",
                availableLanguage: ["English", "Malay"],
            },
            sameAs: [
                "https://www.linkedin.com/company/mge-engineering",
                "https://www.facebook.com/mgeengineering",
            ],
        }}
    />
);

export default StructuredData;
