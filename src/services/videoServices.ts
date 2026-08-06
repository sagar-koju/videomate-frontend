import { apiClient } from "@/lib/apiClient";
import { endpoints } from "@/api/endpoints";

export const videoServices = {
    async getHomeFeed({ limit, cursor }: { limit?: number, cursor?: string }) {
        const params = { limit, ...(cursor && { cursor }) };
        const response = await apiClient.get(endpoints.videos.getHomeFeed, { params });
        return response.data.data;
    },

    async getDashboardVideos({ limit, cursor }: { limit?: number, cursor?: string }) {
        const params = { limit, ...(cursor && { cursor }) };
        const response = await apiClient.get(endpoints.videos.getDashboardVideos, { params });
        return response.data.data;
    },
    
    async getChannelVideos({ userId, limit, cursor }: { userId: string, limit?: number, cursor?: string }) {
        const params = { limit, ...(cursor && { cursor }) };
        const response = await apiClient.get(endpoints.videos.getChannelVideos.replace(':userId', userId), { params });
        return response.data.data;
    }
}