import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    description: z.string(),
    locale: z.enum(["zh", "en"]),
    order: z.number(),
    section: z.enum(["start", "design", "architecture", "distribution"]),
    title: z.string(),
  }),
});

export const collections = { docs };
