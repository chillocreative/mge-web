import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Briefcase, DollarSign, FileText, Tag } from "lucide-react";
import { apiService, Project } from "@/services/api";
import GalleryLightbox from "@/components/modules/GalleryLightbox";

export async function generateStaticParams() {
  const response = await apiService.getProjects({ per_page: 100 }).catch(() => null);
  const projects = response?.data ?? [];
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await apiService.getProjects({ per_page: 100 }).catch(() => null);
  const project = response?.data?.find((p: Project) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found | Multi Green Engineering" };
  }

  return {
    title: `${project.title} | Multi Green Engineering`,
    description: project.excerpt || `${project.title} — an engineering project by Multi Green Engineering Sdn Bhd.`,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await apiService.getProjects({ per_page: 100 }).catch(() => null);
  const projects = response?.data ?? [];
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 4);

  const details = [
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Calendar, label: "Year", value: project.year },
    { icon: Tag, label: "Category", value: project.category },
    { icon: Briefcase, label: "Client", value: project.client },
    { icon: DollarSign, label: "Project Value (RM)", value: project.value },
    { icon: FileText, label: "Scope of Work", value: project.scope },
  ].filter((d) => d.value);

  const galleryImages = project.gallery?.map((img, i) => ({
    id: img.id || i,
    title: img.alt || project.title,
    url: img.medium || img.url,
    large: img.large || img.url,
  })) ?? [];

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="bg-primary pt-40 pb-20 relative overflow-hidden">
        {project.featured_image && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
            style={{ backgroundImage: `url('${project.featured_image}')` }}
          />
        )}
        <div className="container-custom relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-8 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>
          <div className="flex items-center gap-3 mb-4">
            {project.category && (
              <span className="text-accent text-xs font-bold uppercase tracking-widest">{project.category}</span>
            )}
          </div>
          <Heading level={1} className="text-white uppercase italic">
            {project.title}
          </Heading>
          {(project.location || project.year) && (
            <p className="text-white/60 text-sm mt-4 uppercase tracking-widest font-bold">
              {project.location}{project.location && project.year && " \u2022 "}{project.year}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            {project.featured_image && (
              <div className="aspect-video mb-10 overflow-hidden border border-industrial">
                <img
                  src={project.featured_image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Description */}
            {project.description ? (
              <div
                className="prose prose-lg max-w-none text-neutral-700"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            ) : project.excerpt ? (
              <p className="text-neutral-600 leading-relaxed text-lg">{project.excerpt}</p>
            ) : null}

            {/* Project Gallery */}
            {galleryImages.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold font-heading text-primary mb-6 uppercase">Project Gallery</h3>
                <GalleryLightbox images={galleryImages} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Project Details Card */}
            {details.length > 0 && (
              <div className="bg-primary p-8 mb-8">
                <h4 className="text-white font-bold font-heading uppercase text-sm tracking-widest mb-6 border-b border-white/10 pb-4">
                  Project Details
                </h4>
                <div className="space-y-5">
                  {details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <detail.icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">{detail.label}</p>
                        <p className="text-white font-medium">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
              <div className="border border-industrial p-8 mb-8">
                <h4 className="font-bold font-heading text-primary uppercase text-sm tracking-widest mb-6">Other Projects</h4>
                <div className="space-y-4">
                  {otherProjects.map((p) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.slug}`}
                      className="block text-neutral-600 hover:text-accent transition-colors text-sm font-medium"
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="p-8 border border-industrial">
              <h4 className="font-bold font-heading text-primary uppercase text-sm tracking-widest mb-4">Start Your Project</h4>
              <p className="text-neutral-600 text-sm mb-6">
                Have a similar project in mind? Let us help you bring it to life.
              </p>
              <Link
                href="/contact"
                className="block text-center bg-accent text-white px-6 py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
