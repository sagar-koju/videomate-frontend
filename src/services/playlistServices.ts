import {endpoints} from "@/api/endpoints";
import {apiClient} from "@/lib/apiClient";

export const playlistServices = {
    async createPlaylist(title: string, description: string, isPublic: boolean) {
        const response = await apiClient.post(endpoints.playlists.create, { title, description, isPublic });
        return response.data.data;
    }
}