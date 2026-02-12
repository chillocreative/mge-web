import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";
import { CheckCircle2, Award, Users, Building2 } from "lucide-react";

export const metadata = constructMetadata({
  title: "About Us | Multi Green Engineering Sdn Bhd",
  description: "Learn about the history and certifications of Multi Green Engineering, a CIDB G7 & PKK Class 'A' certified firm in Johor."
});

const AboutPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Page Header */}
      <div className="bg-primary pt-40 pb-20">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-accent" />
            <span className="text-accent font-bold uppercase tracking-widest text-sm">Industrial Leadership</span>
          </div>
          <Heading level={1} className="text-white uppercase italic">
            About <span className="text-accent">Our Firm</span>
          </Heading>
        </div>
      </div>

      {/* Content Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <Heading level={2} className="uppercase tracking-tight">
              Multi Green <span className="text-primary italic">Engineering</span>
            </Heading>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Established in 2010, Multi Green Engineering Sdn Bhd has grown from a regional Johor service provider into a nationally recognized G7 engineering firm.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Our headquarters in Bukit Gambir, Tangkak, serves as the nerve center for our operations across Malaysia. We specialize in complex civil engineering infrastructure, high-pressure water piping systems, and industrial mechanical installations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="flex gap-4 p-6 bg-industrial/30 border-l-4 border-accent">
                <Award className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-primary uppercase text-xs tracking-wider mb-2">CIDB Certification</h4>
                  <p className="text-sm font-semibold">G7 Grade (Unlimited Value)</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-industrial/30 border-l-4 border-accent">
                <CheckCircle2 className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-primary uppercase text-xs tracking-wider mb-2">PKK Certification</h4>
                  <p className="text-sm font-semibold">Class 'A' Certified</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-primary relative overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-8 shadow-xl max-w-xs border-t-4 border-accent">
              <p className="text-primary font-bold italic text-sm">
                "Engineering precision with unwavering integrity since 2010."
              </p>
              <p className="text-accent text-[10px] font-black uppercase tracking-widest mt-4">— Executive Management</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Values / Stats */}
      <Section variant="industrial" className="border-y border-white/5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-accent flex items-center justify-center mx-auto mb-6">
              <Building2 className="text-white w-8 h-8" />
            </div>
            <h4 className="text-4xl font-black text-primary">15+</h4>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Years Industry Experience</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-accent flex items-center justify-center mx-auto mb-6">
              <Users className="text-white w-8 h-8" />
            </div>
            <h4 className="text-4xl font-black text-primary">100+</h4>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Engineering Professionals</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-accent flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-white w-8 h-8" />
            </div>
            <h4 className="text-4xl font-black text-primary">500k+</h4>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Meters of Pipe Installed</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-accent flex items-center justify-center mx-auto mb-6">
              <Award className="text-white w-8 h-8" />
            </div>
            <h4 className="text-4xl font-black text-primary">G7</h4>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Highest Project Capacity</p>
          </div>
        </div>
      </Section>

      {/* Location Section */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <Heading level={2} className="uppercase italic tracking-tighter mb-8">
            Our <span className="text-accent">Headquarters</span>
          </Heading>
          <div className="p-10 border-2 border-industrial bg-white shadow-2xl">
            <p className="text-2xl font-bold text-primary mb-4 font-heading">Johor Darul Takzim</p>
            <p className="text-neutral-600 leading-[2] text-lg uppercase tracking-wider">
              No. 4(4-1) Jln Jaya,<br />
              Pusat Perniagaan Parit Jarum,<br />
              Bukit Gambir 84800 Tangkak,<br />
              Johor.
            </p>
            <div className="w-20 h-1 bg-accent mx-auto mt-8" />
            <p className="mt-8 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Strategic Hub for Southern Region Infrastructure</p>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
};

export default AboutPage;
