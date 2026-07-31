'use client'

import React from 'react'
import Link from 'next/link'

// Free-to-use photo (Unsplash License — no attribution required, commercial use ok)
// Photo by Bare Kind on Unsplash: https://unsplash.com/photos/enzN8CPLyRA
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1733744236808-9d3c0223939c?fm=jpg&q=80&w=1600&auto=format&fit=crop'

const Signup = () => {
  return (
    <div className="min-h-screen w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 items-center p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-slate-900">Create an Account</h1>
          <p className="text-slate-600">
            Join our community and start sharing your videos today!
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-slate-600">Enter your name</p>
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
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Full name"
              className="w-full pl-10 pr-3.5 py-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-slate-600">Enter username</p>
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
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username"
              className="w-full pl-10 pr-3.5 py-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-slate-600">Enter password</p>
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
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-3.5 py-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-slate-600">Confirm password</p>
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
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Full name"
                  className="w-full pl-10 pr-3.5 py-3 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:bg-white transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  )
}

export default Signup