import os from "node:os";
import type { NextConfig } from "next";

function getLocalDevOrigins(): string[] {
  const origins = new Set<string>([
    "localhost",
    "127.0.0.1",
    "**.ngrok-free.app",
    "**.ngrok.io",
    "**.loca.lt",
    "**.devtunnels.ms",
  ]);

  const interfaces = os.networkInterfaces();
  for (const list of Object.values(interfaces)) {
    for (const iface of list ?? []) {
      if (iface.family === "IPv4" && iface.address) {
        origins.add(iface.address);
      }
    }
  }

  return Array.from(origins);
}

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: getLocalDevOrigins(),
  images: {
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
