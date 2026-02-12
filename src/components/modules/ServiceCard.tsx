"use client";

import { motion } from "framer-motion";
import {
    Settings,
    Zap,
    HardHat,
    ShieldCheck,
    Factory,
    Gauge,
    ArrowUpRight,
    Activity
} from "lucide-react";
import Link from "next/link";

// Icon Map for string-based passing (fixes Server->Client component serialization)
const iconMap = {
    settings: Settings,
    zap: Zap,
    hardhat: HardHat,
    shield: ShieldCheck,
    factory: Factory,
    gauge: Gauge,
    activity: Activity,
};

interface ServiceCardProps {
    title: string;
    description: string;
    icon: keyof typeof iconMap | string;
    href: string;
    index: number;
    featuredImage?: string | null;
}

const ServiceCard = ({ title, description, icon, href, index, featuredImage }: ServiceCardProps) => {
    const Icon = iconMap[icon as keyof typeof iconMap] || Activity;
    const hasImage = !!featuredImage;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group border border-industrial hover:border-accent transition-all duration-500 flex flex-col h-full relative overflow-hidden"
        >
            {/* Background Image */}
            {hasImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${featuredImage}')` }}
                />
            )}

            {/* Dark Overlay */}
            {hasImage && (
                <div className="absolute inset-0 bg-primary/75 group-hover:bg-primary/65 transition-all duration-500" />
            )}

            {/* Decorative Index */}
            <div className={`absolute top-6 right-6 text-4xl font-black pointer-events-none transition-colors ${hasImage ? "text-white/10 group-hover:text-accent/20" : "text-industrial group-hover:text-accent/10"}`}>
                0{index + 1}
            </div>

            <div className="p-10 flex-grow relative z-10">
                <div className={`w-14 h-14 flex items-center justify-center mb-8 transition-colors duration-500 ${hasImage ? "bg-white/10 group-hover:bg-accent" : "bg-industrial group-hover:bg-accent"}`}>
                    <Icon className={`w-6 h-6 transition-colors duration-500 ${hasImage ? "text-white" : "text-primary group-hover:text-white"}`} />
                </div>

                <h3 className={`text-2xl font-bold font-heading mb-4 transition-colors ${hasImage ? "text-white" : "text-primary group-hover:text-accent"}`}>
                    {title}
                </h3>

                <p className={`leading-relaxed mb-8 ${hasImage ? "text-white/70" : "text-neutral"}`}>
                    {description}
                </p>
            </div>

            <Link
                href={href}
                className={`mt-auto border-t p-6 flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 relative z-10 ${hasImage ? "border-white/20 text-white/80 hover:bg-accent hover:text-white" : "border-industrial text-primary group-hover:bg-primary group-hover:text-white"}`}
            >
                Learn More
                <ArrowUpRight className="w-4 h-4" />
            </Link>
        </motion.div>
    );
};

export default ServiceCard;
