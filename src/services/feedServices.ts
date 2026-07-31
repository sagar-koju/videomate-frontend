import { apiClient } from "@/lib/apiClient";
import { endpoints } from "@/api/endpoints";

export const feedServices = {
    async getHomeFeed({ limit, cursor }: { limit?: number, cursor?: string }) {
        const params = { limit, ...(cursor && { cursor }) };
        const response = await apiClient.get(endpoints.videos.getHomeFeed, { params });
        return response.data.data;
    }
}