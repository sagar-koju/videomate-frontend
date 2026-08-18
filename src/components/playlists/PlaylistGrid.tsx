import React from 'react'
import ChannelPlaylistCard from './ChannelPlaylistCard';
import { Playlist } from '@/types/playlist';

export default function PlaylistGrid({ playlists }: { playlists: Playlist[] }) {
  if (!playlists || playlists.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No playlists created yet.
      </div>
    );
  }

  return (
    <div className=""></div>
  )
}


