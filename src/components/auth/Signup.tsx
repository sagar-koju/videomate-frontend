'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { UserRound } from 'lucide-react'
import Image from 'next/image'
import { useRegister } from '@/hooks/useAuth'
import PasswordInput from './PasswordInput'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

// const HERO_IMAGE = 'http://res.cloudinary.com/awo2btba/image/upload/v1784882759/qfwlhieglujgpnmjgce4.jpg'

const Signup = () => {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatarImage, setAvatarImage] = useState<File | null>(null)
  const [imageName, setImageName] = useState('No file chosen')
  const [previewUrl, setPreviewUrl] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const registerMutation = useRegister()

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    registerMutation.mutate(
      {
        fullName: fullName,
        username: username,
        email: email,
        password: password,
        avatar: avatarImage,
        coverImage: null
      },
      {
        onSuccess: () => {
          router.push('/login');
        },
        onError: (error) => {
          console.error('Registration failed:', error);

          const errorMessage = error as AxiosError<{
            message?: string,
            error?: string;
          }>;

          const apiErrorMessage = 
          errorMessage.response?.data?.message || 
          errorMessage.response?.data?.error || 
          'Registration failed. Please try again.';

          setErrorMessage(apiErrorMessage);
        }
      }
    )
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setImageName('No file chosen')
      return
    }
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.')
      return
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    const url = URL.createObjectURL(file)
    setAvatarImage(file)
    setImageName(file.name)
    setPreviewUrl(url)
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <form onSubmit={handleSubmit} >
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
              <Link href="/login" className="text-slate-900 px-4 py-2 text-sm hover:bg-slate-100 rounded-lg items-center border">
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
            <div className="grid md:grid-cols-3 px-5 py-4">
              <div className="flex flex-col lg:items-center">
                <div className="flex-col justify-start items-start w-full p-4">
                  <p className='text-2xl text-slate-800 font-semibold'>Create your account</p>
                  <p className='text-slate-600 text-sm'>Join Videomate and share your experience and knowledge through video content.</p>
                </div>
                <div className="flex flex-col gap-4 w-full p-4 ">
                  <span className='text-slate-700'>Choose Avatar</span>
                  {previewUrl ? (
                    <div className="relative h-20 w-20">
                      <Image
                        src={previewUrl}
                        alt="Avatar"
                        fill
                        unoptimized
                        className="object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-slate-200 rounded-full">
                      <UserRound className="w-14 h-14 text-slate-400" strokeWidth={1} />
                    </div>
                  )}
                  <div className="flex md:flex-col flex-1 gap-4">
                    <span className='flex-1 min-w-28 h-8 border rounded-sm px-4 flex items-center whitespace-nowrap  line-clamp-1 max-w-88 scrollbar-hide'>{imageName}</span>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden " />
                    <button type='button' className="text-slate-700 text-sm bg-slate-200 hover:bg-slate-300 h-8 rounded-md px-4 py-1 max-w-30" onClick={() => { fileInputRef.current?.click() }}>
                      {previewUrl ? 'Change' : 'Upload'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 w-full p-4 col-span-2">
                <div className="grid lg:grid-cols-2 gap-3 w-full">
                  <div className="flex flex-col">
                    <p className='text-slate-700'>Full name</p>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 text-sm rounded-sm border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className='text-slate-700'>Username</p>
                    <input
                      type="text"
                      placeholder="Choose a unique username"
                      className="w-full px-4 py-3 text-sm rounded-sm border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <p className='text-slate-700'>Email</p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 text-sm rounded-sm border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-3 w-full">
                  <div className="flex flex-col">
                    <p className='text-slate-700'>Password</p>
                    <PasswordInput
                      value={password}
                      onChange={setPassword}
                      placeholder="Enter your password"
                    />
                    <p className="text-slate-500 text-xs py-2">Minimum 8 characters with a mix of letters and numbers.</p>
                  </div>

                  <div className="flex flex-col">
                    <p className='text-slate-700'>Confirm Password</p>
                    <PasswordInput
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      placeholder="Confirm your password"
                    />
                    <span className="text-red-500 text-xs py-2">{password !== confirmPassword && "Passwords do not match"}</span>
                  </div>
                </div>

                <div className="w-full h-12 flex items-center bg-slate-100 px-4 rounded-sm">
                  <input
                    type='checkbox'
                    className='mr-2 cursor-pointer'
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <p className='text-slate-600 text-sm'>I agree to the <span className='text-blue-500 hover:underline cursor-pointer'>Terms of Service</span> and <span className='text-blue-500 hover:underline cursor-pointer'>Privacy Policy</span>.</p>
                </div>

                {errorMessage && (
                  <div className="text-red-500 text-sm">
                    {errorMessage}
                  </div>
                )}


                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className='text-slate-600 text-sm'>Already have an account? </span>
                    <span className='text-blue-500 text-sm hover:underline cursor-pointer'>Login</span>
                  </div>
                  <button
                    type='submit'
                    disabled={!agreedToTerms}
                    className="ml-auto px-4 py-3 rounded-sm bg-blue-500 text-white text-sm cursor-pointer hover:bg-blue-600 transition  disabled:cursor-not-allowed disabled:bg-blue-300">
                    {registerMutation.isPending ? 'Registering...' : 'Register'}
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