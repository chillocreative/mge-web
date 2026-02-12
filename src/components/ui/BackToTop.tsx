"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    // Smooth progress indicator
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Calculate circumference for stroke-dasharray (radius = 18)
    const circumference = 2 * Math.PI * 18;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-24 right-8 z-40"
                >
                    <button
                        onClick={scrollToTop}
                        className="relative w-12 h-12 flex items-center justify-center bg-primary rounded-full shadow-lg group hover:bg-primary/90 transition-colors"
                        aria-label="Back to top"
                    >
                        {/* Progress Ring SVG */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
                            {/* Background Track */}
                            <circle
                                cx="24"
                                cy="24"
                                r="18"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                className="text-white/10"
                            />
                            {/* Filling Progress Stroke */}
                            <motion.circle
                                cx="24"
                                cy="24"
                                r="18"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                className="text-accent"
                                style={{
                                    pathLength: scrollYProgress,
                                    strokeDashoffset: 0,
                                }}
                            />
                        </svg>

                        {/* Icon */}
                        <motion.div
                            whileHover={{ y: -3 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ArrowUp className="w-5 h-5 text-white" strokeWidth={3} />
                        </motion.div>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
