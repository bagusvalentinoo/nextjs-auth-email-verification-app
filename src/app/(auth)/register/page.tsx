import type { Metadata } from 'next'
import { FormRegister } from '@/app/(auth)/register/form-register'
import { AuthCardWrapper } from '@/components/auth/card-wrapper'
import { AuthIllustration } from '@/components/auth/illustration'
export const metadata: Metadata = {
  title: 'Sign Up'
}

const RegisterPage = () => {
  return (
    <>
      <AuthIllustration
        src="/images/auth/illustration_register.svg"
        alt="Register Illustration"
        width={500}
        height={500}
      />
      <AuthCardWrapper
        headerLabel="Create Account"
        headerDescription="Please fill out the form below to create an account"
        buttonBackLabel="Already have an account?"
        buttonBackLabelLink="Sign In"
        buttonBackHref="/login"
      >
        <FormRegister />
      </AuthCardWrapper>
    </>
  )
}

export default RegisterPage
