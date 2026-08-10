'use client'
import { CircleUserRound, SquareUserRound } from 'lucide-react'
import router from 'next/dist/shared/lib/router/router';
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';
import React from 'react'

const Home = () => {
    const router = useRouter();
    const { username } = useParams();

    console.log('username:', username);

    const handleLogin = () => {
        router.push('/login');
    }

    return (
        <div className="flex items-center justify-center w-full h-2/3">
            {username ? (
                <div className="flex flex-col px-10 py-4 items-center gap-4">
                    
                    <Link href="/login" className="flex items-center "><button onClick={handleLogin} className="flex flex-col items-center  p-1 gap-4">
                        <h3 className="mx-1 text-xl font-medium">Create and upload videos.</h3>
                        <span className="mx-1 text-sm font-medium">Create</span>
                    </button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col px-10 py-4 items-center gap-4">
                    <div className="flex flex-col items-center ">
                        <SquareUserRound className="text-slate-900" size={60} />
                        <h1 className="text-2xl font-semibold text-gray-900">Sign in to view your channel</h1>
                    </div>
                    <Link href="/login" className="flex items-center "><button onClick={handleLogin} className="flex items-center rounded-full border border-slate-900 p-1">
                        <CircleUserRound className="text-slate-900" size={20} />
                        <span className="mx-1 text-sm font-medium">Sign in</span>
                    </button>
                    </Link>
                </div>

            )}
        </div>
    )
}

export default Home
