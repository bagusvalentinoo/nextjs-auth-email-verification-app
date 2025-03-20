import type { Metadata } from 'next'
import { FormVerifyOTP } from '@/app/(auth)/verify-otp/form-verify-otp'
import { AuthCardWrapper } from '@/components/auth/card-wrapper'
import { AuthIllustration } from '@/components/auth/illustration'

export const metadata: Metadata = {
  title: 'Verify OTP'
}

const LoginPage = () => {
  return (
    <>
      <AuthIllustration
        src="/images/auth/illustration_verify_email.svg"
        alt="Verify Email Illustration"
        width={450}
        height={450}
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
