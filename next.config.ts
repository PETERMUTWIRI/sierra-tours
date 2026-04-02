import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Remove trailing slashes for clean URLs
  trailingSlash: false,
};

export default nextConfig;
