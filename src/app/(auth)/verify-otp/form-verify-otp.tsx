'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RefreshCcw } from 'lucide-react'

import { checkUserEmailHasVerified } from '@/actions/auth/auth.action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { authClient } from '@/lib/auth-client'
import { verifyOTPSchema, VerifyOTPValues } from '@/schemas/auth/auth.schema'

export const FormVerifyOTP = () => {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email') || ''
  const type = searchParams.get('type') || ''

  useEffect(() => {
    const checkEmailVerified = async () => {
      const isEmailVerified = await checkUserEmailHasVerified(email)

      // Redirect rules based on the requirements
      if (!email || !type) {
        toast.error('Invalid or missing email or type', { duration: 5000 })
        router.push('/login')
        return
      }

      if (!isEmailVerified && type !== 'email-verification') {
        // If not verified and type is not email-verification, redirect to login
        toast.error('Your account is not verified. Please verify your email.', {
          duration: 5000
        })
        router.push('/login')
        return
      }

      if (isEmailVerified && type === 'email-verification') {
        // If already verified but trying to access email-verification, redirect to login
        toast.error('Your account is already verified. Please sign in.', {
          duration: 5000
        })
        router.push('/login')
        return
      }

      if (
        isEmailVerified &&
        !(type === 'sign-in' || type === 'forget-password' || type === '2fa')
      ) {
        // If verified but type is invalid, redirect to login
        toast.error('Invalid type for a verified account.', { duration: 5000 })
        router.push('/login')
        return
      }
    }

    checkEmailVerified()
  }, [email, router, type])

  const form = useForm<VerifyOTPValues>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      email,
      otp: ''
    }
  })

  const onVerifyOTP = async (values: VerifyOTPValues) => {
    const { email, otp } = values

    await authClient.emailOtp.verifyEmail(
      {
        email,
        otp
      },
      {
        onRequest: () => {
          setIsLoading(true)
          toast.loading('Verifying OTP...')
        },
        onSuccess: () => {
          form.reset()
          setIsLoading(false)
          toast.dismiss()
          toast.success('OTP verified successfully')
          router.push('/login')
        },
        onError: ctx => {
          setIsLoading(false)
          toast.dismiss()
          toast.error(
            ctx.error.code === 'INVALID_OTP'
              ? 'Oops OTP is invalid, please try again'
              : ctx.error.message
          )
        }
      }
    )
  }

  const onVerifyTwoFactor = async (values: VerifyOTPValues) => {
    const { otp } = values

    await authClient.twoFactor.verifyOtp(
      {
        code: otp
      },
      {
        onRequest: () => {
          setIsLoading(true)
          toast.loading('Verifying OTP...')
        },
        onSuccess: () => {
          form.reset()
          setIsLoading(false)
          toast.dismiss()
          toast.success('OTP verified successfully')
          router.push('/dashboard')
        },
        onError: ctx => {
          setIsLoading(false)
          toast.dismiss()
          toast.error(ctx.error.message)
          console.log(JSON.stringify(ctx, null, 2))
        }
      }
    )
  }

  const handleResendCode = async () => {
    await authClient.emailOtp.sendVerificationOtp(
      {
        email,
        type: type as 'sign-in' | 'forget-password' | 'email-verification'
      },
      {
        onRequest: () => {
          setIsLoading(true)
          toast.loading('Sending verification code...')
        },
        onSuccess: () => {
          setIsLoading(false)
          toast.dismiss()
          toast.success('Verification code sent successfully')
        },
        onError: ctx => {
          setIsLoading(false)
          toast.dismiss()
          toast.error(ctx.error.message)
        }
      }
    )
  }

  const handleResendTwoFactorCode = async () => {
    await authClient.twoFactor.sendOtp({
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true)
          toast.loading('Sending verification code...')
        },
        onSuccess: () => {
          setIsLoading(false)
          toast.dismiss()
          toast.success('Verification code sent successfully')
        },
        onError: ctx => {
          setIsLoading(false)
          toast.dismiss()
          toast.error(ctx.error.message)
        }
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={
            type === 'sign-in' || type === '2fa'
              ? form.handleSubmit(onVerifyTwoFactor)
              : form.handleSubmit(onVerifyOTP)
          }
          className="space-y-6"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="123456"
                      className="text-center tracking-widest"
                      maxLength={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex items-center justify-center my-3">
            <Button
              type="button"
              variant="link"
              className="text-sm"
              onClick={
                type === 'sign-in' || type === '2fa'
                  ? handleResendTwoFactorCode
                  : handleResendCode
              }
              disabled={isLoading}
            >
              Didn&apos;t receive a code? Resend
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full py-5 font-semibold"
            disabled={isLoading}
          >
            {isLoading && <RefreshCcw className="size-4 mr-2 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}
