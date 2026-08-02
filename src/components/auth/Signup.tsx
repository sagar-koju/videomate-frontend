'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Camera, Edit, User, UserRound } from 'lucide-react'
import Image from 'next/image'
import { useRegister } from '@/hooks/useAuth'

// const HERO_IMAGE = 'http://res.cloudinary.com/awo2btba/image/upload/v1784882759/qfwlhieglujgpnmjgce4.jpg'

const Signup = () => {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatarImage, setAvatarImage] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')

  const registerMutation = useRegister()

  const handleRegister = () => {
    registerMutation.mutate({
      fullName: fullName,
      username: username,
      email: email,
      password: password,
      avatar: avatarImage,
      coverImage: coverImage
    })
  }

  const handleAvatarUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = async (e: any) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) {
        return
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit example
        alert('Image must be under 5MB')
        return
      }
    }
  }

    return (
      <form>
        <div className="flex min-h-screen w-full flex-col overflow-y-auto bg-black/10">
          <div className="w-full h-18 items-center px-6 py-4 border bg-white">
            <div className="w-full flex justify-between items-center">
              <Link href="/" className="flex">
                {/* logo */}
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 8c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4s-1.8 4-4 4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4h4c2.2 0 4-1.8 4-4"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-slate-900 text-xl mt-1 font-bold"> Videomate</span>
              </Link>

              <div className="flex gap-4">
                <Link href="/login" className="text-slate-900 px-4 py-2 text-sm hover:bg-slate-200 rounded-lg items-center">
                  Login
                </Link>
                <Link href="/signup" className="p-2 bg-blue-500 text-white text-sm rounded-lg items-center hover:bg-blue-600">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center sm:p-4 lg:px-20 lg:py-15">
            <div className="flex w-full max-w-6xl flex-col items-center sm:rounded-lg bg-white shadow-sm">
              {/* <div className="flex items-center justify-center h-30 w-full bg-slate-300 rounded-t-lg">
                {coverImage ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={coverImageUrl}
                      alt="Cover"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="flex p-1 h-6 w-6 cursor-pointer absolute top-2 right-2 hover:bg-black/20 items-center rounded-full">
                      <Edit className="text-slate-200" />
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setCoverImage} className="flex flex-col items-center justify-center gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer">
                    <Camera className="w-6 h-6 text-slate-600" />
                    <p className="text-slate-600 text-xs">Upload Cover Photo</p>
                  </button>
                )}
              </div> */}
              <div className="grid md:grid-cols-3 px-5 py-4">
                <div className="flex flex-col lg:items-center">
                  <div className=" h-20 w-full ">
                    {avatarImage ? (
                      <div className="relative h-20 w-20">
                        <Image
                          src={avatarUrl}
                          alt="Avatar"
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="flex gap-5">
                        <div className="w-20 h-20 flex items-center justify-center bg-slate-200 rounded-full">
                          <UserRound className="w-14 h-14 text-slate-400" strokeWidth={1} />
                        </div>
                        <button className="text-slate-700 text-sm bg-slate-200 hover:bg-slate-300 h-8 rounded-md px-4 py-1 mt-10" onClick={() => handleAvatarUpload()}>Upload
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex-col justify-start items-start w-full p-4">
                    <p className='text-xl text-slate-800 font-semibold'>Create your account</p>
                    <p className='text-slate-600 text-sm'>Join Videomate and share your experience and knowledge through video content.</p>
                  </div>
                </div>

                <div className="grid gap-4 w-full p-4 col-span-2">
                  <div className="grid lg:grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col">
                      <p className='text-slate-700'>Full name</p>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-2 py-3 text-sm rounded-sm border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
                      />
                    </div>

                    <div className="flex flex-col">
                      <p className='text-slate-700'>Username</p>
                      <input
                        type="text"
                        placeholder="Choose a unique username"
                        className="w-full px-2 py-3 text-sm rounded-sm border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <p className='text-slate-700'>Email</p>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      className="w-full px-2 py-3 text-sm rounded-sm border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
                    />
                  </div>

                  <div className="grid lg:grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col">
                      <p className='text-slate-700'>Password</p>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-2 py-3 text-sm rounded-sm border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
                      />
                      <p className="text-slate-500 text-xs py-2">Minimum 8 characters with a mix of letters and numbers.</p>
                    </div>

                    <div className="flex flex-col">
                      <p className='text-slate-700'>Confirm Password</p>
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full px-2 py-3 text-sm rounded-sm border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="w-full h-16 flex items-center bg-slate-100 px-4 rounded-sm">
                    <input type='checkbox' className='mr-2 cursor-pointer' />
                    <p className='text-slate-600 text-sm'>I agree to the <span className='text-blue-500 hover:underline cursor-pointer'>Terms of Service</span> and <span className='text-blue-500 hover:underline cursor-pointer'>Privacy Policy</span>.</p>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className='text-slate-600 text-sm'>Already have an account? </span>
                      <span className='text-blue-500 text-sm hover:underline cursor-pointer'>Login</span>
                    </div>
                    <button className="ml-auto px-4 py-3 rounded-sm bg-blue-500 text-white text-sm cursor-pointer hover:bg-blue-600 transition">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }

  export default Signup