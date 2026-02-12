import React from "react";
import { cn } from "@/utils/cn";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    id?: string;
    variant?: "default" | "industrial" | "dark";
}

const Section = ({ children, className, containerClassName, id, variant = "default" }: SectionProps) => {
    const variants = {
        default: "bg-white text-primary",
        industrial: "bg-industrial text-primary",
        dark: "bg-primary text-white",
    };

    return (
        <section id={id} className={cn("section-padding overflow-hidden", variants[variant], className)}>
            <div className={cn("container-custom", containerClassName)}>
                {children}
            </div>
        </section>
    );
};

export default Section;
