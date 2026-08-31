import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
};

export default nextConfig;
