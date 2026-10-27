import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const site = process.env.SITE_URL ?? "http://localhost:3300";

export default defineConfig({
  build: { format: "directory" },
  integrations: [
    mdx(),
    react(),
    sitemap({ filter: page => !new URL(page).pathname.startsWith("/preview/") }),
  ],
  markdown: { shikiConfig: { theme: "github-dark" } },
  output: "static",
  server: { port: 3300 },
  site,
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: { "@": fileURLToPath(new URL("src", import.meta.url)) } },
  },
});
