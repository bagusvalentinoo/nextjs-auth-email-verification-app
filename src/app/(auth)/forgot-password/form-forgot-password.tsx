'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RefreshCcw } from 'lucide-react'

import { findUserByEmail } from '@/actions/auth/auth.action'
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

import {
  forgotPasswordSchema,
  ForgotPasswordValues
} from '@/schemas/auth/auth.schema'

export const FormForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onForgotPassword = async (values: ForgotPasswordValues) => {
    const { email } = values

    setIsLoading(true)
    const user = await findUserByEmail(email)

    if (!user) {
      form.setError('email', {
        message: 'Oops! Email not found',
        type: 'manual'
      })
      setIsLoading(false)
      return
    }

    setIsLoading(false)

    await authClient.forgetPassword(
      {
        email,
        redirectTo: '/reset-password'
      },
      {
        onRequest: () => {
          setIsLoading(true)
          toast.loading('Sending reset link...')
        },
        onSuccess: () => {
          form.reset()
          setIsLoading(false)
          toast.dismiss()
          toast.success('Reset link sent successfully! Check your email.')
          router.push('/login')
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
          onSubmit={form.handleSubmit(onForgotPassword)}
          className="space-y-6"
        >
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
          </div>
          <Button
            type="submit"
            className="w-full py-5 font-semibold"
            disabled={isLoading}
          >
            {isLoading && <RefreshCcw className="size-4 mr-2 animate-spin" />}
            Send Reset Link
          </Button>
        </form>
      </Form>
    </>
  )
}
