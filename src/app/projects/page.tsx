import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";
import { ArrowUpRight } from "lucide-react";
import { apiService } from "@/services/api";

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project) => (
                        <div key={project.id} className="group cursor-pointer">
                            <div className="aspect-video bg-primary mb-6 overflow-hidden relative">
                                {project.featured_image && (
                                    <div
                                        className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        style={{ backgroundImage: `url('${project.featured_image}')` }}
                                    />
                                )}
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-6 right-6 w-12 h-12 bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <ArrowUpRight className="text-white w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                                    <h3 className="text-2xl font-bold font-heading text-primary group-hover:text-accent transition-colors">{project.title}</h3>
                                    <p className="text-neutral-500 text-xs mt-2 font-bold uppercase tracking-widest">{project.location} {project.year && `\u2022 ${project.year}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Gallery Section */}
            <Section variant="industrial" className="text-center">
                <Heading level={2} className="mb-8 uppercase">Project <span className="text-accent">Gallery</span></Heading>
                <p className="text-neutral-600 mb-12 max-w-2xl mx-auto">
                    A visual deep-dive into our construction sites and completed engineering milestones across the southern region.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {gallery.map((item) => (
                        <div key={item.id} className="aspect-square bg-white border border-industrial overflow-hidden group relative">
                            {item.image && (
                                <div
                                    className="absolute inset-0 bg-cover bg-center grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                    style={{ backgroundImage: `url('${item.image.medium || item.image.url}')` }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </Section>

            <Footer />
        </main>
    );
};

export default ProjectsPage;
