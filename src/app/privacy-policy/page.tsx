import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
    title: "Privacy Policy | Multi Green Engineering Sdn Bhd",
    description: "Privacy Policy for Multi Green Engineering Sdn Bhd. Learn how we collect, use, and protect your personal information."
});

const PrivacyPolicyPage = () => {
    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="bg-primary pt-40 pb-20">
                <div className="container-custom">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-[2px] bg-accent" />
                        <span className="text-accent font-bold uppercase tracking-widest text-sm">Legal</span>
                    </div>
                    <Heading level={1} className="text-white uppercase italic">
                        Privacy <span className="text-accent">Policy</span>
                    </Heading>
                </div>
            </div>

            <Section>
                <div className="max-w-4xl mx-auto prose prose-lg prose-neutral">
                    <p className="text-neutral-600 leading-relaxed mb-8">
                        At Multi Green Engineering Sdn Bhd, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us through our website and services.
                    </p>

                    <h3 className="text-2xl font-bold text-primary mt-12 mb-6">1. Information We Collect</h3>
                    <p className="text-neutral-600 leading-relaxed mb-4">
                        We may collect personal information such as your name, email address, phone number, and company details when you:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-600 mb-8">
                        <li>Fill out contact forms on our website.</li>
                        <li>Request a quote or project consultation.</li>
                        <li>Subscribe to our newsletters or updates.</li>
                        <li>Apply for a job or submit a vendor application.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-primary mt-12 mb-6">2. How We Use Your Information</h3>
                    <p className="text-neutral-600 leading-relaxed mb-4">
                        The information we collect is used strictly for professional purposes, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-600 mb-8">
                        <li>Responding to your inquiries and providing engineering services.</li>
                        <li>Processing project proposals and tenders.</li>
                        <li>Improving our website functionality and user experience.</li>
                        <li>Complying with legal and regulatory requirements (CIDB, PKK, etc.).</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-primary mt-12 mb-6">3. Data Security</h3>
                    <p className="text-neutral-600 leading-relaxed mb-8">
                        We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet is 100% secure.
                    </p>

                    <h3 className="text-2xl font-bold text-primary mt-12 mb-6">4. Third-Party Disclosure</h3>
                    <p className="text-neutral-600 leading-relaxed mb-8">
                        We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide you with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                    </p>

                    <h3 className="text-2xl font-bold text-primary mt-12 mb-6">5. Contact Us</h3>
                    <p className="text-neutral-600 leading-relaxed mb-8">
                        If you have any questions regarding this privacy policy, you may contact us using the information below:
                    </p>
                    <div className="bg-neutral-100 p-8 border-l-4 border-accent">
                        <p className="font-bold text-primary mb-2">Multi Green Engineering Sdn Bhd</p>
                        <p className="text-neutral-600">No. 4(4-1) Jln Jaya, Pusat Perniagaan Parit Jarum</p>
                        <p className="text-neutral-600">Bukit Gambir 84800 Tangkak, Johor</p>
                        <p className="text-neutral-600 mt-4">Email: info@mge-eng.com</p>
                    </div>
                </div>
            </Section>

            <Footer />
        </main>
    );
};

export default PrivacyPolicyPage;
