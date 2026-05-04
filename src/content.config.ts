import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Definiamo la collezione "storia" per le pagine testuali
const storia = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/storia" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = { storia };
