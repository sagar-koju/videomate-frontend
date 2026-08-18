'use client';
import { formatDuration, formatNumber, timeAgo } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react'
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
import { Playlist } from '@/types/playlist';

const dropdownItems = [
    { name: 'watch-later', label: 'Add to Watch Later', icon: Clock, action: () => { } },
    { name: 'playlist', label: 'Add to Playlist', icon: ListVideo, action: () => { } },
    { name: 'share', label: 'Share', icon: Share2, action: () => { } },
    { name: 'download', label: 'Download', icon: ArrowDownToLine, action: () => { } },
    { name: 'report', label: 'Report', icon: Flag, action: () => { } },
]

const ChannelPlaylistCard = ({ playlist }: { playlist: Playlist }) => {
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

    console.log('playlist', playlist);
    return (
        <div onClick={() => { router.push(`/watch?v=${playlist._id}`) }} className="group rounded-md">
            <div className="group-hover:shadow-md block p-2 rounded-md">
                <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-300">
                    <div className="absolute flex bottom-2 right-2 gap-2 bg-black/40 rounded-md px-2 py-1 text-white text-sm items-center">
                        <ListVideo className="w-4 h-4" />
                        <span>{playlist.videoCount}</span>
                        <p>videos</p>
                    </div>
                </div>

                <div
                    className="relative flex">
                    <div className="mt-2 flex-1">
                        <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-black">
                            {playlist.name}
                        </h3>
                        <p className='text-sm text-slate-500'>View full playlist</p>
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

export default ChannelPlaylistCard
