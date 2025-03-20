'use server'

import prisma from '@/lib/prisma'

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  })

  return user
}

export const checkUserEmailHasVerified = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      emailVerified: true
    }
  })

  if (!user) return false
  if (!user) return false
  if (!user.emailVerified) return false

  return true
}
