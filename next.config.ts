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

// Mode GitHub Pages: situs diekspor sebagai file statis dan disajikan dari sub-path nama repo
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? process.env.NEXT_PUBLIC_BASE_PATH ?? "" : "";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: false,
  partialPrefetching: false,
  allowedDevOrigins: getLocalDevOrigins(),
  ...(isGithubPages && {
    output: "export" as const,
    basePath,
    trailingSlash: true,
  }),
  images: {
    qualities: [75, 90],
    ...(isGithubPages && {
      loader: "custom" as const,
      loaderFile: "./src/lib/image-loader.ts",
    }),
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
