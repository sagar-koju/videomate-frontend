import DashboardPage from '@/components/dashboard/Dashboard'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import Trending from '@/components/trending/Trending'
import React from 'react'

const page = () => {
  return (
      <div className="h-screen overflow-hidden bg-white">
      <Navbar />
      <div className="flex h-full pt-14">
        <aside>
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Trending scrollRoot={null} />
        </main>
      </div>
    </div>
  )
}

export default page
