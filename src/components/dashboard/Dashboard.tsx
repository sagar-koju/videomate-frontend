'use client'
import React, { useEffect } from 'react'
import { dummyVideos } from "@/types/data";
import { useGetHomeFeed } from "@/hooks/useVideos";
import { useInView } from "react-intersection-observer";
import Skeleton from '@/components/home/Skeleton';
import { formatDuration, timeAgo } from "@/lib/utils";
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/navigation';

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
        <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 p-1">
          {Video?.map((video) => (
            <div
              onClick={() => router.push(`/watch?v=${video._id}`)}
              key={video._id}
              className="p-2 flex flex-col hover:shadow-md max-h-70 rounded-md border hover:cursor-pointer">
              <div className="relative w-full h-44 sm:h-40">
                <Image src={video.thumbnail} alt={video.title} fill className=" object-cover rounded-md" />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                  {formatDuration(video.duration)}
                </div>
              </div>
              <div className="flex gap-2 py-2">
                <Link
                  href={`/channel/${video.owner.username}`}
                  onClick={(e) => e.stopPropagation()}
                  className="relative h-14 w-14">
                  <Image src={video.owner.avatar} alt="avatar" fill className="object-cover overflow-hidden rounded-full border border-slate-300 p-0.5" />
                </Link>
                <div className="flex-1 flex-col">
                  <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                  <div className="flex">
                    <Link
                      href={`/channel/${video.owner.username}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm text-gray-600 line-clamp-2">
                      {video.owner.fullName}
                    </Link>
                  </div>
                  <p className="text-sm text-gray-600">{video.views} views • {timeAgo(video.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
