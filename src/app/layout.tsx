import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { constructMetadata } from "@/lib/metadata";
import { OrganizationSchema } from "@/components/layout/StructuredData";
import Preloader from "@/components/ui/Preloader";
import BackToTop from "@/components/ui/BackToTop";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        <Preloader />
        <BackToTop />
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
