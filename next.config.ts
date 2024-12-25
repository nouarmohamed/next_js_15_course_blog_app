import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // This allows HTTPS URLs
        hostname: '**',    // This allows any hostname
      },
    ],
  },
};

export default nextConfig;
