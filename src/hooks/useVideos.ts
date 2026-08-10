import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {videoServices} from "@/services/videoServices";

export const useGetHomeFeed = () => {
    return useInfiniteQuery({
        queryKey: ['homeFeed'],
        queryFn: ({pageParam}) => videoServices.getHomeFeed({limit: 10, cursor: pageParam}),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextCursor : undefined;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnMount: true,
        retry: false,
    });
}

export const useGetDashboardVideos = () => {
    return useInfiniteQuery({
        queryKey: ['dashboardVideos'],
        queryFn: ({pageParam}) => videoServices.getDashboardVideos({limit: 10, cursor: pageParam}),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextCursor : undefined;
        },
        staleTime: 1000 * 60,
        refetchOnMount: true,
        retry: false,
    });
}

export const useGetChannelVideos = (userId: string, { enabled }: { enabled: boolean }) => {
    return useInfiniteQuery({
        queryKey: ['channelVideos', userId],
        queryFn: ({pageParam}) => videoServices.getChannelVideos({userId, limit: 10, cursor: pageParam}),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextCursor : undefined;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: enabled,
    });
}

export const useGetVideoById = (videoId: string) => {
    return useQuery({
        queryKey: ['video', videoId],
        queryFn: () => videoServices.getVideoById(videoId),
        enabled: !!videoId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}