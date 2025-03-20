import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import { AuthLayout as AuthLayoutScreen } from '@/components/layout/auth/auth-layout'

type AuthLayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthLayoutScreen>{children}</AuthLayoutScreen>
    </>
  )
}

export default AuthLayout
