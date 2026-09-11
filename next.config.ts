import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve the smallest supported format first; keeps future photography fast.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
