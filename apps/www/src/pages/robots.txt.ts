import type { APIRoute } from "astro";

// eslint-disable-next-line unicorn/consistent-boolean-name -- Astro reserves the `prerender` export name.
export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("http://localhost:3300");
  const text = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /preview/",
    "",
    `Sitemap: ${new URL("/sitemap-index.xml", origin).href}`,
    "",
  ].join("\n");
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
