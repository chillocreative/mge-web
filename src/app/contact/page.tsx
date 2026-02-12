import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/modules/ContactForm";

export const metadata = constructMetadata({
    title: "Contact Us | Multi Green Engineering",
    description: "Get in touch with Multi Green Engineering for engineering consultations and project inquiries."
});

const ContactPage = () => {
    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="bg-primary pt-40 pb-20">
                <div className="container-custom">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-[2px] bg-accent" />
                        <span className="text-accent font-bold uppercase tracking-widest text-sm">Get In Touch</span>
                    </div>
                    <Heading level={1} className="text-white uppercase italic">
                        Contact <span className="text-accent">Us</span>
                    </Heading>
                </div>
            </div>

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <Heading level={2} className="mb-6 uppercase tracking-tight">Multi Green <span className="text-accent">Engineering</span> HQ</Heading>
                            <p className="text-neutral-600 mb-8 max-w-md">
                                Have a project in mind? Our expert engineering team is ready to discuss your requirements and provide a professional consultation.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-industrial flex items-center justify-center shrink-0">
                                    <MapPin className="text-accent w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary uppercase text-xs tracking-widest mb-2">Office Address</h4>
                                    <p className="text-neutral-600 leading-relaxed">
                                        No. 4(4-1) Jln Jaya, Pusat Perniagaan Parit Jarum,<br />
                                        Bukit Gambir 84800 Tangkak,<br />
                                        Johor Darul Takzim.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-industrial flex items-center justify-center shrink-0">
                                    <Phone className="text-accent w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary uppercase text-xs tracking-widest mb-2">Direct Contact</h4>
                                    <p className="text-neutral-600 leading-relaxed">+60 7-965 4XXX</p>
                                    <p className="text-neutral-400 text-sm mt-1">Mon - Fri, 9am - 6pm</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-industrial flex items-center justify-center shrink-0">
                                    <Mail className="text-accent w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary uppercase text-xs tracking-widest mb-2">Email Inquiry</h4>
                                    <p className="text-neutral-600 leading-relaxed font-bold">info@mge-eng.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-primary/5 border-l-4 border-accent">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-5 h-5 text-accent" />
                                <h4 className="font-bold text-primary uppercase text-xs tracking-wider">Operational Hours</h4>
                            </div>
                            <p className="text-sm text-neutral-600">Our engineering support and site management teams are available Monday through Friday for scheduled consultations.</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <ContactForm />
                </div>
            </Section>

            <Footer />
        </main>
    );
};

export default ContactPage;
