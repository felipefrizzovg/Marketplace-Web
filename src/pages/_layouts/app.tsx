import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col bg-shape-background px-40 pb-40 pt-16">
        <Outlet />
      </div>
    </div>
  )
}
