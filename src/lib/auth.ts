import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { emailOTP } from 'better-auth/plugins/email-otp'
import { twoFactor } from 'better-auth/plugins'

import { sendEmail } from '@/lib/nodemailer'
import prisma from '@/lib/prisma'
import { ResetPasswordEmailTemplate } from '@/emails/reset-password.template'
import { OTPVerificationEmailTemplate } from '@/emails/otp-verification.template'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: 'Reset Password',
        html: ResetPasswordEmailTemplate({
          name: user.name,
          url,
          token
        })
      })
    },
    resetPasswordTokenExpiresIn: 60 // 1 minute
  },
  plugins: [
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        await sendEmail({
          to: email,
          subject:
            type === 'sign-in'
              ? 'Two Factor Authentication'
              : type === 'email-verification'
              ? 'Verify Your Email'
              : 'Reset Your Password',
          html: OTPVerificationEmailTemplate({
            name: email,
            otp,
            type
          })
        })
      },
      sendVerificationOnSignUp: true,
      otpLength: 6,
      expiresIn: 600 // 10 minutes
    }),
    twoFactor({
      otpOptions: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async sendOTP({ user, otp }, request) {
          await sendEmail({
            to: user.email,
            subject: 'Two Factor Authentication',
            html: OTPVerificationEmailTemplate({
              name: user.name,
              otp,
              type: 'sign-in'
            })
          })
        }
      }
    }),
    nextCookies()
  ]
})
