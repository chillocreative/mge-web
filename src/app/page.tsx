import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/modules/Hero";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import ServiceCard from "@/components/modules/ServiceCard";
import { apiService } from "@/services/api";

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

const fallbackProjects = [
  {
    id: 1,
    slug: "",
    category: "Flood Mitigation",
    title: "Projek Pembangunan Lembangan Sungai Bersepadu Sungai Golok",
    featured_image: null,
  },
  {
    id: 2,
    slug: "",
    category: "Road Works",
    title: "Projek Menaiktaraf Jalan Muar – Tangkak – Segamat, Johor",
    featured_image: null,
  },
];

export default async function Home() {
  const [servicesRes, projectsRes] = await Promise.all([
    apiService.getServices({ per_page: 3 }),
    apiService.getProjects({ featured: "true", per_page: 6 }),
  ]);

  const services = servicesRes?.data?.length ? servicesRes.data : fallbackServices;
  const projects = projectsRes?.data?.length ? projectsRes.data : fallbackProjects;

  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero
        title="Trusted in Providing High Quality and Excellent Services"
        subtitle="Multi Green Engineering Sdn. Bhd. is a company run by a group of professional workforces, established to provide services in the Civil Engineering field specifically in Building Construction and Civil Works."
      />

      <Section>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-accent-yellow" />
              <span className="text-accent-yellow font-bold uppercase tracking-widest text-sm">Our Core Services</span>
            </div>
            <Heading level={2} className="uppercase italic tracking-tighter">
              Engineering <span className="text-primary-green">Excellence</span> & Precision
            </Heading>
          </div>
          <p className="max-w-md text-gray-600 mb-2">
            We provide multi-disciplinary engineering services designed to meet the rigorous demands of Malaysia's industrial and civil landscape.
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-primary-green relative overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200')" }}
              />
              <div className="absolute inset-0 bg-primary-green/30" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent-yellow p-12 hidden md:flex flex-col justify-center border-b-8 border-primary-green">
              <span className="text-white text-6xl font-black font-heading leading-tight italic">G7</span>
              <p className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mt-2">Highest CIDB Grade Certified</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-accent-yellow" />
              <span className="text-accent-yellow font-bold uppercase tracking-widest text-sm">Our Philosophy</span>
            </div>
            <Heading level={2} className="mb-8 uppercase tracking-tight">
              Quality <span className="text-primary-green italic">Service &</span> Efficiency
            </Heading>
            <p className="text-gray-700 mb-6 text-lg">
              Multi Green Engineering's philosophy is based on the best quality of service and efficiency. The company always strives to carry out and maintain the best style of management by promising optimum service to all.
            </p>
            <p className="text-gray-600 mb-10 leading-relaxed">
              We are committed to providing training opportunities and skills to employees, and as a company with a far-sighted mission and vision, we always maintain good relationships and communication with our customers.
            </p>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-4 bg-primary-green text-white px-10 py-5 font-bold uppercase tracking-[0.2em] hover:bg-opacity-90 transition-all duration-300"
            >
              More About Us
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center mb-16">
          <span className="text-accent-yellow font-bold uppercase tracking-[0.3em] text-xs">Our Portfolio</span>
          <Heading level={2} className="mt-4 uppercase">Featured <span className="text-primary-green italic">Projects</span></Heading>
        </div>

        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={project.slug ? `/projects/${project.slug}` : "/projects"}
                className="aspect-video bg-primary-green relative overflow-hidden group cursor-pointer block p-8 flex flex-col justify-end border-b-4 border-accent-yellow"
              >
                {project.featured_image && (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${project.featured_image}')` }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20 group-hover:from-primary group-hover:via-primary/50 transition-all duration-500" />
                <div className="relative z-10">
                  <span className="text-accent-yellow text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                  <h3 className="text-xl font-bold font-heading text-white">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="text-xs font-bold uppercase tracking-[0.2em] text-primary-green hover:text-accent-yellow border-b-2 border-accent-yellow pb-2 transition-all"
          >
            View All Projects
          </Link>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
