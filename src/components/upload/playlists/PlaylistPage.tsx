'use client'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useGetMyPlaylists } from '@/hooks/usePlaylists'
import PlaylistForm from './PlaylistForm'
import Playlists from './Playlists'

const tabs = [
    { name: 'Visibility', key: 'visibility' },
    { name: 'Date', key: 'date' },
    { name: 'Views', key: 'views' },
    { name: 'Comments', key: 'comments' },
    { name: 'Likes', key: 'likes' }
]

const PlaylistPage = () => {
    const { data, isLoading, isError } = useGetMyPlaylists();
    const playlists = data?.pages.flatMap(page => page.playlists) || [];
    const [isUploadOpen, setIsUploadOpen] = useState(false)

    useEffect(() => {
        console.log('playlists', playlists)
    }, [data]);

    return (
        <div className="relative flex flex-col">
            <div className="w-full flex flex-col">
                <div className="flex items-center justify-end w-full px-4 py-2 gap-6">
                    <h1 className="text-lg font-bold">Create new playlist</h1>
                    <button
                        type="button"
                        onClick={() => setIsUploadOpen(true)}
                        className="px-3 py-2 bg-slate-900 text-white text-sm rounded hover:bg-slate-800 flex items-center gap-0.5"
                    >
                        <Plus size={14} />
                        Create
                    </button>
                </div>

            </div>

            <PlaylistForm
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
            />

            <div className="w-full flex flex-1 flex-col">
                {isLoading ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div>Error loading playlists.</div>
                ) : !playlists || playlists?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <h2 className="text-lg font-semibold text-gray-800">No playlists found</h2>
                        <p className="text-sm text-gray-600">You haven't created any playlists yet.</p>
                    </div>
                ) : (
                    <Playlists playlists={playlists} />
                )}
            </div>
        </div>
    )
}

export default PlaylistPage
