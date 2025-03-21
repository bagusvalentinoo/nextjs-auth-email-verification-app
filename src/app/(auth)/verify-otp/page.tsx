import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { checkUserEmailHasVerified } from '@/actions/auth/auth.action'
import { FormVerifyOTP } from '@/app/(auth)/verify-otp/form-verify-otp'
import { AuthCardWrapper } from '@/components/auth/card-wrapper'
import { AuthIllustration } from '@/components/auth/illustration'

export const metadata: Metadata = {
  title: 'Verify OTP'
}

const LoginPage = async ({
  searchParams
}: {
  searchParams: { email?: string; type?: string }
}) => {
  const { email, type } = searchParams

  if (!email || !type) return redirect('/login')

  const isEmailVerified = await checkUserEmailHasVerified(email)

  if (!isEmailVerified && type !== 'email-verification')
    return redirect('/login')

  if (isEmailVerified && type === 'email-verification')
    return redirect('/login')

  if (
    isEmailVerified &&
    !(type === 'sign-in' || type === 'forget-password' || type === '2fa')
  )
    return redirect('/login')

  return (
    <>
      <AuthIllustration
        src="/images/auth/illustration_verify_email.svg"
        alt="Verify Email Illustration"
        containerWidth="50%"
        containerHeight="50%"
      />
      <AuthCardWrapper
        headerLabel="Verify your OTP"
        headerDescription="Enter the verification code sent to your email"
      >
        <FormVerifyOTP />
      </AuthCardWrapper>
    </>
  )
}

export default LoginPage
