import {endpoints} from "@/api/endpoints";
import {apiClient} from "@/lib/apiClient";

export const playlistServices = {
    async createPlaylist(name: string, description: string, isPublic: boolean) {
        const response = await apiClient.post(endpoints.playlists.create, { name, description, isPublic });
        return response.data.data;
    },

    async getMyPlaylists({cursor, limit}: {cursor?: string, limit: number}) {
        const response = await apiClient.get(endpoints.playlists.getMyPlaylists, { params: { cursor, limit } });
        return response.data.data;
    },

    async getUserPlaylists(username: string, {cursor, limit}: {cursor?: string, limit: number}) {
        const response = await apiClient.get(endpoints.playlists.getUserPlaylists.replace(':username', username), { params: { cursor, limit } });
        return response.data.data;
    },

    async togglePlaylistVisibility(playlistId: string) {
        const response = await apiClient.patch(endpoints.playlists.togglePlaylistVisibility.replace(':playlistId', playlistId));
        return response.data.data;
    },

    async deletePlaylist(playlistId: string) {
        const response = await apiClient.delete(endpoints.playlists.deletePlaylist.replace(':playlistId', playlistId));
        return response.data.data;
    },

    async addVideoToPlaylist(playlistId: string, videoId: string) {
        const response = await apiClient.post(endpoints.playlists.addVideoToPlaylist.replace(':playlistId', playlistId).replace(':videoId', videoId));
        return response.data.data;
    }
}