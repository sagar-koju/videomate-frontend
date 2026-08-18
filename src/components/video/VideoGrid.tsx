import React from 'react'
import ChannelVideoCard from './ChannelVideoCard'
import { Video } from '@/types/video'

export default function VideoGrid( {videos}: {videos: Video[]}) {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No videos uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2  lg:grid-cols-3">
      {videos?.map((video) => (
        <ChannelVideoCard key={video._id} video={video} />
      ))}
    </div>
  )
}


