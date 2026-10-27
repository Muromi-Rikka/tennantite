import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const site = process.env.SITE_URL ?? "http://localhost:3300";

export default defineConfig({
  build: { format: "directory" },
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !pathname.includes("/preview/") && pathname !== "/404/" && pathname !== "/en/404/";
      },
      i18n: { defaultLocale: "zh", locales: { en: "en-US", zh: "zh-CN" } },
    }),
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
