import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { apiService, Service } from "@/services/api";

export async function generateStaticParams() {
  const response = await apiService.getServices({ per_page: 100 }).catch(() => null);
  const services = response?.data ?? [];
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await apiService.getServices({ per_page: 100 }).catch(() => null);
  const service = response?.data?.find((s: Service) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found | Multi Green Engineering" };
  }

  return {
    title: `${service.title} | Multi Green Engineering`,
    description: service.short_description || service.excerpt || `${service.title} engineering services by Multi Green Engineering Sdn Bhd.`,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await apiService.getServices({ per_page: 100 }).catch(() => null);
  const services = response?.data ?? [];
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const otherServices = services.filter((s) => s.id !== service.id);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="bg-primary pt-40 pb-20 relative overflow-hidden">
        {service.featured_image && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
            style={{ backgroundImage: `url('${service.featured_image}')` }}
          />
        )}
        <div className="container-custom relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-8 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
          <Heading level={1} className="text-white uppercase italic">
            {service.title}
          </Heading>
          {service.short_description && (
            <p className="text-white/70 text-lg mt-6 max-w-2xl">
              {service.short_description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            {service.description ? (
              <div
                className="prose prose-lg max-w-none text-neutral-700"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            ) : (
              <div className="text-neutral-600 leading-relaxed text-lg">
                <p>
                  Multi Green Engineering provides professional {service.title.toLowerCase()} services
                  backed by our CIDB G7 and PKK Class &apos;A&apos; certifications. Our team delivers
                  precision-engineered solutions for industrial and infrastructure projects across Malaysia.
                </p>
              </div>
            )}

            {service.features.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold font-heading text-primary mb-6 uppercase">Key Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-industrial/30 border border-industrial">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {service.featured_image && (
              <div className="aspect-[4/3] mb-8 overflow-hidden border border-industrial">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${service.featured_image}')` }}
                />
              </div>
            )}

            {otherServices.length > 0 && (
              <div className="bg-primary p-8">
                <h4 className="text-white font-bold font-heading uppercase text-sm tracking-widest mb-6">Other Services</h4>
                <div className="space-y-4">
                  {otherServices.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      className="block text-white/70 hover:text-accent transition-colors text-sm font-medium"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 p-8 border border-industrial">
              <h4 className="font-bold font-heading text-primary uppercase text-sm tracking-widest mb-4">Get a Quote</h4>
              <p className="text-neutral-600 text-sm mb-6">
                Need {service.title.toLowerCase()} for your project? Contact our team for a consultation.
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
