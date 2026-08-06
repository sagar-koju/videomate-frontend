'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Menu, Search, CircleUserRound, Settings, Bell, Users, Globe, Moon, LogOut, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/providers/SidebarContext'
import Link from 'next/link'
import { useGetCurrentUser } from '@/hooks/useAuth'
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { useLogout } from '@/hooks/useAuth'

const dropdownItems = [
  { label: 'Profile', href: '/profile', icon: CircleUserRound },
  { label: 'Account Settings', href: '/account-settings', icon: Settings },
  { label: 'Switch Account', href: '/switch-account', icon: Users },
  { label: 'Appearance', href: '/appearance', icon: Moon },
  { label: 'Language', href: '/language', icon: Globe },
  { label: 'Help', href: '/help', icon: HelpCircle },
]

const Navbar = () => {
  const { toggleSidebar } = useSidebar()
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter();

  const { data: currentUser, isLoading} = useGetCurrentUser();

  if (!isLoading) {
    console.log('Current User:', currentUser);
  }

  const handleLogin = () => {
    router.push('/login');
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenProfileDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      logoutMutation.mutate(undefined, {
        onSuccess: () => {
          setOpenProfileDropdown(false)
          router.push('/')
          router.refresh()
        }
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 h-14 border-b border-slate-200 bg-white">
      <div className="relative flex h-full items-center justify-between px-5 py-2">
        <div className="flex items-center gap-4">
          <Menu className="text-slate-900 hover:cursor-pointer" size={20} onClick={toggleSidebar} />
          <span className="ml-2 text-lg font-semibold text-slate-900">VideoMate</span>
        </div>

        <div className="relative mx-8 flex-1 max-w-xl">
          <Input
            type="text"
            placeholder="Search"
            className="rounded-full px-4"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-900" size={16} />
        </div>

        {currentUser ? (
          <div className="flex items-center gap-4">
            <Bell className="text-slate-900" size={20} />
            <div className="relative" ref={dropdownRef}>
              {currentUser?.data?.avatar ? (
                <div onClick={() => setOpenProfileDropdown(prev => !prev)} className="relative h-8 w-8">
                  <Image
                    src={currentUser.data.avatar}
                    alt="Profile"
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
              ) : (
                <CircleUserRound className="text-slate-900" size={25} />
              )}
              {openProfileDropdown && (
                <div className="absolute right-0 top-12 w-70  rounded-md border border-slate-300 bg-white">
                  <div className="flex flex-col w-full h-full py-4">
                    <div className="relative flex w-full justify-center items-center p-4 pb-1">
                      <div className="relative h-20 w-20">
                        <Image
                          src={currentUser.data.avatar}
                          alt="Profile"
                          className="rounded-full object-cover"
                          fill
                        />
                      </div>
                    </div>
                    <div className="flex items-center flex-col">
                      <span className="ml-2 text-lg font-semibold text-slate-900">{currentUser.data.fullName}</span>
                      <span className="ml-2 text-sm text-slate-700">@{currentUser.data.username}</span>
                    </div>
                    <div className="flex flex-col gap-1 mt-4">
                      {dropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-slate-100"
                        >
                          <item.icon size={20} />
                          <span className="text-sm text-slate-900">{item.label}</span>
                        </Link>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-slate-100"
                      >
                        <LogOut size={20} />
                        <span className="text-sm text-slate-900">Sign out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
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
