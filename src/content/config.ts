import { defineCollection, z } from 'astro:content';

const stopSchema = z.object({
  type: z.enum(['coffee', 'beer', 'food', 'sight', 'transportation', 'bike-shop']),
  name: z.string(),
  location: z.string(),
  url: z.string().url().optional(),
  description: z.string().max(300).optional(),
});

const rides = defineCollection({
  type: 'content',
  schema: z.object({
    ridewithgps_url: z.string().url(),
    short_description: z.string(),
    stops: z.array(stopSchema).optional(),
    tags: z.array(z.enum(['point-to-point', 'loop', 'epic'])).optional(),
  }),
});

export const collections = { rides };
