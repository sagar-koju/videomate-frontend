import React from 'react'

export default async function VideoGrid({params,}: {params: Promise<{ videoId: string }>}) {
  const { videoId } = await params;
  return (
    <div>
      
    </div>
  )
}


