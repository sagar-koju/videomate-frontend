'use client'
import React, { useEffect, useState } from 'react'
import { Menu, Search, CircleUserRound, Settings } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/providers/SidebarContext'
import Link from 'next/link'
import { useGetCurrentUser } from '@/hooks/useAuth'
import {useRouter} from "next/navigation";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const { toggleSidebar } = useSidebar()

  const { data: currentUser, isLoading, isError } = useGetCurrentUser();

  if(!isLoading) {
    console.log('Current User:', currentUser);
  }

  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  }

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [currentUser]);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 h-14 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-5 py-2">
        <div className="flex items-center gap-4">
          <Menu className="text-slate-900 hover:cursor-pointer" size={20} onClick={toggleSidebar} />
          <span className="ml-2 text-lg font-semibold text-slate-900">VideoMate</span>
        </div>

        <div className="relative mx-8 flex-1 max-w-xl">
          <Input
            type="text"
            placeholder="Search"
            className="rounded-full"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-900" size={16} />
        </div>

        {!isLoading && !isError && currentUser?.avatar ? (
          <Link href="/profile" className="flex items-center gap-4">
            <Settings className="text-slate-900" size={20} />
            <CircleUserRound className="text-slate-900 text-xs" size={25} />
          </Link>
        ) : (
          <Link href="/login" className="flex items-center gap-4">
            <Settings className="text-slate-900" size={20} />
            <button onClick={handleLogin} className="flex items-center rounded-full border border-slate-900 p-1">
              <CircleUserRound className="text-slate-900" size={20} />
              <span className="mx-1 text-sm font-medium">Sign in</span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
