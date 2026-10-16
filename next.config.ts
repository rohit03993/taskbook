import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
  async redirects() {
    return [
      { source: "/schools", destination: "/school-crm", permanent: true },
      { source: "/colleges", destination: "/school-crm", permanent: true },
      { source: "/institutes", destination: "/institute-crm", permanent: true },
      { source: "/bangladesh-crm", destination: "/school-crm", permanent: true },
    ];
  },
};

export default nextConfig;
