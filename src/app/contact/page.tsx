import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/modules/ContactForm";

export const metadata = constructMetadata({
    title: "Contact Us | Multi Green Engineering",
    description: "Get in touch with Multi Green Engineering for engineering consultations and project inquiries. Find our address, phone, and email."
});

const ContactPage = () => {
    const address = "NO 149, JALAN DATO' SIA HER YAM, 85000 SEGAMAT, JOHOR";
    const mapSrc = "https://maps.google.com/maps?q=2.5040,102.8227&hl=en&z=17&output=embed";

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="bg-primary-green pt-40 pb-20 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-[2px] bg-accent-yellow" />
                        <span className="text-accent-yellow font-bold uppercase tracking-widest text-sm">Get In Touch</span>
                    </div>
                    <Heading level={1} className="text-white uppercase italic">
                        Contact <span className="text-accent-yellow">Us</span>
                    </Heading>
                </div>
            </div>

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Info */}
                    <div className="space-y-10">
                        <div>
                            <Heading level={2} className="mb-4 uppercase tracking-tight">Our <span className="text-primary-green">Headquarters</span></Heading>
                            <p className="text-gray-600 max-w-md">
                                We welcome inquiries for new projects and consultations. Please feel free to reach out to us via phone, email, or visit our office.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-primary-green/10 text-primary-green flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-1">Office Address</h4>
                                    <p className="text-gray-600 leading-relaxed">{address}</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-primary-green/10 text-primary-green flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-1">Direct Contact</h4>
                                    <p className="text-gray-600 leading-relaxed">07-931 2689</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 bg-primary-green/10 text-primary-green flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-1">Email Inquiry</h4>
                                    <p className="text-gray-600 leading-relaxed font-bold">multigreenengineering@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="h-full min-h-[400px] lg:min-h-full w-full shadow-lg">
                        <iframe
                            src={mapSrc}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Company Location"
                        ></iframe>
                    </div>
                </div>
            </Section>

            <Section variant="industrial">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-[2px] bg-accent-yellow" />
                    <span className="text-accent-yellow font-bold uppercase tracking-widest text-sm">Send a Message</span>
                </div>
                <Heading level={2} className="mb-12 uppercase tracking-tight">
                    Project <span className="text-primary-green italic">Inquiry</span>
                </Heading>
                <div className="max-w-3xl mx-auto">
                    <ContactForm />
                </div>
            </Section>

            <Footer />
        </main>
    );
};

export default ContactPage;
