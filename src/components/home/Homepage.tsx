'use client'
import React, { useEffect } from 'react'
import { useGetHomeFeed } from "@/hooks/useVideos";
import { useInView } from "react-intersection-observer";
import Skeleton from './Skeleton';
import { useRouter } from 'next/navigation';
import VideoCard from '../video/VideoCard';

type HomePageProps = {
  scrollRoot: HTMLElement | null;
}

export default function Homepage({ scrollRoot }: HomePageProps) {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useGetHomeFeed();
  const Video = data?.pages.flatMap(page => page.videos);

  const { ref, inView } = useInView({
    root: scrollRoot,
    rootMargin: '0px 0px 200px 0px',
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : isError ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Error loading videos. Please try again later.</p>
        </div>
      ) : (
        <div className='h-full w-full'>
          <div  className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
            {Video?.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
          <div ref={ref} className="w-full h-full">
            {isFetchingNextPage && (
            <Skeleton />
          )}
          </div>
        </div>
      )}
    </>
  )
}
