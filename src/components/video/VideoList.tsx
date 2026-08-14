'use client'
import React, { useState } from 'react'
import { Video } from '@/types/video'
import Image from 'next/image'
import { dateFormatter, formatDuration, formatNumber } from '@/lib/utils'
import { ChevronDown, Copy, Download, Edit, Trash2 } from 'lucide-react'
import { useToggleVideoPublishStatus } from '@/hooks/useVideos'
import Link from 'next/link'

const VideoList = ({ videos }: { videos: Video[] }) => {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
    const { mutate:toggleStatus, isPending, variables, isSuccess } = useToggleVideoPublishStatus()

    const toggleDropdown = (videoId: string) => {
        setOpenDropdownId((prev) => (prev === videoId ? null : videoId))
    }

    const handleVisibilityChange = (videoId: string, selectedIsPublished: boolean, currentValue: boolean) => {
        if (currentValue === selectedIsPublished) {
            return; // No change needed
        }
        toggleStatus(videoId);
        setOpenDropdownId(null)
    }

    return (
        <div className="w-full overflow-x-auto scrollbar-hide">
            <table className='min-w-225 w-full table-fixed'>
                <thead>
                    <tr className='border-y border-slate-500 h-12'>
                        <th className="sticky left-0 z-30 w-105 bg-white after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-slate-500 text-left px-4">
                            Video
                        </th>
                        <th className='w-30 text-left px-4'>Visibility</th>
                        <th className='w-30 text-left px-4'>Date</th>
                        <th className='w-30 text-left px-4'>Views</th>
                        <th className='w-30 text-left px-4'>Comments</th>
                        <th className='w-30 text-left px-4'>Likes</th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map((video) => {
                        const isMutating = isPending && variables === video._id
                        return (
                            < tr key={video._id} className='border-b border-slate-500 h-20' >
                                <td className="sticky left-0 z-30 w-105 h-full bg-white after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-slate-500 text-left px-4">
                                    <div className="group flex gap-2 h-full items-center">
                                        <div className="relative h-14 w-20">
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                sizes='150px'
                                                className="object-cover rounded-sm"
                                            />
                                            <div className="absolute flex items-center justify-center bg-black/60 py-0.5 px-1 right-1 bottom-1 rounded-sm">
                                                <span className="text-white text-xs">
                                                    {formatDuration(video.duration)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="group-hover:hidden flex-col flex-1 h-full min-w-0">
                                            <p className="text-md h-6 font-semibold line-clamp-1 wrap-break-word">
                                                {video.title}
                                            </p>
                                            <p className="text-sm h-10 text-gray-500 line-clamp-2 wrap-break-word">
                                                {video.description ? video.description : 'No description available'}
                                                {video.description}
                                            </p>
                                        </div>

                                        <div className="hidden group-hover:flex flex-col flex-1 min-w-0">
                                            <div className="flex w-full h-6">
                                                <Link href={`/watch?v=${video._id}`} className="text-md font-semibold line-clamp-2 wrap-break-word hover:underline">
                                                    {video.title}
                                                </Link>
                                            </div>
                                            <div className="flex items-center gap-2 w-full h-10">
                                                <div className="p-2 hover:bg-gray-200 rounded-full">
                                                    <Edit size={20} className="cursor-pointer " />
                                                </div>
                                                <div className="p-2 hover:bg-gray-200 rounded-full">
                                                    <Download size={20} className="cursor-pointer " />
                                                </div>
                                                <div className="p-2 hover:bg-gray-200 rounded-full">
                                                    <Copy size={20} className="cursor-pointer " />
                                                </div>
                                                <div className="p-2 hover:bg-gray-200 rounded-full">
                                                    <Trash2 size={20} className="cursor-pointer " />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="relative text-left px-4">
                                    <div className="flex items-center gap-1 h-10">
                                        {video.isPublished ? 'Public' : 'Private'}
                                        <ChevronDown onClick={() => toggleDropdown(video._id)} className="h-8 w-8 hover:bg-gray-200 rounded-full p-2 cursor-pointer" />
                                    </div>
                                    {openDropdownId === video._id && (
                                        <div className="absolute top-5 left-22 bg-white border border-gray-300 rounded shadow-md w-32 z-20">
                                            {/* <ul>
                                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Private</li>
                                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Public</li>
                                        </ul> */}
                                            <div className="flex flex-col px-4 py-2 gap-2">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name={`publishStatus-${video._id}`}
                                                        value="private"
                                                        checked={!video.isPublished}
                                                        disabled={isMutating}
                                                        onChange={() => handleVisibilityChange(video._id, false, video.isPublished)}
                                                    />
                                                    <span className="ml-2">Private</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name={`publishStatus-${video._id}`}
                                                        value="public"
                                                        checked={video.isPublished}
                                                        disabled={isMutating}
                                                        onChange={() => handleVisibilityChange(video._id, true, video.isPublished)} />
                                                    <span className="ml-2">Public</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className="text-left px-4">
                                    {dateFormatter(video.createdAt)}
                                </td>
                                <td className="text-left px-4">
                                    {video.views}
                                </td>
                                <td className="text-left px-4">
                                    {video.commentsCount}
                                </td>
                                <td className="text-left px-4">
                                    {video.likesCount}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </div >

    )
}

export default VideoList

