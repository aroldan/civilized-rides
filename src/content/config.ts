import { defineCollection, z } from 'astro:content';

const stopSchema = z.object({
  type: z.enum(['coffee', 'beer', 'food', 'sight']),
  name: z.string(),
  location: z.string(),
  url: z.string().url().optional(),
});

const rides = defineCollection({
  type: 'content',
  schema: z.object({
    ridewithgps_url: z.string().url(),
    short_description: z.string(),
    stops: z.array(stopSchema).optional(),
  }),
});

export const collections = { rides };
