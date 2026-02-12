"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import { usePathname } from "next/navigation";

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
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            className="bg-accent p-6 rounded-sm mb-6 shadow-2xl shadow-accent/20"
                        >
                            <Activity className="w-12 h-12 text-white" />
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "200px" }}
                            transition={{ duration: 2.0, ease: "linear" }}
                            className="h-1 bg-accent/30 relative overflow-hidden rounded-full"
                        >
                            <motion.div
                                className="absolute inset-0 bg-accent"
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                transition={{ duration: 2.0, ease: "linear" }}
                            />
                        </motion.div>
                        <p className="mt-4 text-white/50 text-[10px] uppercase tracking-[0.5em] font-bold">
                            Engineering Precision
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
