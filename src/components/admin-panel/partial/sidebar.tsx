'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Menu, ChevronLeft, Settings } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip'
import { cn } from '@/lib/shadcn'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const NavItem = ({
    item,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isBottom = false
  }: {
    item: (typeof navigation)[number]
    isBottom?: boolean
  }) => (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            'flex items-center rounded-md px-3 py-3 text-sm font-medium transition-colors',
            pathname === item.href
              ? 'bg-secondary text-secondary-foreground'
              : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground',
            isCollapsed && 'justify-center px-2'
          )}
        >
          <item.icon className={cn('h-4 w-4', !isCollapsed && 'mr-4')} />
          {!isCollapsed && <span>{item.name}</span>}
        </Link>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right" className="flex items-center gap-4">
          {item.name}
        </TooltipContent>
      )}
    </Tooltip>
  )

  return (
    <TooltipProvider>
      <>
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-md shadow-md"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div
          className={cn(
            'fixed inset-y-0 z-20 flex flex-col bg-background transition-all duration-300 ease-in-out lg:static',
            isCollapsed ? 'w-[72px]' : 'w-72',
            isMobileOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0',
            'shadow-md shadow-right'
          )}
        >
          <div className="border-b border-border">
            <div
              className={cn(
                'flex h-16 items-center gap-2 pl-6 pr-4',
                isCollapsed && 'justify-center px-2'
              )}
            >
              {!isCollapsed && (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 font-medium"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground py-4 px-5">
                    NA{/* TODO: Put logo here */}
                  </div>
                  | Next Auth
                </Link>
              )}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'ml-auto h-8 w-8 border-1 border-gray-200',
                  isCollapsed && 'ml-0'
                )}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <ChevronLeft
                  className={cn(
                    'h-5 w-5 transition-transform',
                    isCollapsed && 'rotate-180'
                  )}
                />
                <span className="sr-only">
                  {isCollapsed ? 'Expand' : 'Collapse'} Sidebar
                </span>
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <nav className="flex-1 space-y-2 px-4 py-8">
              {navigation.map(item => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>
          </div>
        </div>
      </>
    </TooltipProvider>
  )
}
