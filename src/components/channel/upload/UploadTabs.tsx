'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useGetChannel } from '@/hooks/useUser'
import Link from 'next/link'

export default function UploadTabs() {
    const pathname = usePathname();
    const basePath = `/upload`;

    const tabs = [
        { name: 'Videos', href: `/videos` },
        { name: 'Playlists', href: `/playlists` },
        { name: 'Shorts', href: `/shorts` },
        { name: 'Live', href: `/live` },
        { name: 'Posts', href: `/posts` }
    ]

    return (
        <nav className="w-full">
            <div className="flex w-full items-center justify-center max-w-300 px-6">
                <div className="flex w-full max-w-250 items-center">
                    {tabs.map((tab) => {
                        const href = `${basePath}${tab.href}`;
                        const isActive = tab.href === "Videos" 
                        ? pathname === basePath 
                        : pathname === href || pathname.startsWith(`${href}/`);

                        return (
                            <Link
                                key={tab.name}
                                href={href}
                                className={`px-4 py-2 text-sm font-medium ${isActive
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
