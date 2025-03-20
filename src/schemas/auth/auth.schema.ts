import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Oops! Email is required'
    })
    .min(1, {
      message: 'Oops! Email is required'
    })
    .email({ message: 'Oops! Invalid email address' }),
  password: z
    .string({
      required_error: 'Oops! Password is required'
    })
    .min(1, {
      message: 'Oops! Password is required'
    }),
  rememberMe: z.boolean().optional()
})
export type LoginValues = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters'),
    email: z
      .string({
        required_error: 'Oops! Email is required'
      })
      .min(1, {
        message: 'Oops! Email is required'
      })
      .email({
        message: 'Oops! Invalid email address'
      }),
    password: z
      .string({
        required_error: 'Oops! Password is required'
      })
      .min(8, {
        message: 'Oops! Password must be at least 8 characters long'
      }),
    confirmPassword: z
      .string({
        required_error: 'Oops! Confirm password is required'
      })
      .min(8, {
        message: 'Oops! Confirm password must be at least 8 characters long'
      })
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Oops! Passwords do not match'
  })

export type RegisterValues = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Oops! Email is required'
    })
    .min(1, {
      message: 'Oops! Email is required'
    })
    .email({ message: 'Oops! Invalid email address' })
})

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: 'Oops! Password is required'
      })
      .min(8, {
        message: 'Oops! Password must be at least 8 characters long'
      }),
    confirmPassword: z
      .string({
        required_error: 'Oops! Confirm password is required'
      })
      .min(8, {
        message: 'Oops! Confirm password must be at least 8 characters long'
      })
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Oops! Passwords do not match'
  })

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export const verifyOTPSchema = z.object({
  email: z
    .string({
      required_error: 'Oops! Email is required'
    })
    .min(1, {
      message: 'Oops! Email is required'
    })
    .email({ message: 'Oops! Invalid email address' }),
  otp: z
    .string({
      required_error: 'Oops! OTP is required'
    })
    .min(6, {
      message: 'Oops! OTP must be 6 characters long'
    })
    .regex(/^\d+$/, {
      message: 'Oops! OTP must contain only numbers'
    })
})

export type VerifyOTPValues = z.infer<typeof verifyOTPSchema>
