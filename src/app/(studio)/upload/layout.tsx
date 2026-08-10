import React from 'react'
import UploadTabs from '@/components/channel/upload/UploadTabs'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'


export default async function UploadLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="h-screen overflow-hidde">
            <Navbar />
            <div className="flex h-full pt-14">
                <aside>
                    <Sidebar />
                </aside>

                <main className="flex flex-1 flex-col overflow-y-auto">
                    <span className="text-3xl font-semibold py-6 px-8 w-full">Channel Contents</span>
                    <div className="sticky top-0 z-10 bg-white">
                        <UploadTabs />
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
