'use client'
import { useSearchParams } from 'next/navigation';
import { useGetVideoById } from '@/hooks/useVideos';
import { CircleAlert } from 'lucide-react';
import VideoBox from './VideoBox';

export default function WatchPage() {
    return (
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-6 gap-2">
           <div className="lg:col-span-4">
            <VideoBox />
           </div>
           <div className="lg:col-span-2">

           </div>
        </div>
    )
}