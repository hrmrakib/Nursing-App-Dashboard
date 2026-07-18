import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.12.49",
        port: "8086",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "10.10.29.50",
        port: "8086",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "ai.poolofcast.com",
      },
    ],
  },
};

export default nextConfig;
