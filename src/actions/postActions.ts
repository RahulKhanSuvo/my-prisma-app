'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as postService from '@/services/postService'
import { PostSchema } from '@/schemas/postSchema'

export type ActionState = {
  error?: string
  success?: boolean
}

export async function createPostAction(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const result = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  try {
    const user = await postService.ensureDefaultUser()
    await postService.createPostRecord({
      ...result.data,
      authorId: user.id,
    })
  } catch (err) {
    console.error(err)
    return { error: 'Failed to create post. Please try again later.' }
  }

  revalidatePath('/')
  redirect('/')
}
