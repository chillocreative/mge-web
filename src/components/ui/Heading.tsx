import React from "react";
import { cn } from "@/utils/cn";

interface HeadingProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "accent" | "white";
}

const Heading = ({ level = 2, children, className, variant = "primary" }: HeadingProps) => {
    const Tag = `h${level}` as React.ElementType;

    const sizeClasses = {
        1: "heading-lg",
        2: "heading-md",
        3: "text-2xl md:text-3xl",
        4: "text-xl md:text-2xl",
        5: "text-lg md:text-xl",
        6: "text-base md:text-lg",
    };

    const colorClasses = {
        primary: "text-primary",
        accent: "text-accent",
        white: "text-white",
    };

    return (
        <Tag className={cn("font-heading font-bold leading-tight", sizeClasses[level as keyof typeof sizeClasses], colorClasses[variant], className)}>
            {children}
        </Tag>
    );
};

export default Heading;
