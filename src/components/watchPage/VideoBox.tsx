'use client'
import { useSearchParams } from 'next/navigation';
import { useGetVideoById } from '@/hooks/useVideos';
import { CircleAlert } from 'lucide-react';

export default function VideoBox() {
    const searchParams = useSearchParams();
    const videoId = searchParams.get('v');

    const { data: videoData, isLoading, isError } = useGetVideoById(videoId || '');

    return (
        <div className="h-full w-full p-2">
            {!videoId ? (
                <div className="h-2/3 lg:h-full max-w-250 bg-black flex items-center justify-center">
                    <div className="flex text-slate-300 gap-2 items-center">
                        <CircleAlert size={20} className="" />
                        <span>Video not found.</span>
                    </div>
                </div>
            ) : isLoading ? (
                <div className="h-2/3 lg:h-full max-w-250 bg-black flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-gray-400 to-[#333333] p-1.5 animate-spin">
                        <div className="h-full w-full rounded-full bg-black" />
                    </div>
                </div>
            ) : isError ? (
                <div className="h-2/3 lg:h-full max-w-250 bg-black flex items-center justify-center">
                    <div className="flex text-slate-300 gap-2 items-center">
                        <CircleAlert size={20} className="" />
                        <span>Error loading video. Please try again later.</span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full w-full ">
                    <div className="flex-1 max-w-250 bg-black">
                        <video
                            src={videoData?.videoFile}
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="py-4">
                        <h1 className="text-xl font-bold line-clamp-2">{videoData?.title}</h1>
                        <p className="text-gray-500 line-clamp-3">{videoData?.description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}