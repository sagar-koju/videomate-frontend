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
    },

    async getVideoById(videoId: string) {
        const response = await apiClient.get(endpoints.videos.getVideoById.replace(':videoId', videoId));
        return response.data.data;
    },

    async getMyVideos({ limit, cursor }: { limit?: number, cursor?: string }) {
        const params = { limit, ...(cursor && { cursor }) };
        const response = await apiClient.get(endpoints.videos.getMyVideos, { params });
        return response.data.data;
    },

    async uploadVideo(
        formData: FormData, 
        onProgress?: (percent: number) => void,
        signal?: AbortSignal
    ) {
        const response = await apiClient.post(endpoints.videos.uploadVideo, formData, {
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress?.(percent);
                }
            },
            signal,
        });
        return response.data.data;
    },

    async toggleVideoPublishStatus(videoId: string) {
        const response = await apiClient.patch(endpoints.videos.toggleVideoPublishStatus.replace(':videoId', videoId));
        return response.data.data;
    },

    async deleteVideo(videoId: string) {
        const response = await apiClient.delete(endpoints.videos.deleteVideo.replace(':videoId', videoId));
        return response.data.data;
    },
}