"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Activity } from "lucide-react";
import { cn } from "@/utils/cn";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

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
                scrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 group-hover:bg-accent transition-colors duration-300">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className={cn("text-xl font-bold font-heading leading-tight transition-colors duration-300", scrolled ? "text-primary" : "text-white")}>
                            MULTI GREEN <span className="text-accent">ENGINEERING</span>
                        </span>
                        <span className={cn("text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors duration-300", scrolled ? "text-neutral" : "text-white/60")}>
                            Consulting & Civil Engineering
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-bold uppercase tracking-widest transition-colors duration-300 hover:text-accent",
                                scrolled
                                    ? (pathname === link.href ? "text-accent" : "text-primary/70")
                                    : (pathname === link.href ? "text-accent" : "text-white/80")
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://pm.mge-eng.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-accent text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-accent-hover transition-all duration-300"
                        >
                            Staff Login
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className={cn("lg:hidden transition-colors duration-300", scrolled ? "text-primary" : "text-white")} onClick={() => setIsOpen(!isOpen)}>
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
                        className="fixed inset-0 z-40 bg-primary lg:hidden pt-24 px-8"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-3xl font-bold text-white hover:text-accent transition-colors flex items-center justify-between group"
                                >
                                    {link.name}
                                    <ChevronRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                            <div className="flex flex-col gap-4 mt-8">
                                <a
                                    href="https://pm.mge-eng.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-accent text-white py-4 text-center font-bold uppercase tracking-widest hover:bg-accent-hover"
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
