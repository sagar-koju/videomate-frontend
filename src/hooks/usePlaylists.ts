import {playlistServices} from "@/services/playlistServices";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export type CreatePlaylistPayload = {
    title: string;
    description: string;
    isPublic: boolean;
};

export const useCreatePlaylist = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({title, description, isPublic}: CreatePlaylistPayload) => playlistServices.createPlaylist(title, description, isPublic),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['playlists'] });
            await queryClient.invalidateQueries({ queryKey: ['myPlaylists'] });
        }
    })
};

export const useGetMyPlaylists = () => {
    return useInfiniteQuery({
        queryKey: ['myPlaylists'],
        queryFn: ({ pageParam }) => playlistServices.getMyPlaylists({ limit: 10, cursor: pageParam }),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
             return lastPage.hasMore ? lastPage.nextCursor : undefined;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnMount: true,
        retry: false,
    })
};

export const useGetUserPlaylists = (username: string) => {
    return useInfiniteQuery({
        queryKey: ['userPlaylists', username],
        queryFn: ({ pageParam }) => playlistServices.getUserPlaylists(username, { limit: 10, cursor: pageParam }),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextCursor : undefined;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnMount: true,
        retry: false,
    })
};

export const useTogglePlaylistVisibility = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (playlistId: string) =>{
            return playlistServices.togglePlaylistVisibility(playlistId)
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['myPlaylists'] });
            return {previousPlaylistData : queryClient.getQueryData(['myPlaylists'])};
        },
        onError: (err, playlistId, context) => {
            if (context?.previousPlaylistData) {
                queryClient.setQueryData(['myPlaylists'], context.previousPlaylistData);
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['playlists'] });
            await queryClient.invalidateQueries({ queryKey: ['myPlaylists'] });
        }
    })
};

export const useDeletePlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: (playlistId: string) => {
                return playlistServices.deletePlaylist(playlistId);
            },
            onMutate: async (playlistId: string) => {
                await queryClient.cancelQueries({ queryKey: ['myPlaylists'] });
                return { previousPlaylistData:  queryClient.getQueryData(['myPlaylists'])};
            },
            onError: (err, playlistId, context) => {
                if (context?.previousPlaylistData) {
                    queryClient.setQueryData(['myPlaylists'], context.previousPlaylistData);
                }
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ['playlists'] });
                await queryClient.invalidateQueries({ queryKey: ['myPlaylists'] });
            }
        })
};

