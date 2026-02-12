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
import { cn } from "@/utils/cn";

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
}

const ServiceCard = ({ title, description, icon, href, index }: ServiceCardProps) => {
    // Resolve icon or fallback to Activity
    const Icon = iconMap[icon as keyof typeof iconMap] || Activity;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white border border-industrial hover:border-accent transition-all duration-500 flex flex-col h-full relative"
        >
            {/* Decorative Index */}
            <div className="absolute top-6 right-6 text-4xl font-black text-industrial group-hover:text-accent/10 transition-colors pointer-events-none">
                0{index + 1}
            </div>

            <div className="p-10 flex-grow">
                <div className="w-14 h-14 bg-industrial group-hover:bg-accent flex items-center justify-center mb-8 transition-colors duration-500">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
                </div>

                <h3 className="text-2xl font-bold font-heading text-primary mb-4 group-hover:text-accent transition-colors">
                    {title}
                </h3>

                <p className="text-neutral leading-relaxed mb-8">
                    {description}
                </p>
            </div>

            <Link
                href={href}
                className="mt-auto border-t border-industrial p-6 flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500"
            >
                Learn More
                <ArrowUpRight className="w-4 h-4" />
            </Link>
        </motion.div>
    );
};

export default ServiceCard;
