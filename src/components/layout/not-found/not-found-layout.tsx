import Link from 'next/link'

import { Button } from '@/components/ui/button'
import H1 from '@/components/ui/h1'

type NotFoundLayoutProps = {
  title: string
  description: string
  buttonTitle?: string
  buttonHref?: string
}

export const NotFoundLayout = ({
  title,
  description,
  buttonTitle = 'Kembali ke Beranda',
  buttonHref = '/'
}: NotFoundLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-5 p-6">
      <H1>{title}</H1>
      <p>{description}</p>
      {buttonTitle && buttonHref && (
        <Button type="button" size="lg">
          <Link href={buttonHref}>{buttonTitle}</Link>
        </Button>
      )}
    </main>
  )
}
