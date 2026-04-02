"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const letters = ["M", "G", "E"];

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary"
                >
                    <div className="flex flex-col items-center">
                        <div className="flex items-center mb-6">
                            {letters.map((letter, i) => (
                                <motion.span
                                    key={letter}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.2,
                                        ease: "easeOut",
                                    }}
                                    className="text-7xl font-black text-accent tracking-wider"
                                    style={{ fontFamily: "var(--font-heading, sans-serif)" }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
                            className="h-0.5 w-32 bg-accent/60 origin-left mb-4"
                        />
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                            className="text-white/50 text-[10px] uppercase tracking-[0.5em] font-bold"
                        >
                            Engineering Precision
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
