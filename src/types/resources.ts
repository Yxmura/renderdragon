
import { z } from "zod";

export const ResourceTypeSchema = z.enum([
  "music",
  "sfx",
  "animation",
  "font",
  "image",
  "premiere_preset",
  "davinci_preset",
  "other",
]);

export const ResourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: ResourceTypeSchema,
  downloadUrl: z.string(),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  downloadCount: z.number().default(0),
  youtubeChannelUrl: z.string().optional(),
});

export type ResourceType = z.infer<typeof ResourceTypeSchema>;
export type Resource = z.infer<typeof ResourceSchema>;
