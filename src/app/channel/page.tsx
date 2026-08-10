import Home from '@/components/channel/Home'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

const page = () => {
    return (
        <div className="h-screen overflow-hidde">
            <Navbar />
            <div className="flex h-full pt-14">
                <aside>
                    <Sidebar />
                </aside>
                <main className="flex-1 overflow-y-auto">
                    <Home />
                </main>
            </div>
        </div>
    )
}

export default page
