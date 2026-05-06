import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary-green text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Image src="/logo.png" alt="Multi Green Engineering Logo" width={50} height={50} className="bg-white rounded-full p-1" />
                            <span className="text-xl font-bold font-heading tracking-tight leading-tight">
                                MULTI GREEN <span className="text-accent-yellow">ENGINEERING</span>
                            </span>
                        </Link>
                        <p className="text-white/70 text-sm leading-relaxed">
                            A professional workforce dedicated to providing services in the Civil Engineering field, specifically in Building Construction and Civil Works.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold font-heading mb-6 border-l-4 border-accent-yellow pl-4 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-4 text-white/70 text-sm">
                            <li><Link href="/about-us" className="hover:text-accent-yellow transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-accent-yellow transition-colors">Our Services</Link></li>
                            <li><Link href="/projects" className="hover:text-accent-yellow transition-colors">Our Projects</Link></li>
                            <li><Link href="/contact" className="hover:text-accent-yellow transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold font-heading mb-6 border-l-4 border-accent-yellow pl-4 uppercase tracking-wider">Core Services</h4>
                        <ul className="space-y-4 text-white/70 text-sm">
                            <li>Building Construction</li>
                            <li>Civil Engineering</li>
                            <li>Mechanical & Electrical</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold font-heading mb-6 border-l-4 border-accent-yellow pl-4 uppercase tracking-wider">Contact Us</h4>
                        <ul className="space-y-4 text-white/70 text-sm">
                            <li className="flex gap-3">
                                <MapPin className="w-5 h-5 text-accent-yellow shrink-0 mt-1" />
                                <span>NO 149, JALAN DATO' SIA HER YAM, 85000 SEGAMAT, JOHOR</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="w-5 h-5 text-accent-yellow shrink-0" />
                                <span>07-931 2689</span>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="w-5 h-5 text-accent-yellow shrink-0" />
                                <div className="flex flex-col">
                                    <span>multigreenengineering@gmail.com</span>
                                    <span>general@mge-eng.com</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/50 text-xs uppercase tracking-widest">
                        © {currentYear} Multi Green Engineering Sdn Bhd. All Rights Reserved.
                    </p>
                    <div className="flex gap-6 text-white/50 text-xs uppercase tracking-widest">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
