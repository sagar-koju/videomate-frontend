import React from 'react'
import UploadTabs from '@/components/upload/UploadTabs'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'


export default async function UploadLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="h-screen overflow-hidden">
            <Navbar />
            <div className="flex h-full pt-14">
                <aside>
                    <Sidebar />
                </aside>

                <main className="min-w-0 flex flex-1 flex-col overflow-y-auto">
                    <span className="text-3xl font-semibold py-6 px-8 w-full">Channel Contents</span>
                    <div className="sticky top-0 z-10 bg-white">
                        <UploadTabs />
                    </div>
                    <hr />
                    <div className="w-full"> 
                        <div className="w-full flex items-center py-2">
                            <div className="w-full">
                                {children}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
