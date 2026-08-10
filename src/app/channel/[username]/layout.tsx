import ChannelHeader from '@/components/channel/shared/ChannelHeader'
import ChannelTabs from '@/components/channel/shared/ChannelTabs'
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
                    <div className="sticky top-0 z-10 bg-white">
                      <ChannelTabs username={username} />
                    </div>
                    <hr />
                    <div className="w-full">
                      <div className="w-full flex items-center justify-center max-w-300 px-4 md:px-8 lg:px-16 py-2">
                        <div className="w-full max-w-250">
                          {children}
                        </div>
                      </div>
                    </div>
                </main>
            </div>
        </div>
  )
}
