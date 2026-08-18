'use client'
import React, { useEffect, useRef, useState } from 'react'
import { dateFormatter} from '@/lib/utils'
import { ChevronDown, Copy, Download, Edit, ListVideo, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Playlist } from '@/types/playlist'
import { useTogglePlaylistVisibility, useDeletePlaylist } from '@/hooks/usePlaylists'

const Playlists = ({ playlists }: { playlists: Playlist[] }) => {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const { mutate: toggleStatus, isPending, variables, isSuccess } = useTogglePlaylistVisibility()


    const toggleDropdown = (videoId: string) => {
        setOpenDropdownId((prev) => (prev === videoId ? null : videoId))
    }

    const handleVisibilityChange = (videoId: string, selectedIsPublic: boolean, currentValue: boolean) => {
        if (currentValue === selectedIsPublic) {
            return; // No change needed
        }
        toggleStatus(videoId);
        setOpenDropdownId(null)
    }

    const deletePlaylistMutation = useDeletePlaylist()
    const [deletePlaylistId, setDeletePlaylistId] = useState<string | null>(null)
    const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false)

    const handleDelete = () => {
        if (deletePlaylistId) {
            deletePlaylistMutation.mutate(deletePlaylistId, {
                onSuccess: () => {
                    setDeletePlaylistId(null)
                    setIsOpenDeleteConfirm(false)
                }
            })
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenDropdownId(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative w-full overflow-x-auto scrollbar-hide">
            <table className='min-w-225 w-full table-fixed'>
                <thead>
                    <tr className='border-y border-slate-500 h-12'>
                        <th className="sticky left-0 z-30 w-105 bg-white after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-slate-500 text-left px-4">
                            Video
                        </th>
                        <th className='w-30 text-left px-4'>Visibility</th>
                        <th className='w-30 text-left px-4'>Video count</th>
                        <th className='w-30 text-left px-4'>Last updated</th>
                        <th className='w-30 text-left px-4'>Created</th>
                        {/* <th className='w-30 text-left px-4'>Views</th> */}
                    </tr>
                </thead>
                <tbody>
                    {playlists.map((playlist) => {
                        const isMutating = isPending && variables === playlist._id
                        return (
                            < tr key={playlist._id} className='border-b border-slate-500 h-20' >
                                <td className="sticky left-0 z-30 w-105 h-full bg-white after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-slate-500 text-left px-4">
                                    <div className="group flex gap-2 h-full items-center">
                                        <div className="relative h-14 w-20 bg-gray-200 rounded-lg overflow-hidden">
                                            <div className="absolute h-full w-1/2 flex flex-col items-center justify-center bg-black/50 py-0.5 px-1 right-0 bottom-0">
                                                <span className="text-white text-sm">
                                                    {playlist.videoCount}
                                                </span>
                                                <ListVideo className='text-white' />
                                            </div>
                                        </div>

                                        <div className="group-hover:hidden flex-col flex-1 h-full min-w-0">
                                            <p className="text-md h-6 font-semibold line-clamp-1 wrap-break-word">
                                                {playlist.name}
                                            </p>
                                            <p className="text-sm h-10 text-gray-500 line-clamp-2 wrap-break-word">
                                                {playlist.description ? playlist.description : 'No description available'}
                                            </p>
                                        </div>

                                        <div className="hidden group-hover:flex flex-col flex-1 min-w-0">
                                            <div className="flex w-full h-6">
                                                <Link href={`/watch?v=${playlist._id}`} className="text-md font-semibold line-clamp-2 wrap-break-word hover:underline">
                                                    {playlist.name}
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
                                                    <Trash2 
                                                    onClick={() => {
                                                        setDeletePlaylistId(playlist._id)
                                                        setIsOpenDeleteConfirm(true)
                                                    }} size={20} className="cursor-pointer " />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="relative text-left px-4">
                                    <div className="flex items-center gap-1 h-10">
                                        {playlist.isPublic ? 'Public' : 'Private'}
                                        <ChevronDown onClick={() => toggleDropdown(playlist._id)} className="h-8 w-8 hover:bg-gray-200 rounded-full p-2 cursor-pointer" />
                                    </div>
                                    {openDropdownId === playlist._id && (
                                        <div ref={dropdownRef} className="absolute top-5 left-22 bg-white border border-gray-300 rounded shadow-md w-32 z-20">
                                            {/* <ul>
                                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Private</li>
                                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Public</li>
                                        </ul> */}
                                            <div className="flex flex-col px-4 py-2 gap-2">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name={`publishStatus-${playlist._id}`}
                                                        value="private"
                                                        checked={!playlist.isPublic}
                                                        disabled={isMutating}
                                                        onChange={() => handleVisibilityChange(playlist._id, false, playlist.isPublic)}
                                                    />
                                                    <span className="ml-2">Private</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name={`publishStatus-${playlist._id}`}
                                                        value="public"
                                                        checked={playlist.isPublic}
                                                        disabled={isMutating}
                                                        onChange={() => handleVisibilityChange(playlist._id, true, playlist.isPublic)} />
                                                    <span className="ml-2">Public</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className="text-left px-4">
                                    {playlist.videoCount}
                                </td>
                                <td className="text-left px-4">
                                    {dateFormatter(playlist.updatedAt)}
                                </td>
                                <td className="text-left px-4">
                                    {dateFormatter(playlist.createdAt)}
                                </td>

                                {/* <td className="text-left px-4">
                                    {playlist.views ? formatNumber(playlist.views) : 0}
                                </td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {isOpenDeleteConfirm && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-2 rounded-lg shadow-lg">
                       <div className="flex flex-col border-2 p-4 rounded-lg">
                         <h3 className="text-xl font-bold mb-2">Confirm Delete</h3>
                        <p className="">You can't undo this action.</p>
                        <p className="mb-4">Are you sure you want to delete '{deletePlaylistId ? playlists.find(p => p._id === deletePlaylistId)?.name : ''}'?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setIsOpenDeleteConfirm(false)
                                    setDeletePlaylistId(null)
                                }}
                                className="px-4 py-2 text-sm bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 hover:cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={deletePlaylistMutation.isPending}
                                onClick={() => {handleDelete()}}
                                className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 hover:cursor-pointer"
                            >
                                {deletePlaylistMutation.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                       </div>
                    </div>
                </div>
            )}

        </div >

    )
}

export default Playlists

