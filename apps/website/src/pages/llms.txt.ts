import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { buildLlmsText } from "@/lib/llms";

// eslint-disable-next-line unicorn/consistent-boolean-name -- Astro reserves the `prerender` export name.
export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL("http://localhost:3300");
  const text = buildLlmsText(await getCollection("docs"), "zh", origin);
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
