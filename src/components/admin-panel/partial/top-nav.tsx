'use client'

import { RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ModeToggle } from '@/components/mode-toggle'
import { authClient } from '@/lib/auth-client'

export function TopNav() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)
  const router = useRouter()
  const { data: session, isPending, error } = authClient.useSession()

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          toast.loading('Logging out...')
        },
        onSuccess: () => {
          toast.dismiss()
          toast.success('Logged out successfully')
          router.push('/login')
        },
        onError: ctx => {
          toast.dismiss()
          toast.error(ctx.error.message)
        }
      }
    })
  }

  if (error) {
    toast.error(error.message)
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex container h-16 items-center gap-6 lg:gap-0 justify-end lg:justify-between px-4 md:px-6">
        <div className="hidden md:block">
          <nav className="flex items-center space-x-2">
            {pathSegments[0] !== 'dashboard' && (
              <>
                <Link href="/dashboard" className="text-sm font-medium">
                  Dashboard
                </Link>
                <span className="text-muted-foreground">/</span>
              </>
            )}
            {pathSegments.map((segment, index) => (
              <Fragment key={segment}>
                <Link
                  href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                  className="text-sm font-medium"
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              </Fragment>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full border-2 border-gray-200 p-4 dark:bg-background">
                  <span className="text-xs font-medium text-black dark:text-white">
                    {session?.user?.name?.charAt(0) || 'NA'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {isPending ? (
                      <RefreshCcw className="size-4 mr-2 animate-spin" />
                    ) : (
                      session?.user?.name
                    )}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {isPending ? (
                      <RefreshCcw className="size-4 mr-2 animate-spin" />
                    ) : (
                      session?.user?.email
                    )}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
