import React from 'react'
import {useParams} from 'next/navigation'
import { useGetChannel } from '@/hooks/useUser'

const ChannelVideos = () => {
    const params = useParams();
    const username = params.username as string;


  return (
    <div>
      
    </div>
  )
}

export default ChannelVideos
