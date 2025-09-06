import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
