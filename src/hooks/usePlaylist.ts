import {playlistServices} from "@/services/playlistServices";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

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
        }
    })
}

export const useGetPlaylists = () => {
    return useQuery({
        queryKey: ['playlists'],
        queryFn: playlistServices.getPlaylists,
        retry: false,
    })
}