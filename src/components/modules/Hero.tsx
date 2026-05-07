"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { ArrowRight, Drill as Toll } from "lucide-react";

interface HeroProps {
    title: string;
    subtitle: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    image?: string;
}

const Hero = ({
    title,
    subtitle,
    ctaText = "Our Services",
    ctaLink = "/services",
    secondaryCtaText = "Latest Projects",
    secondaryCtaLink = "/projects"
}: HeroProps) => {
    return (
        <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#14532d' }}>
            {/* Background Image Layer Stack */}
            <div className="absolute inset-0 z-0">
                {/* 1. Main High-Res Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2600')" }}
                />

                {/* 2. Dark green overlay — ensures readability regardless of image state */}
                <div className="absolute inset-0 bg-primary/65" />

                {/* 3. Bottom Gradient Transition */}
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            </div>

            <div className="container-custom relative z-10 pt-32 drop-shadow-2xl">
                <div className="max-w-4xl">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
                            {title}
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-white/70 max-w-2xl mb-12 leading-relaxed text-balance"
                    >
                        {subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-6"
                    >
                        <Link href={ctaLink}>
                            <Button
                                size="lg"
                                variant="secondary"
                                rightIcon={<ArrowRight className="w-5 h-5" />}
                            >
                                {ctaText}
                            </Button>
                        </Link>
                        <Link href={secondaryCtaLink}>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-primary"
                            >
                                {secondaryCtaText}
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Industrial Accent Visual - Johor specific teaser */}
            <div className="absolute bottom-0 right-0 hidden lg:block">
                <div className="relative w-[350px] h-[350px] bg-primary/80 backdrop-blur-3xl p-12 overflow-hidden border-t-4 border-l-4 border-accent-yellow">
                    <span className="text-8xl font-black text-white/5 absolute -bottom-4 -right-4 italic tracking-tighter">JOHOR</span>
                    <div className="relative z-10">
                        <div className="text-accent-yellow font-black text-5xl mb-2 tracking-tighter">G7</div>
                        <div className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-4">Highest Grade Certification</div>
                        <div className="w-12 h-1 bg-white/20 mb-6" />
                        <p className="text-white/40 text-xs font-semibold leading-relaxed">
                            Delivering high-capacity water infrastructure and civil engineering across Malaysia.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
