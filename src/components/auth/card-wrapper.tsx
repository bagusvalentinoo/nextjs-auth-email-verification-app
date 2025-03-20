import Link from 'next/link'
import type { ReactNode } from 'react'

type AuthCardWrapperProps = {
  children: ReactNode
  headerLabel: string
  headerDescription: string
  buttonBackLabel?: string
  buttonBackLabelLink?: string
  buttonBackHref?: string
}

export const AuthCardWrapper = ({
  children,
  headerLabel,
  headerDescription,
  buttonBackLabel,
  buttonBackLabelLink,
  buttonBackHref
}: AuthCardWrapperProps) => {
  return (
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 lg:justify-end">
        <div className="flex items-center gap-2 font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground py-4 px-5">
            NA
          </div>
          | Next Auth
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">{headerLabel}</h1>
              <p className="text-balance text-sm text-muted-foreground">
                {headerDescription}
              </p>
            </div>
            {children}
            <div className="text-center text-sm">
              {buttonBackLabel && buttonBackLabelLink && buttonBackHref && (
                <>
                  {buttonBackLabel}
                  <Link
                    href={buttonBackHref}
                    className="underline underline-offset-4 ms-2"
                  >
                    {buttonBackLabelLink}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
