import { prisma } from '@/lib/prisma'
import { CreatePostInput } from '@/schemas/postSchema'

export async function getAllPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getPostById(id: number) {
  return await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  })
}

export async function createPostRecord(data: CreatePostInput & { authorId: number }) {
  return await prisma.post.create({
    data,
  })
}

export async function ensureDefaultUser() {
  let user = await prisma.user.findFirst()
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'hello@world.com',
        name: 'Default User',
      },
    })
  }
  return user
}
