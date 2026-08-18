'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetChannel } from '@/hooks/useUser'
import { useGetUserPlaylists } from '@/hooks/usePlaylists'
import ChannelPlaylistCard from '../playlists/ChannelPlaylistCard'

const ChannelPlaylists = () => {
  const { username } = useParams<{ username: string }>();
  const { data, isLoading, isError } = useGetUserPlaylists(username);
  const playlists = data?.pages.flatMap(page => page.playlists) || [];
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading playlists.</div>
      ) : (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {playlists?.map((playlist) => (
            <ChannelPlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ChannelPlaylists
