import type { ReactNode } from 'react'

import { Sidebar } from '@/components/admin-panel/partial/sidebar'
import { TopNav } from '@/components/admin-panel/partial/top-nav'
import { ThemeProvider } from '@/components/providers/theme-provider'

type ProtectedLayoutProps = Readonly<{
  children: ReactNode
}>

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-900">
        <Sidebar />
        <div className="flex-1">
          <TopNav />
          <div className="container mx-auto p-6">
            <main className="w-full">{children}</main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
export default ProtectedLayout
