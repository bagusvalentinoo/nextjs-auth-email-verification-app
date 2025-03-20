import H1 from '@/components/ui/h1'

type ErrorLayoutProps = {
  title?: string
  message?: string
}

export const ErrorLayout = ({
  title = 'Internal Server Error',
  message = 'Something went wrong. Please try again later.'
}: ErrorLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-5 p-6">
      <H1>{title}</H1>
      <p>{message}</p>
    </main>
  )
}
