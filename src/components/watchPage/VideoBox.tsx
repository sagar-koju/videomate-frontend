'use client'
import { useSearchParams } from 'next/navigation';
import { useGetVideoById } from '@/hooks/useVideos';
import { CircleAlert, Heart, Share, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { formatNumber } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export default function VideoBox() {
    const searchParams = useSearchParams();
    const videoId = searchParams.get('v');
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const { data: videoData, isLoading, isError } = useGetVideoById(videoId || '');

     useEffect(() => {
        const element = descriptionRef.current;

        if (element) {
            setIsOverflowing(element.scrollHeight > element.clientHeight);
        }
    }, [videoData]);

    useEffect(() => {
        setExpanded(false);
        setIsOverflowing(false);
    }, [videoId]);

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
                    <div className="flex-1 max-w-236 min-h-100 bg-black">
                        <video
                            src={videoData?.videoFile}
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col gap-2 py-4">
                        <h1 className="text-xl text-left font-bold line-clamp-2">{videoData?.title}</h1>
                        <div className="w-full flex flex-col sm:flex-row gap-4 justify-between border-y py-4 ">
                            <div className="flex gap-4 items-center">
                                <div className="relative h-14 w-14 rounded-full ">
                                    <Image
                                        src={videoData?.owner.avatar || '/default-avatar.png'}
                                        alt='User Avatar'
                                        fill
                                        className="object-cover rounded-full"
                                        sizes='32px'
                                        />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{videoData?.owner.username || 'User'}</span>
                                    <span className="text-sm text-gray-500">{videoData?.owner.subscribers || 0} subscribers</span>
                                </div>
                                <button className="ml-4 px-4 py-2  bg-red-600 text-white rounded-full hover:bg-red-700">
                                    Subscribe
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="py-2 px-4 flex items-center gap-2 rounded-full hover:bg-gray-200 border-2 border-gray-300">
                                    <ThumbsUp size={20} />
                                    {formatNumber(videoData?.likesCount)}
                                </button>
                                <button className="py-2 px-4  flex items-center rounded-full hover:bg-gray-200 border-2 border-gray-300">
                                    <ThumbsDown size={20} />
                                </button>
                                <button className="py-2 px-4  flex items-center rounded-full hover:bg-gray-200 border-2 border-gray-300 gap-2">
                                    <Share2 size={20} />
                                    Share
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 w-full bg-gray-100 p-4 rounded-lg">
                            <p 
                            ref={descriptionRef} 
                            className={`text-sm text-gray-700 ${expanded ? '' :'line-clamp-2'}`}>{videoData?.description || 'No description available'}
                            </p>
                            {isOverflowing && (
                                <button 
                                onClick={() => setExpanded((prev) => !prev)}
                                className="mt-2 hover:underline">
                                    {expanded ? 'Show less' : 'Show more'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}