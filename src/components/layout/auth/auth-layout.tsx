import type { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="grid min-h-svh lg:grid-cols-2">{children}</div>
}
