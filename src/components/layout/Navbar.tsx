"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

type NavLink = {
    name: string;
    href: string;
    children?: { name: string; href: string }[];
};

const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    {
        name: "About Us",
        href: "/about-us",
        children: [{ name: "Certificates", href: "/about-us/certificates" }],
    },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-industrial shadow-md py-3" : "bg-industrial shadow-sm py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Image src="/logo.png" alt="Multi Green Engineering Logo" width={50} height={50} />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold font-heading leading-tight text-gray-800">
                            MULTI GREEN <span className="text-primary-green">ENGINEERING</span>
                        </span>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-600">
                            Building Construction & Civil Works
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) =>
                        link.children ? (
                            <div key={link.name} className="relative group">
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors duration-300 hover:text-primary-green",
                                        isActive(link.href) ? "text-primary-green" : "text-gray-800/70"
                                    )}
                                >
                                    {link.name}
                                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                                </Link>
                                <div className="absolute left-0 top-full pt-4 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                                    <div className="min-w-[220px] bg-industrial shadow-xl border-t-2 border-primary-green py-2">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className={cn(
                                                    "block px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-primary-green hover:text-white",
                                                    isActive(child.href) ? "text-primary-green" : "text-gray-800/70"
                                                )}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-bold uppercase tracking-widest transition-colors duration-300 hover:text-primary-green",
                                    isActive(link.href) ? "text-primary-green" : "text-gray-800/70"
                                )}
                            >
                                {link.name}
                            </Link>
                        )
                    )}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://app.mge-eng.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-green text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all duration-300"
                        >
                            Staff Login
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-primary-green lg:hidden pt-24 px-8"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-bold text-white hover:text-accent-yellow transition-colors flex items-center justify-between group"
                                    >
                                        {link.name}
                                        <ChevronRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    {link.children && (
                                        <div className="mt-4 ml-4 flex flex-col gap-3 border-l-2 border-white/20 pl-4">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-lg font-semibold text-white/70 hover:text-accent-yellow transition-colors flex items-center gap-2"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="flex flex-col gap-4 mt-8">
                                <a
                                    href="https://app.mge-eng.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-accent-yellow text-gray-800 py-4 text-center font-bold uppercase tracking-widest"
                                >
                                    Staff Login
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
