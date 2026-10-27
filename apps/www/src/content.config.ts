import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    description: z.string(),
    order: z.number(),
    section: z.enum(["开始", "设计系统", "架构", "分发"]),
    title: z.string(),
  }),
});

export const collections = { docs };
