'use client';
import { formatDuration, formatNumber, timeAgo } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { Video } from '@/types/video';
import { ArrowDownToLine, Clock, EllipsisVertical, Flag, ListVideo, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useDismiss,
    useInteractions,
    FloatingPortal
} from '@floating-ui/react';

const dropdownItems = [
    { name: 'watch-later', label: 'Add to Watch Later', icon: Clock, action: () => { } },
    { name: 'playlist', label: 'Add to Playlist', icon: ListVideo, action: () => { } },
    { name: 'share', label: 'Share', icon: Share2, action: () => { } },
    { name: 'download', label: 'Download', icon: ArrowDownToLine, action: () => { } },
    { name: 'report', label: 'Report', icon: Flag, action: () => { } },
]

const ChannelVideoCard = ({ video }: { video: Video }) => {
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: dropdownOpen,
        onOpenChange: setDropdownOpen,
        placement: 'bottom-start',
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(5),
            flip(),
            shift({ padding: 8 }),
        ],

    });

    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

    return (
        <div onClick={() => { router.push(`/watch?v=${video._id}`) }} className="group rounded-md">
            <div className="group-hover:shadow-md block p-2 rounded-md">
                <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-200">
                    <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover "
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                        {formatDuration(video.duration)}
                    </span>
                </div>

                <div
                    className="relative flex">
                    <div className="mt-2 flex-1">
                        <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-black">
                            {video.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {formatNumber(video.views)} · {timeAgo(video.createdAt)}
                        </p>
                    </div>
                    <div
                        ref={refs.setReference}
                        {...getReferenceProps({
                            onClick: (e) => {
                                e.stopPropagation();
                                setDropdownOpen(prev => !prev);
                            }
                        })} className="h-10 w-10 mt-2 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer p-1">
                        <EllipsisVertical className="text-gray-500" />

                        {dropdownOpen && (
                            <FloatingPortal>
                                <div
                                    ref={refs.setFloating}
                                    style={floatingStyles}
                                    {...getFloatingProps()}
                                    className="z-20 w-50" >
                                    <div className="flex flex-col bg-white border shadow-md rounded-md overflow-hidden">
                                        {dropdownItems.map((item) => (
                                            <button
                                                key={item.name}
                                                className="flex items-center px-4 py-2 text-left hover:bg-gray-100 gap-4"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    item.action();
                                                    setDropdownOpen(false);
                                                }}
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </FloatingPortal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChannelVideoCard
