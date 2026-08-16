'use client'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useGetMyVideos } from '@/hooks/useVideos'
import VideoList from '../../video/VideoList'
import VideoUploadForm from './VideoUploadForm'

const tabs = [
    { name: 'Visibility', key: 'visibility' },
    { name: 'Date', key: 'date' },
    { name: 'Views', key: 'views' },
    { name: 'Comments', key: 'comments' },
    { name: 'Likes', key: 'likes' }
]

const VideoPage = () => {
    const { data: videos, isLoading, isError } = useGetMyVideos();
    const videoList = videos?.pages.flatMap(page => page.videos) || [];
    const [isUploadOpen, setIsUploadOpen] = useState(false)

    return (
        <div className="relative flex flex-col">
            <div className="w-full flex flex-col">
                <div className="flex items-center justify-end w-full px-4 py-2 gap-6">
                    <h1 className="text-lg font-bold">Add new video</h1>
                    <button
                        type="button"
                        onClick={() => setIsUploadOpen(true)}
                        className="px-3 py-2 bg-slate-900 text-white text-sm rounded hover:bg-slate-800 flex items-center gap-0.5"
                    >
                        <Plus size={14} />
                        Add
                    </button>
                </div>

            </div>

            <VideoUploadForm
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
            />

            <div className="w-full flex flex-col">
                {isLoading ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div>Error loading videos.</div>
                ) : !videos || videos?.pages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <h2 className="text-lg font-semibold text-gray-800">No videos found</h2>
                        <p className="text-sm text-gray-600">You haven't uploaded any videos yet.</p>
                    </div>
                ) : (
                    <VideoList videos={videoList} />
                )}
            </div>
        </div>
    )
}

export default VideoPage
