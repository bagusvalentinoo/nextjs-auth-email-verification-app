import type { Metadata } from 'next'
import { FormResetPassword } from '@/app/(auth)/reset-password/form-reset-password'
import { AuthCardWrapper } from '@/components/auth/card-wrapper'
import { AuthIllustration } from '@/components/auth/illustration'

export const metadata: Metadata = {
  title: 'Reset Password'
}

const ResetPasswordPage = () => {
  return (
    <>
      <AuthIllustration
        src="/images/auth/illustration_reset_password.svg"
        alt="Reset Password Illustration"
        width={500}
        height={500}
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
