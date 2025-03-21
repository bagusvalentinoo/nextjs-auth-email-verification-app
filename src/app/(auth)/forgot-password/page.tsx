import type { Metadata } from 'next'

import { FormForgotPassword } from '@/app/(auth)/forgot-password/form-forgot-password'
import { AuthCardWrapper } from '@/components/auth/card-wrapper'
import { AuthIllustration } from '@/components/auth/illustration'

export const metadata: Metadata = {
  title: 'Forgot Password'
}

const ForgotPasswordPage = () => {
  return (
    <>
      <AuthIllustration
        src="/images/auth/illustration_forgot_password.svg"
        alt="Forgot Password Illustration"
        containerWidth="50%"
        containerHeight="50%"
      />
      <AuthCardWrapper
        headerLabel="Forgot Password"
        headerDescription="Please enter your email below to reset your password"
        buttonBackLabel="Back to Login"
        buttonBackLabelLink="Login"
        buttonBackHref="/login"
      >
        <FormForgotPassword />
      </AuthCardWrapper>
    </>
  )
}
export default ForgotPasswordPage
