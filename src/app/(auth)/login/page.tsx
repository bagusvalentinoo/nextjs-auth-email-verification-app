import type { Metadata } from 'next'
import { FormLogin } from '@/app/(auth)/login/form-login'
import { AuthCardWrapper } from '@/components/auth/card-wrapper'
import { AuthIllustration } from '@/components/auth/illustration'

export const metadata: Metadata = {
  title: 'Sign In'
}

const LoginPage = () => {
  return (
    <>
      <AuthIllustration
        src="/images/auth/illustration_login.svg"
        alt="Login Illustration"
        width={400}
        height={400}
      />
      <AuthCardWrapper
        headerLabel="Sign In to your account"
        headerDescription="Enter your email below to sign in to your account"
        buttonBackLabel="Don't have an account?"
        buttonBackLabelLink="Sign up"
        buttonBackHref="/register"
      >
        <FormLogin />
      </AuthCardWrapper>
    </>
  )
}

export default LoginPage
