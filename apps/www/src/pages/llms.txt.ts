import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { blocks, components } from "@/lib/catalog";
import { docHref, sortDocs } from "@/lib/docs";

// eslint-disable-next-line unicorn/consistent-boolean-name -- Astro reserves the `prerender` export name.
export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL("http://localhost:3300");
  const docs = sortDocs(await getCollection("docs"));
  const lines = [
    "# Verdigris",
    "",
    "> Minecraft 风格 React UI 组件库：48 个组件、19 个整屏界面；源码可复制，数据可注入，SSR 安全。",
    "",
    "## Docs",
    ...docs.map(entry => `- [${entry.data.title}](${new URL(docHref(entry.id), origin).href}): ${entry.data.description}`),
    "",
    "## Components",
    ...components.map(component => `- [${component.name}](${new URL(`/components/${component.slug}/`, origin).href}): ${component.description}`),
    "",
    "## Blocks",
    ...blocks.map(block => `- [${block.name}](${new URL(`/blocks/${block.slug}/`, origin).href}): ${block.description}`),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
