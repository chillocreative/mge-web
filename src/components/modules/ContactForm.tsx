"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Send, CheckCircle } from "lucide-react";
import { apiService, ContactFormData } from "@/services/api";

const ContactForm = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        subject: "Water Piping Installation",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await apiService.submitContactForm(formData);
            if (result) {
                setSuccess(true);
                setFormData({ name: "", email: "", phone: "", subject: "Water Piping Installation", message: "" });
            } else {
                setError("Failed to send your message. Please try again or contact us directly.");
            }
        } catch {
            setError("Failed to send your message. Please try again or contact us directly.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-white p-10 shadow-2xl border border-industrial relative flex flex-col items-center justify-center min-h-[400px] text-center">
                <CheckCircle className="w-16 h-16 text-accent mb-6" />
                <h3 className="text-2xl font-bold text-primary font-heading mb-4">Message Sent Successfully</h3>
                <p className="text-neutral-600 mb-8 max-w-sm">
                    Thank you for your inquiry. Our engineering team will review your request and respond within 24 hours.
                </p>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-xs font-bold uppercase tracking-[0.2em] text-accent hover:text-primary transition-colors border-b-2 border-accent pb-1"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-10 shadow-2xl border border-industrial relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -z-10" />
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/50">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-industrial/50 border-b-2 border-industrial focus:border-accent p-4 outline-none transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/50">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-industrial/50 border-b-2 border-industrial focus:border-accent p-4 outline-none transition-colors"
                            placeholder="john@company.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/50">Phone (Optional)</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-industrial/50 border-b-2 border-industrial focus:border-accent p-4 outline-none transition-colors"
                        placeholder="+60 12-345 6789"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/50">Subject</label>
                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-industrial/50 border-b-2 border-industrial focus:border-accent p-4 outline-none transition-colors"
                    >
                        <option>Water Piping Installation</option>
                        <option>Civil Infrastructure</option>
                        <option>Mechanical Engineering</option>
                        <option>Electrical Systems</option>
                        <option>General Inquiry</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/50">Project Details</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full bg-industrial/50 border-b-2 border-industrial focus:border-accent p-4 outline-none transition-colors resize-none"
                        placeholder="Briefly describe your engineering requirements..."
                    />
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={loading}
                    rightIcon={<Send className="w-5 h-5" />}
                >
                    {loading ? "Sending..." : "Submit Request"}
                </Button>
            </form>
        </div>
    );
};

export default ContactForm;
