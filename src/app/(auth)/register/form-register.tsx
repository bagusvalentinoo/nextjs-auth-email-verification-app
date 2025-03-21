'use client'

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
import { registerSchema, RegisterValues } from '@/schemas/auth/auth.schema'
export const FormRegister = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onRegister = async (values: RegisterValues) => {
    const { name, email, password } = values

    await authClient.signUp.email(
      {
        email,
        password,
        name
      },
      {
        onRequest: () => {
          setIsLoading(true)
          toast.loading('Creating account...')
        },
        onSuccess: () => {
          form.reset()
          setIsLoading(false)
          toast.dismiss()
          toast.success(
            'Account created successfully, please verify your email'
          )
          router.push(`/verify-otp?email=${email}&type=email-verification`)
        },
        onError: ctx => {
          setIsLoading(false)
          toast.dismiss()

          if (ctx.error.code === 'USER_ALREADY_EXISTS') {
            form.setError('email', {
              message: ctx.error.message,
              type: 'manual'
            })
          } else toast.error(ctx.error.message)
        }
      }
    )
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onRegister)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your_email@example.com"
                      disabled={isLoading}
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
                  <FormLabel>Password</FormLabel>
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
                  <FormLabel>Confirm Password</FormLabel>
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
            {isLoading && <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />}
            Register
          </Button>
        </form>
      </Form>
    </>
  )
}
