import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";
import ServiceCard from "@/components/modules/ServiceCard";
import { apiService } from "@/services/api";

export const metadata = constructMetadata({
    title: "Engineering Services | Multi Green Engineering",
    description: "Quality engineering certifications and services including G7 grade water piping, civil infrastructure, and mechanical systems."
});

const ServicesPage = async () => {
    const response = await apiService.getServices().catch(() => null);
    const services = response?.data ?? [];

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="bg-primary pt-40 pb-20">
                <div className="container-custom">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-[2px] bg-accent" />
                        <span className="text-accent font-bold uppercase tracking-widest text-sm">Industrial Excellence</span>
                    </div>
                    <Heading level={1} className="text-white uppercase italic">
                        Our <span className="text-accent">Services</span>
                    </Heading>
                </div>
            </div>

            <Section>
                <div className="max-w-3xl mb-16">
                    <h3 className="text-3xl font-bold text-primary font-heading mb-6">CIDB G7 & PKK Class 'A' <span className="text-accent">Capability</span></h3>
                    <p className="text-neutral-600 leading-relaxed text-lg">
                        Multi Green Engineering is authorized to undertake engineering projects of unlimited value. Our multi-disciplinary approach ensures that we can handle all aspects of civil, mechanical, and electrical works under one roof.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            description={service.short_description || service.excerpt}
                            icon={service.icon}
                            href={`/services/${service.slug}`}
                            index={index}
                        />
                    ))}
                </div>
            </Section>

            {/* Specialized Engineering Highlights */}
            <Section variant="industrial" className="border-t border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Specialized Capacity</span>
                        <Heading level={2} className="mb-8 uppercase">G7 Water <span className="text-primary italic">Infrastructure</span></Heading>
                        <div className="space-y-6">
                            <div className="flex gap-4 p-6 bg-white border border-industrial">
                                <div className="w-2 bg-accent" />
                                <p className="text-neutral-600 text-sm">Large-scale water transport pipelines for state utilities and regional distribution networks.</p>
                            </div>
                            <div className="flex gap-4 p-6 bg-white border border-industrial">
                                <div className="w-2 bg-accent" />
                                <p className="text-neutral-600 text-sm">Installation of high-capacity water reservoirs and pumping station maintenance.</p>
                            </div>
                        </div>
                    </div>
                    <div className="aspect-video bg-primary overflow-hidden relative grayscale brightness-50">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800')" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <p className="text-white text-3xl font-black font-heading uppercase tracking-tighter italic text-center">Engineered For Johor's Infrastructure</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Footer />
        </main>
    );
};

export default ServicesPage;
