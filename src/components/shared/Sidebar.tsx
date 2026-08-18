'use client'
import React, { useState } from 'react'
import { Home, SquareUserRound, Flame, ThumbsUp, RotateCcwClock, SquarePlay, Clock, ListVideo, ArrowDownToLine } from 'lucide-react'
import { useSidebar } from '@/providers/SidebarContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useGetCurrentUser } from '@/hooks/useAuth'

const Sidebar = () => {
    const pathname = usePathname();
    const { data: currentUser, isLoading, isError } = useGetCurrentUser();

    const { isOpen: isSidebarOpen } = useSidebar();
    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    const menuItems = [
    { name: 'Home', href: currentUser?.data ? "/dashboard" : "/", icon: Home },
    { name: 'Channel', href: `/channel/${currentUser?.data?.username??''}`, icon: SquareUserRound },
    { name: 'Your Videos', href: '/upload/videos', icon: SquarePlay },
    { name: 'Playlists', href: '/upload/playlists', icon: ListVideo },
    { name: 'Trending', href: '/trending', icon: Flame },
    { name: 'Liked Videos', href: '/liked', icon: ThumbsUp },
    { name: 'History', href: '/history', icon: RotateCcwClock },
    { name: 'Watch Later', href: '/watch-later', icon: Clock },
    { name: 'Downloads', href: '/downloads', icon: ArrowDownToLine },
    { name: 'Subscriptions', href: '/subscriptions', icon: SquareUserRound },
]

    return (
        <aside className={`h-full py-4 ${isSidebarOpen ? 'w-48' : 'w-16 '} border-r border-slate-200 bg-white`}>
            <nav className={`flex h-full flex-col gap-1 overflow-y-auto ${isSidebarOpen ? '' : 'scrollbar-hide'}`}>
                {menuItems.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`cursor-pointer px-5 py-2 ${active ? 'bg-slate-200' : 'hover:bg-slate-100'}`}>
                            <div className="flex shrink-0 items-center text-slate-900 gap-4">
                                <span className="flex shrink-0 items-center">
                                    <Icon size={20} />
                                </span>
                                {isSidebarOpen && <span className="text-sm">{item.name}</span>}
                            </div>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

export default Sidebar
