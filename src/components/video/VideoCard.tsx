import React, { useEffect, useRef, useState } from 'react'
import { Video } from '@/types/video'
import Link from 'next/link'
import Image from 'next/image'
import { formatDuration, timeAgo } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { EllipsisVertical, ListVideo, Clock, Share2, ArrowDownToLine, Flag } from 'lucide-react'
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useDismiss,
    useInteractions,
    useClick,
    useHover,
    safePolygon,
    FloatingPortal,
    FloatingTree,
    FloatingNode,
    useFloatingNodeId,
    useFloatingParentNodeId,
} from '@floating-ui/react'

const dropDownMenuItems = [
    { name: 'watch-later', label: 'Add to Watch Later', icon: Clock, action: () => { } },
    { name: 'playlist', label: 'Add to Playlist', icon: ListVideo, action: () => { } },
    { name: 'share', label: 'Share', icon: Share2, action: () => { } },
    { name: 'download', label: 'Download', icon: ArrowDownToLine, action: () => { } },
    { name: 'report', label: 'Report', icon: Flag, action: () => { } },
]

const VideoCard = ({ video }: { video: Video }) => {
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
    const router = useRouter();

    const nodeId = useFloatingNodeId();
    const { refs, floatingStyles, context } = useFloating({
        nodeId,
        open: menuDropdownOpen,
        onOpenChange: setMenuDropdownOpen,
        placement: 'bottom-start',
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(5),
            flip(),
            shift({ padding: 8 })],
    });

    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

    return (
        <div
            onClick={() => router.push(`/watch?v=${video._id}`)}
            key={video._id}
            className=" p-2 flex flex-col hover:shadow-md max-h-70 rounded-md border hover:cursor-pointer">
            <div className="relative w-full h-44 sm:h-40">
                <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes='400px'
                    className=" object-cover rounded-md" />
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                    {formatDuration(video.duration)}
                </div>
            </div>
            <div className="flex gap-2 py-2">
                <Link
                    href={`/channel/${video.owner.username}`}
                    onClick={(e) => e.stopPropagation()}
                    className="relative h-10 w-10">
                    <Image
                        src={video.owner.avatar}
                        alt="avatar"
                        fill
                        sizes='100px'
                        className="object-cover overflow-hidden rounded-full" />
                </Link>
                <div className="flex-1 flex-col">
                    <h3 className="font-semibold line-clamp-2 leading-4.5">{video.title}</h3>
                    <div className="flex">
                        <Link
                            href={`/channel/${video.owner.username}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-gray-600 line-clamp-2">
                            {video.owner.fullName}
                        </Link>
                    </div>
                    <p className="text-sm text-gray-600">{video.views} views • {timeAgo(video.createdAt)}</p>
                </div>
                <div ref={refs.setReference}
                    {...getReferenceProps({
                        onClick: (e) => {
                            e.stopPropagation();
                            setMenuDropdownOpen(prev => !prev);
                        }
                    })}
                    className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer p-1">
                    <EllipsisVertical
                        className="text-gray-500" />

                    {menuDropdownOpen && (
                        <FloatingPortal>
                            <div
                                ref={refs.setFloating}
                                style={floatingStyles}
                                {...getFloatingProps()}
                                className="z-20 w-50" >
                                <div className="flex flex-col bg-white border shadow-md rounded-md overflow-hidden">
                                    {dropDownMenuItems.map((item) => (
                                        <button
                                            key={item.name}
                                            className="flex items-center py-2 px-4 text-left hover:bg-gray-100 gap-4"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                item.action();
                                                setMenuDropdownOpen(false);
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
        </div >
    )
}

export default VideoCard
