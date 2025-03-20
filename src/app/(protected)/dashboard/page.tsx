import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard'
}

const DashboardPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
    </div>
  )
}

export default DashboardPage
