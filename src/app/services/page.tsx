import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";
import ServiceCard from "@/components/modules/ServiceCard";
import { HardHat, Wrench, Truck, Shovel, Construction } from "lucide-react";
import { apiService } from "@/services/api";

export const metadata = constructMetadata({
    title: "Engineering Services | Multi Green Engineering",
    description: "Our core services include Building Construction, Civil Engineering Works, and Mechanical & Electrical services, backed by a comprehensive fleet of heavy machinery."
});

const fallbackServices = [
    {
        id: 1,
        title: "Building Construction",
        slug: "building-construction",
        description: "Comprehensive construction services for building projects, managed by a professional and high-skilled workforce.",
        icon: "hardhat",
        featured_image: null,
    },
    {
        id: 2,
        title: "Civil Engineering Works",
        slug: "civil-engineering-works",
        description: "Providing a wide range of civil engineering solutions, from infrastructure to specialized civil works.",
        icon: "wrench",
        featured_image: null,
    },
    {
        id: 3,
        title: "Mechanical & Electrical",
        slug: "mechanical-electrical",
        description: "Specialized in mechanical and electrical engineering services to support complex industrial and commercial projects.",
        icon: "zap",
        featured_image: null,
    },
];

const machinery = [
    { name: "Excavators", icon: Shovel },
    { name: "Mining & Tipper Trucks", icon: Truck },
    { name: "Bulldozers", icon: Construction },
    { name: "Compactors", icon: Wrench },
    { name: "Tractors & Backhoes", icon: HardHat },
    { name: "Tunnel Boring Machines", icon: Shovel },
];

const ServicesPage = async () => {
    const servicesRes = await apiService.getServices({ per_page: 100 });
    const services = servicesRes?.data?.length ? servicesRes.data : fallbackServices;

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="bg-primary-green pt-40 pb-20 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-[2px] bg-accent-yellow" />
                        <span className="text-accent-yellow font-bold uppercase tracking-widest text-sm">Our Expertise</span>
                    </div>
                    <Heading level={1} className="text-white uppercase italic">
                        Our <span className="text-accent-yellow">Services</span>
                    </Heading>
                </div>
            </div>

            <Section>
                <div className="max-w-3xl mb-16 text-center mx-auto">
                    <Heading level={2} className="text-primary-green font-heading mb-4">Core Capabilities</Heading>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        As a CIDB G7 certified company, Multi Green Engineering is authorized to undertake engineering projects of unlimited value. Our multi-disciplinary approach ensures that we can handle all aspects of civil, mechanical, and electrical works under one roof.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.title}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            href={`/services/${service.slug}`}
                            featuredImage={service.featured_image}
                            index={index}
                        />
                    ))}
                </div>
            </Section>

            <Section variant="industrial">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="flex items-center gap-3 mb-4 justify-center">
                        <div className="w-10 h-[2px] bg-accent-yellow" />
                        <span className="text-accent-yellow font-bold uppercase tracking-widest text-sm">Our Assets</span>
                        <div className="w-10 h-[2px] bg-accent-yellow" />
                    </div>
                    <Heading level={2} className="mb-6 uppercase">
                        Equipment & <span className="text-primary-green italic">Machinery</span>
                    </Heading>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our extensive fleet of heavy machinery and equipment ensures that we have the right tools for any project, guaranteeing efficiency and quality from the ground up.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
                    {machinery.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.name} className="bg-white p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                                <Icon className="w-10 h-10 text-primary-green mx-auto mb-4" />
                                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            </div>
                        );
                    })}
                </div>
            </Section>

            <Footer />
        </main>
    );
};

export default ServicesPage;
