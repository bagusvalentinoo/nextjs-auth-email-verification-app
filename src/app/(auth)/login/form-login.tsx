'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RefreshCcw } from 'lucide-react'

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
import { InputPassword } from '@/components/ui/input-password'
import { zodResolver } from '@hookform/resolvers/zod'
import { authClient } from '@/lib/auth-client'
import { loginSchema, LoginValues } from '@/schemas/auth/auth.schema'

export const FormLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onLogin = async (values: LoginValues) => {
    const { email, password } = values

    await authClient.signIn.email(
      {
        email,
        password
      },
      {
        onRequest: () => {
          setIsLoading(true)
          toast.loading('Logging in...')
        },
        onSuccess: async () => {
          form.reset()
          toast.dismiss()
          await authClient.twoFactor.enable({ password })
          await authClient.twoFactor.sendOtp(
            {},
            {
              onRequest: () => {
                setIsLoading(true)
              },
              onSuccess: () => {
                toast.dismiss()
                toast.success(
                  'Please check your email for the verification code'
                )
                router.push(`/verify-otp?email=${email}&type=sign-in`)
                setIsLoading(false)
              },
              onError: ctx => {
                setIsLoading(false)
                toast.dismiss()
                toast.error(ctx.error.message)
              }
            }
          )
        },
        onError: async ctx => {
          setIsLoading(false)
          toast.dismiss()

          if (ctx.error.code === 'EMAIL_NOT_VERIFIED') {
            toast.error('Please verify your email first', {
              duration: 5000
            })

            await authClient.emailOtp.sendVerificationOtp(
              {
                email,
                type: 'email-verification'
              },
              {
                onRequest: () => {
                  setIsLoading(true)
                  toast.loading('Sending verification code...')
                },
                onSuccess: () => {
                  setIsLoading(false)
                  toast.dismiss()
                  toast.success(
                    'Verification code sent successfully, please check your email for the verification code'
                  )
                },
                onError: ctx => {
                  setIsLoading(false)
                  toast.dismiss()
                  toast.error(ctx.error.message)
                }
              }
            )

            router.push(`/verify-otp?email=${email}&type=email-verification`)
          } else {
            if (ctx.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
              form.setError('email', {
                message: '',
                type: 'manual'
              })
              form.setError('password', {
                message: ctx.error.message,
                type: 'manual'
              })
            } else toast.error(ctx.error.message)
          }
        }
      }
    )
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="email"
                      placeholder="your_email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      className={`text-sm underline-offset-4 hover:underline ${
                        isLoading ? 'text-muted-foreground' : ''
                      }`}
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <FormControl>
                    <InputPassword
                      disabled={isLoading}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full py-5 font-semibold"
            disabled={isLoading}
          >
            {isLoading && <RefreshCcw className="size-4 mr-2 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>
    </>
  )
}
