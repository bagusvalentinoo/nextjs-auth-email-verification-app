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

export const validateResetPasswordToken = async (token: string) => {
  const identifier = `reset-password:${token}`

  const verification = await prisma.verification.findFirst({
    where: { identifier },
    select: { expiresAt: true }
  })

  if (!verification) return false
  if (verification.expiresAt < new Date()) return false

  return true
}
