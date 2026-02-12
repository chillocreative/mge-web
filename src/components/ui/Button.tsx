"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
        const variants = {
            primary: "bg-primary text-white hover:bg-primary-light border-transparent",
            secondary: "bg-accent text-white hover:bg-accent-hover border-transparent",
            outline: "bg-transparent border-primary text-primary hover:bg-primary hover:text-white",
            ghost: "bg-transparent border-transparent text-primary hover:bg-industrial",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg font-bold",
        };

        const { onAnimationStart, onDragStart, onDragEnd, onDrag, ...safeProps } = props;

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider",
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...safeProps}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : leftIcon ? (
                    <span className="mr-2">{leftIcon}</span>
                ) : null}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export default Button;
