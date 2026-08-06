import ChannelHeader from '@/components/channel/ChannelHeader'
import ChannelTabs from '@/components/channel/ChannelTabs'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

export default async function ChannelLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ username: string }>
}) {
  const { username } = await params;

  return (
     <div className="h-screen overflow-hidde">
            <Navbar />
            <div className="flex h-full pt-14">
                <aside>
                    <Sidebar />
                </aside>
                <main className="flex-1 overflow-y-auto">
                    <ChannelHeader username={username} />
                    <ChannelTabs username={username} />
                    <hr />
                    {children}
                </main>
            </div>
        </div>
  )
}
