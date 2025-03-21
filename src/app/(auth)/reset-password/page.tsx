import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { validateResetPasswordToken } from '@/actions/auth/auth.action'
import { FormResetPassword } from '@/app/(auth)/reset-password/form-reset-password'
import { AuthCardWrapper } from '@/components/auth/card-wrapper'
import { AuthIllustration } from '@/components/auth/illustration'
export const metadata: Metadata = {
  title: 'Reset Password'
}

const ResetPasswordPage = async ({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>
}) => {
  const { token } = await searchParams

  if (!token) return redirect('/login')

  const isTokenValid = await validateResetPasswordToken(token)

  if (!isTokenValid) return redirect('/login')

  return (
    <>
      <AuthIllustration
        src="/images/auth/illustration_reset_password.svg"
        alt="Reset Password Illustration"
        containerWidth="50%"
        containerHeight="50%"
      />
      <AuthCardWrapper
        headerLabel="Reset Password"
        headerDescription="Enter your new password below to reset your account, make sure different from your previous password"
      >
        <FormResetPassword />
      </AuthCardWrapper>
    </>
  )
}

export default ResetPasswordPage
