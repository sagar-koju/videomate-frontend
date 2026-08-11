import { formatDuration, formatNumber, timeAgo } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Video } from '@/types/video';

// export interface Video {
//     id: string;
//     title: string;
//     description: string;
//     videoFile: string;
//     thumbnail: string;
//     owner: string;
//     createdAt: string;
//     updatedAt: string;
//     likesCount: number;
//     views: number;
//     duration: number;
// }

const VideoCard = ({ video }: { video: Video }) => {
    return (
        <div>
            <Link href={`/watch/${video.id}`} className="group block shadow-md p-2 rounded-md">
                <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-200">
                    <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-200"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                        {formatDuration(video.duration)}
                    </span>
                </div>

                <div className="mt-2">
                    <h3 className="text-lg font-semibold line-clamp-2 leading-snug group-hover:text-black">
                        {video.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {formatNumber(video.views)} · {timeAgo(video.createdAt)}
                    </p>
                </div>
            </Link>
        </div>
    )
}

export default VideoCard
