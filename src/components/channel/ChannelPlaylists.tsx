import React from 'react'
import { useParams } from 'next/navigation'
import { useGetCurrentUser } from '@/hooks/useAuth'

const ChannelPlaylists = () => {
    const { username } = useParams<{ username: string }>()
    const { data: currentUser } = useGetCurrentUser()
  return (
    <div className=""></div>
  )
}

export default ChannelPlaylists
