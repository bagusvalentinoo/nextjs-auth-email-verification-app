import { createAuthClient } from 'better-auth/react'
import { emailOTPClient, twoFactorClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL,
  plugins: [emailOTPClient(), twoFactorClient()]
})
