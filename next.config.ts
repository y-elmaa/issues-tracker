import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint checks during `next build`
  },
  /* config options here */
};

export default nextConfig;
