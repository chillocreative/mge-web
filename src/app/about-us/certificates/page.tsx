import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";
import { Building2, BadgeCheck, Star, ShieldCheck, ClipboardCheck, Landmark, RadioTower, ArrowLeft } from "lucide-react";

export const metadata = constructMetadata({
    title: "Certificates | Multi Green Engineering Sdn Bhd",
    description:
        "Official certifications and registrations held by Multi Green Engineering Sdn Bhd — CIDB Grade G7, ISO 9001:2015, PKK Bumiputera status, and TM registered supplier.",
});

const certificates = [
    {
        icon: Building2,
        category: "Incorporation",
        name: "Form 13 — Certificate of Incorporation",
        issuer: "Companies Commission of Malaysia (SSM)",
        summary:
            "Certifies the incorporation and change of company name to Multi Green Engineering Sdn. Bhd. under the Companies Act 2016.",
        details: [
            { label: "Company No.", value: "201401009201 (1085279-D)" },
            { label: "Incorporated", value: "18 March 2014" },
            { label: "Issued", value: "8 September 2025" },
        ],
        status: "Registered company since 2014",
    },
    {
        icon: BadgeCheck,
        category: "Quality Management",
        name: "ISO 9001:2015 Certification",
        issuer: "LMS Assessments Limited",
        summary:
            "Certifies that the quality management system for the construction of civil engineering and building services conforms to the ISO 9001:2015 standard.",
        details: [
            { label: "Certificate No.", value: "MY250412014" },
            { label: "Registered", value: "12 April 2025" },
            { label: "Recertification", value: "11 April 2028" },
        ],
        status: "Valid through 11 April 2028",
    },
    {
        icon: Star,
        category: "Capability Rating",
        name: "CIDB SCORE — Certificate of Achievement",
        issuer: "CIDB Malaysia & SME Corp Malaysia",
        summary:
            "Awards a 3-Star SCORE rating, recognising the company's management and technical capability, best-practice compliance, and project management.",
        details: [
            { label: "Grade", value: "G7" },
            { label: "Rating", value: "3 Star" },
            { label: "Assessment Year", value: "2025" },
        ],
        status: "Valid until 1 July 2027",
    },
    {
        icon: ShieldCheck,
        category: "Bumiputera Status",
        name: "PKK Sijil Taraf Bumiputera",
        issuer: "Pusat Khidmat Kontraktor (KUSKOP)",
        summary:
            "Recognises Multi Green Engineering as a Bumiputera-status work contractor, eligible for Bumiputera-allocated government tenders.",
        details: [
            { label: "Registration No.", value: "0120140925-WP158961" },
            { label: "Grade", value: "G7 — B · CE · ME" },
            { label: "Valid Until", value: "2 January 2029" },
        ],
        status: "Valid until 2 January 2029",
    },
    {
        icon: ClipboardCheck,
        category: "Contractor Registration",
        name: "CIDB Perakuan Pendaftaran Kontraktor (PPK)",
        issuer: "CIDB Malaysia",
        summary:
            "Registers the company as a Grade G7 contractor authorised to undertake construction projects of unlimited value across building, civil, and M&E works.",
        details: [
            { label: "Registration No.", value: "0120140925-WP158961" },
            { label: "Grade", value: "G7 — B · CE · ME" },
            { label: "Status", value: "Active" },
        ],
        status: "Active · valid until 2 January 2029",
    },
    {
        icon: Landmark,
        category: "Government Procurement",
        name: "CIDB Sijil Perolehan Kerja Kerajaan (SPPK)",
        issuer: "CIDB Malaysia",
        summary:
            "Certifies eligibility to tender for and carry out Malaysian government construction works in the building, civil engineering, and mechanical & electrical categories.",
        details: [
            { label: "Registration No.", value: "0120140925-WP158961" },
            { label: "Categories", value: "Building · Civil · M&E" },
            { label: "Grade", value: "G7" },
        ],
        status: "Valid until 2 January 2029",
    },
    {
        icon: RadioTower,
        category: "Registered Supplier",
        name: "TM Group Registered Supplier",
        issuer: "Telekom Malaysia Berhad",
        summary:
            "Approved registration as a TM Group Registered Supplier, qualifying the company to provide supplies and services to the TM Group of Companies.",
        details: [
            { label: "Approved", value: "15 September 2019" },
            { label: "Scope", value: "Supplies & services" },
        ],
        status: "Approved supplier since 2019",
    },
];

const CertificatesPage = () => {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Page Header */}
            <div className="bg-primary-green pt-40 pb-20 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <Link
                        href="/about-us"
                        className="inline-flex items-center gap-2 text-accent-yellow text-xs font-bold uppercase tracking-widest mb-8 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        About Us
                    </Link>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-[2px] bg-accent-yellow" />
                        <span className="text-accent-yellow font-bold uppercase tracking-widest text-sm">Accreditations</span>
                    </div>
                    <Heading level={1} className="text-white uppercase italic">
                        Our <span className="text-accent-yellow">Certificates</span>
                    </Heading>
                    <p className="text-white/70 text-lg mt-6 max-w-2xl">
                        Multi Green Engineering Sdn. Bhd. holds a full suite of statutory and industry
                        certifications — every credential current, recognised, and verifiable.
                    </p>
                </div>
            </div>

            {/* Certificates Grid */}
            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {certificates.map((cert) => {
                        const Icon = cert.icon;
                        return (
                            <div
                                key={cert.name}
                                className="bg-white shadow-lg border-t-4 border-primary-green flex flex-col hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="p-8 flex-1">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-industrial p-3 shrink-0">
                                            <Icon className="w-7 h-7 text-primary-green" />
                                        </div>
                                        <div>
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-primary-green">
                                                {cert.category}
                                            </span>
                                            <h3 className="font-heading font-bold text-lg text-gray-800 leading-tight mt-1">
                                                {cert.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">{cert.issuer}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed mt-5">{cert.summary}</p>
                                    <dl className="mt-6 border-t border-gray-100 pt-4 space-y-2.5">
                                        {cert.details.map((d) => (
                                            <div key={d.label} className="flex justify-between gap-4 text-sm">
                                                <dt className="text-gray-400 uppercase text-[11px] tracking-wider font-bold shrink-0 pt-0.5">
                                                    {d.label}
                                                </dt>
                                                <dd className="text-gray-700 font-semibold text-right">{d.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                                <div className="bg-industrial px-8 py-3.5 flex items-center gap-2 border-t border-gray-100">
                                    <BadgeCheck className="w-4 h-4 text-primary-green shrink-0" />
                                    <span className="text-xs font-bold text-primary-green uppercase tracking-wide">
                                        {cert.status}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Section>

            <Footer />
        </main>
    );
};

export default CertificatesPage;
