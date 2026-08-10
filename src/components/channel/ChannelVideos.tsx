'use client'
import React from 'react'
import { useGetChannelVideos } from '@/hooks/useVideos'
import {useGetChannel} from "@/hooks/useUser";
import VideoGrid from '@/components/video/VideoGrid'
import { useParams } from 'next/navigation';

const ChannelVideos = () => {
  const {username} = useParams<{ username: string }>();
  const {data:channel, isLoading: isChannelLoading} = useGetChannel(username);
  const { data: videos, isLoading: isVideosLoading, isError } = useGetChannelVideos(channel?._id, { enabled: !!channel?._id });

  const videoList = videos?.pages.flatMap(page => page.videos) || [];

  return (
    <div>
      {isChannelLoading || isVideosLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading videos.</div>
      ) : (
        <VideoGrid videos={videoList} />
      )}
    </div>
  )
}

export default ChannelVideos
