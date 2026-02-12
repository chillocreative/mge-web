import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/modules/Hero";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import ServiceCard from "@/components/modules/ServiceCard";
import Link from "next/link";
import { ArrowUpRight, Activity } from "lucide-react";
import { apiService } from "@/services/api";

export default async function Home() {
  const [servicesResponse, projectsResponse] = await Promise.all([
    apiService.getServices({ per_page: 6 }).catch(() => null),
    apiService.getProjects({ featured: "true", per_page: 4 }).catch(() => null),
  ]);

  const services = servicesResponse?.data ?? [];
  const projects = projectsResponse?.data ?? [];

  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero
        title="Building the Future of Infrastructure."
        subtitle="Multi Green Engineering Sdn Bhd is a CIDB G7 & PKK Class 'A' certified firm delivering premium civil, mechanical, and electrical engineering solutions across Johor and Malaysia."
      />

      <Section variant="industrial">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-accent" />
              <span className="text-accent font-bold uppercase tracking-widest text-sm">Specialized Expertise</span>
            </div>
            <Heading level={2} className="uppercase italic tracking-tighter">
              Engineering <span className="text-accent">Excellence</span> & Precision
            </Heading>
          </div>
          <p className="max-w-md text-neutral mb-2">
            We provide multi-disciplinary engineering services designed to meet the rigorous demands of Malaysia's growing industrial landscape.
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
              featuredImage={service.featured_image}
            />
          ))}
        </div>
      </Section>

      {/* About Overview Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            {/* Abstract placeholder for industrial image */}
            <div className="aspect-[4/5] bg-primary relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center grayscale contrast-125 opacity-50 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent p-12 hidden md:flex flex-col justify-center border-b-8 border-primary">
              <span className="text-white text-6xl font-black font-heading leading-tight italic">G7</span>
              <p className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mt-2">Highest CIDB Grade Certified</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-accent" />
              <span className="text-accent font-bold uppercase tracking-widest text-sm">Our Legacy</span>
            </div>
            <Heading level={2} className="mb-8 uppercase tracking-tight">
              Johor's Trusted <span className="text-primary italic">Engineering</span> Partner
            </Heading>
            <p className="text-neutral mb-6 text-lg">
              Based in Tangkak, Johor, Multi Green Engineering Sdn Bhd has established itself as a cornerstone of engineering reliability in the region.
            </p>
            <p className="text-neutral mb-10 leading-relaxed">
              With our CIDB G7 and PKK Class 'A' certifications, we are fully equipped and authorized to handle engineering projects of unlimited value. Our expertise in large-scale water piping installation and industrial infrastructure makes us the preferred choice for government and private sector partnerships.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="text-accent font-black text-3xl mb-1 italic">Johor</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-primary font-heading">Base of Operations</p>
              </div>
              <div>
                <h4 className="text-accent font-black text-3xl mb-1 italic">Class 'A'</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-primary font-heading">PKK Certification</p>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all duration-300"
            >
              Our Full History
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Featured Projects Section */}
      {projects.length > 0 && (
        <Section variant="industrial" className="border-t border-industrial">
          <div className="text-center mb-16">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs">Visual Portfolio</span>
            <Heading level={2} className="mt-4 uppercase">Featured <span className="text-accent italic">Projects</span></Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="aspect-square bg-white relative overflow-hidden group cursor-pointer border border-industrial">
                {project.featured_image && (
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    style={{ backgroundImage: `url('${project.featured_image}')` }}
                  />
                )}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div>
                    <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                    <h3 className="text-xl font-bold font-heading text-white">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-accent border-b-2 border-accent pb-2 transition-all"
            >
              View Full Gallery
            </Link>
          </div>
        </Section>
      )}

      {/* Fallback gallery when no projects from API */}
      {projects.length === 0 && (
        <Section variant="industrial" className="border-t border-industrial">
          <div className="text-center mb-16">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs">Visual Portfolio</span>
            <Heading level={2} className="mt-4 uppercase">Project <span className="text-accent italic">Gallery</span></Heading>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-white relative overflow-hidden group cursor-pointer border border-industrial">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600&sig=${i}')` }}
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Activity className="text-white w-8 h-8" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-accent border-b-2 border-accent pb-2 transition-all"
            >
              View Full Gallery
            </Link>
          </div>
        </Section>
      )}

      <Footer />
    </main>
  );
}
