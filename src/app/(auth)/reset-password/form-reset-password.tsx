'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RefreshCcw } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { InputPassword } from '@/components/ui/input-password'
import { zodResolver } from '@hookform/resolvers/zod'
import { authClient } from '@/lib/auth-client'
import {
  resetPasswordSchema,
  ResetPasswordValues
} from '@/schemas/auth/auth.schema'

export const FormResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token') // Mendapatkan token dari URL

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing reset token', {
        duration: 5000
      })
      router.push('/login')
    }
  }, [token, router])

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const onResetPassword = async (values: ResetPasswordValues) => {
    const { password } = values

    if (!token) {
      toast.error('Invalid or missing reset token')
      return
    }

    await authClient.resetPassword(
      {
        newPassword: password,
        token
      },
      {
        onRequest: () => {
          setIsLoading(true)
          toast.loading('Resetting password...')
        },
        onSuccess: () => {
          form.reset()
          setIsLoading(false)
          toast.dismiss()
          toast.success('Password reset successfully')
          router.replace('/login')
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
          onSubmit={form.handleSubmit(onResetPassword)}
          className="space-y-6"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
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
            Reset Password
          </Button>
        </form>
      </Form>
    </>
  )
}
