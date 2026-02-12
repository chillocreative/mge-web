import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Local WordPress (Laragon - same domain, /cms subfolder)
        protocol: "http",
        hostname: "mge-website.test",
        pathname: "/cms/wp-content/uploads/**",
      },
      {
        // Unsplash (existing placeholder images)
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
