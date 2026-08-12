import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {videoServices} from "@/services/videoServices";
import { useCallback, useRef, useState } from "react";
import { abort } from "process";

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

export const useGetMyVideos = () => {
    return useInfiniteQuery({
        queryKey: ['myVideos'],
        queryFn: ({pageParam}) => videoServices.getMyVideos({limit: 10, cursor: pageParam}),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextCursor : undefined;
        },
        staleTime: 0,
    })
}

export const useUploadVideo = () => {
    const [progress, setProgress] = useState(0);
    const queryClient = useQueryClient();
    const abortControllerRef = useRef<AbortController | null>(null);

    const mutation = useMutation({
        mutationFn: (formData: FormData) => {
            abortControllerRef.current = new AbortController();
            return videoServices.uploadVideo(formData, (percent) => 
                setProgress(percent),
            abortControllerRef.current.signal
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myVideos'] });
            queryClient.invalidateQueries({ queryKey: ['dashboardVideos'] });
            queryClient.invalidateQueries({ queryKey: ['channelVideos'] });
        },
        onSettled: () => {
            setProgress(0);
            abortControllerRef.current = null;
        },
    });

    const cancleUpload = useCallback(() => {
        abortControllerRef.current?.abort();
    }, []);

    return {
        uploadVideoMutation: mutation,
        cancleUpload,
        isUploading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
        progress,
    }
}