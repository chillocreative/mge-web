import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";
import { apiService } from "@/services/api";
import GalleryLightbox from "@/components/modules/GalleryLightbox";
import ProjectCards from "@/components/modules/ProjectCards";

export const metadata = constructMetadata({
    title: "Our Engineering Projects | Multi Green Engineering",
    description: "Explore the portfolio of infrastructure and industrial engineering projects completed by Multi Green Engineering across Malaysia."
});

const ProjectsPage = async () => {
    const [projectsResponse, galleryResponse] = await Promise.all([
        apiService.getProjects().catch(() => null),
        apiService.getGallery({ per_page: 10 }).catch(() => null),
    ]);

    const projects = projectsResponse?.data ?? [];
    const gallery = galleryResponse?.data ?? [];

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="bg-primary pt-40 pb-20">
                <div className="container-custom">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-[2px] bg-accent" />
                        <span className="text-accent font-bold uppercase tracking-widest text-sm">Our Portfolio</span>
                    </div>
                    <Heading level={1} className="text-white uppercase italic">
                        Engineering <span className="text-accent">Projects</span>
                    </Heading>
                </div>
            </div>

            <Section>
                <ProjectCards
                    projects={projects.map((p) => ({
                        id: p.id,
                        title: p.title,
                        slug: p.slug,
                        category: p.category,
                        location: p.location,
                        year: p.year,
                        featured_image: p.featured_image,
                    }))}
                />
            </Section>

            {/* Gallery Section */}
            <Section variant="industrial" className="text-center">
                <Heading level={2} className="mb-8 uppercase">Project <span className="text-accent">Gallery</span></Heading>
                <p className="text-neutral-600 mb-12 max-w-2xl mx-auto">
                    A visual deep-dive into our construction sites and completed engineering milestones across the southern region.
                </p>
                <GalleryLightbox
                    images={gallery
                        .filter((item) => item.image)
                        .map((item) => ({
                            id: item.id,
                            title: item.title,
                            url: item.image!.medium || item.image!.url,
                            large: item.image!.large || item.image!.url,
                        }))}
                />
            </Section>

            <Footer />
        </main>
    );
};

export default ProjectsPage;
