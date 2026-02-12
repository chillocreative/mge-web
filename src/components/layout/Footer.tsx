import React from "react";
import Link from "next/link";
import { Activity, Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-accent p-2">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold font-heading tracking-tight leading-tight">
                                MULTI GREEN <span className="text-accent">ENGINEERING</span>
                            </span>
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Certified CIDB G7 & PKK Class 'A' engineering firm specializing in large-scale infrastructure and industrial solutions across Malaysia.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold font-heading mb-6 border-l-4 border-accent pl-4 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-4 text-neutral-400 text-sm">
                            <li><Link href="/about-us" className="hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-accent transition-colors">Our Services</Link></li>
                            <li><Link href="/projects" className="hover:text-accent transition-colors">Our Projects</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold font-heading mb-6 border-l-4 border-accent pl-4 uppercase tracking-wider">Core Services</h4>
                        <ul className="space-y-4 text-neutral-400 text-sm">
                            <li className="hover:text-accent cursor-pointer transition-colors">Water Piping Installation</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Mechanical Engineering</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Civil Infrastructure</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Electrical Systems</li>
                            <li className="hover:text-accent cursor-pointer transition-colors">Maintenance Services</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold font-heading mb-6 border-l-4 border-accent pl-4 uppercase tracking-wider">Contact Us</h4>
                        <ul className="space-y-4 text-neutral-400 text-sm">
                            <li className="flex gap-3">
                                <MapPin className="w-5 h-5 text-accent shrink-0" />
                                <span>No. 4(4-1) Jln Jaya,<br />Pusat Perniagaan Parit Jarum,<br />Bukit Gambir 84800 Tangkak,<br />Johor Darul Takzim.</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="w-5 h-5 text-accent shrink-0" />
                                <span>+60 7-965 4XXX</span>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="w-5 h-5 text-accent shrink-0" />
                                <span>info@mge-eng.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-neutral-500 text-xs uppercase tracking-widest">
                        © {currentYear} Multi Green Engineering Sdn Bhd. All Rights Reserved. by: <a href="https://chillocreative.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors">Chilllo Creative</a>
                    </p>
                    <div className="flex gap-6 text-neutral-500 text-xs uppercase tracking-widest">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
