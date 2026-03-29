import { z } from 'zod'

export const PostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title is too long'),
  content: z.string().min(10, 'Content must be at least 10 characters').max(5000, 'Content is too long'),
  published: z.boolean().default(true),
})

export type CreatePostInput = z.infer<typeof PostSchema>
