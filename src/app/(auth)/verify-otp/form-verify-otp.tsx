'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RefreshCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { zodResolver } from '@hookform/resolvers/zod'
import { authClient } from '@/lib/auth-client'
import { verifyOTPSchema, VerifyOTPValues } from '@/schemas/auth/auth.schema'

export const FormVerifyOTP = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [isCooldownActive, setIsCooldownActive] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email') || ''
  const type = searchParams.get('type') || ''

  const startCooldown = () => {
    setIsCooldownActive(true)
    setCooldown(60)
  }

  useEffect(() => {
    if (isCooldownActive && cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown(prev => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    } else if (cooldown === 0) setIsCooldownActive(false)
  }, [isCooldownActive, cooldown])

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

          if (
            ctx.error.code === 'INVALID_OTP' ||
            ctx.error.code === 'OTP_EXPIRED'
          ) {
            form.setError('otp', {
              message:
                'Oops OTP is invalid, please try again or resend a new code',
              type: 'manual'
            })
          } else toast.error(ctx.error.message)
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

          if (
            ctx.error.code === 'OTP_HAS_EXPIRED' ||
            ctx.error.code === 'INVALID_TWO_FACTOR_AUTHENTICATION'
          ) {
            form.setError('otp', {
              message:
                'Oops OTP is invalid, please try again or resend a new code',
              type: 'manual'
            })
          } else toast.error(ctx.error.message)
        }
      }
    )
  }

  const handleResendCode = async () => {
    if (isCooldownActive) return

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
          startCooldown()
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
    if (isCooldownActive) return

    await authClient.twoFactor.sendOtp(
      {},
      {
        onRequest: () => {
          setIsLoading(true)
          toast.loading('Sending verification code...')
        },
        onSuccess: () => {
          setIsLoading(false)
          toast.dismiss()
          toast.success('Verification code sent successfully')
          startCooldown()
        },
        onError: ctx => {
          setIsLoading(false)
          toast.dismiss()
          toast.error(ctx.error.message)
        }
      }
    )
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
          className="space-y-6 mt-5"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="text-center space-y-2">
                <FormControl>
                  <InputOTP
                    {...field}
                    disabled={isLoading}
                    maxLength={6}
                    containerClassName="flex items-center justify-center"
                    onChange={value => {
                      field.onChange(value)
                      if (value.length === 6) {
                        form.handleSubmit(
                          type === 'sign-in' || type === '2fa'
                            ? onVerifyTwoFactor
                            : onVerifyOTP
                        )()
                      }
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="w-12 h-12 text-2xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <InputOTPSlot
                        index={1}
                        className="w-12 h-12 text-2xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <InputOTPSlot
                        index={2}
                        className="w-12 h-12 text-2xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        className="w-12 h-12 text-2xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <InputOTPSlot
                        index={4}
                        className="w-12 h-12 text-2xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <InputOTPSlot
                        index={5}
                        className="w-12 h-12 text-2xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex items-center justify-center my-3">
            {isCooldownActive ? (
              <Button variant="link" className="text-sm" disabled>
                Resend in {cooldown} seconds
              </Button>
            ) : (
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
                Resend Code
              </Button>
            )}
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
