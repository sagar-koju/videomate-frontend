import React from 'react'
import VideoCard, {Video} from './VideoCard'



export default function VideoGrid( {videos}: {videos: Video[]}) {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No videos uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
      {videos?.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}


