'use client'
import React from 'react'
import { useGetCurrentUser } from "@/hooks/useAuth";
import { useGetChannel } from '@/hooks/useUser';
import Image from 'next/image';
import { dateFormatter, formatNumber } from "@/lib/utils";
import { Bell, Users } from 'lucide-react';

export default function ChannelHeader({ username }: { username: string }) {
    const { data: channelData, isLoading: channelDataLoading, isError } = useGetChannel(username);
    const { data: currentUser, isLoading: currentUserLoading } = useGetCurrentUser();

    return (
        <div className='w-full'>
            {channelDataLoading || currentUserLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error loading channel data.</p>
            ) : channelData ? (
                <div className="flex flex-col w-full items-center justify-center max-w-300 px-4 md:px-8 lg:px-16 py-2">
                    {channelData?.coverImage && (
                        <div className="flex h-32 w-full max-w-250 items-center">
                            <div className="relative h-full w-full ">
                                <Image
                                    src={channelData.coverImage}
                                    alt="CoverImage"
                                    className="object-cover rounded-lg"
                                    fill
                                />
                            </div>
                        </div>
                    )}
                    <div className="flex py-2 items-center w-full max-w-250 gap-4">
                        <div className="relative h-24 w-24">
                            <Image
                                src={channelData?.avatar ?? '/assets/avatar.png'}
                                alt="Profile"
                                className="rounded-full object-cover"
                                fill
                            />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-bold">{channelData?.fullName}</h2>
                            <div className="flex gap-1 text-gray-600">
                                <p>@{channelData?.username}</p>
                                .
                                <span>{formatNumber(channelData?.subscriberCount)} subscribers</span>
                            </div>
                            <span className="text-gray-600 text-sm">Joined in {dateFormatter(channelData?.createdAt)}</span>
                        </div>
                    </div>

                    <div className="flex py-2 items-center w-full max-w-250 gap-4">
                        {currentUser?.username === channelData?.username ? (
                           <div className="flex flex-col w-full gap-2 py-4">
                             <div className="flex w-full justify-between items-center gap-2">
                                <button className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors max-w-100">
                                    Edit Channel
                                </button>
                                <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors max-w-100">
                                    Manage Videos
                                </button>
                            </div>
                           </div>
                        ):(
                            <div className="flex flex-col w-full gap-2 py-4">
                                <div className="flex items-center justify-between w-full gap-4">
                                <button className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors max-w-100">
                                    {channelData?.isSubscribed ? (
                                        <div className="flex items-center gap-2 justify-center">
                                            <Bell size={20} />
                                            <span>Subscribed</span>
                                        </div>
                                    ) : 'Subscribe'}
                                </button>
                                <button className="flex flex-1 px-4 py-2 bg-gray-200 text-slate-900 rounded-md hover:bg-gray-300 transition-colors max-w-100 gap-4 items-center justify-center">
                                    <Users size={20} />
                                    <span>Community</span>
                                </button>
                            </div>
                            </div>
                        )}
                    </div>
                </div>

            ) : (
                <p>No channel data available.</p>
            )}
        </div>
    )
}
