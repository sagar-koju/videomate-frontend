'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useLogin } from '@/hooks/useAuth'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const loginMutation = useLogin()

  const router = useRouter();

  const handleLogin = () => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (error) => {
          const errorMessage = error as AxiosError<{
                      message?: string,
                      error?: string;
                    }>;
          
          const apiErrorMessage = 
          errorMessage.response?.data?.message || 
          errorMessage.response?.data?.error || 
          'Login failed. Please try again.';

          setErrorMessage(apiErrorMessage);
        }
      }
    )
  }

  return (
    <div className="min-h-screen w-full bg-black/10 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl h-[640px] bg-white rounded-[22px] shadow-2xl shadow-slate-400/40 grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT: FORM */}
        <div className="flex flex-col justify-between p-8 md:p-11 order-2 md:order-1">
          {/* logo */}
          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 8c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4s-1.8 4-4 4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4h4c2.2 0 4-1.8 4-4"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
            />
          </svg>

          {/* form */}
          <div className="flex flex-col gap-4 max-w-[300px] overflow-y-auto">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-1">
                Welcome back
              </p>
              <h1 className="text-2xl font-extrabold text-slate-900">
                Sign in to continue
              </h1>
            </div>

            {/* email */}
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
              </svg>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-10 pr-3.5 py-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
              />
            </div>

            {/* password */}
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-3.5 py-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
              />
            </div>

            <div className="flex items-center gap-2 justify-end">
              <Link href="/forgot-password" className="text-[13px] font-medium hover:underline text-blue-600">
                Forgot Password?
              </Link>
            </div>
            <div className="flex flex-col">
              {errorMessage && (
                <p className="text-red-500 text-sm">
                  {errorMessage}
                </p>
              )}
              <button disabled={loginMutation.isPending} onClick={() => { handleLogin() }} className="mt-1.5 w-full py-3 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-300 transition">
                {loginMutation.isPending ? 'Logging...' : 'Login'}
              </button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-[13px] font-medium text-slate-800">Don't have an account?</p>
              <Link href="/signup" className="text-xs font-medium text-blue-600 hover:underline">
                Register now
              </Link>
            </div>
          </div>

          {/* socials */}
          <div className="max-w-[300px]">
            <p className="text-xs text-slate-400 mb-2.5">Login with</p>
            <div className="flex gap-4">
              <a href="#" className="text-[13px] font-semibold text-slate-600 hover:text-blue-600">
                Facebook
              </a>
              <a href="#" className="text-[13px] font-semibold text-slate-600 hover:text-blue-600">
                Twitter
              </a>
              <a href="#" className="text-[13px] font-semibold text-slate-600 hover:text-blue-600">
                Google
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: JOURNEY PANEL */}
        <div className="relative order-1 md:order-2 h-64 md:h-full overflow-hidden">
          {/* photo */}
          <img
            src='/assets/wind-mill.jpg'
            alt="Hiker with a backpack standing on a mountain"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* readability gradient over the photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-900/20 to-blue-950/50" />

          {/* progress dashes */}
          <div className="absolute top-9 right-10 z-10 flex gap-1.5">
            <div className="w-4 h-0.5 rounded bg-white/90" />
            <div className="w-4 h-0.5 rounded bg-white/35" />
          </div>

          {/* headline */}
          <div className="absolute top-16 left-30 right-10 z-10">
            <p className="text-xs text-white/75 mb-1 text-right">Free Video Sharing Application</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-none tracking-tight text-right ">
              Journey to content creation and sharing
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
