import React from 'react'
import DashboardPage from '@/components/dashboard/Dashboard'
import Sidebar from '@/components/shared/Sidebar'
import Navbar from '@/components/shared/Navbar'

const page = () => {
  return (
    <div className="h-screen overflow-hidden bg-white">
      <Navbar />
      <div className="flex h-full pt-14">
        <aside>
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-y-auto">
          <DashboardPage scrollRoot={null} />
        </main>
      </div>
    </div>
  )
}

export default page
