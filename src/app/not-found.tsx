import type { Metadata } from 'next'
import { NotFoundLayout } from '@/components/layout/not-found/not-found-layout'

export const metadata: Metadata = {
  title: 'Not Found'
}

const NotFound = async () => {
  return (
    <NotFoundLayout
      title="Page Not Found"
      description="Sorry, the page you are looking for does not exist."
      buttonTitle="Back to Home"
      buttonHref="/login"
    />
  )
}

export default NotFound
