import {endpoints} from '@/api/endpoints';
import {apiClient} from '@/lib/apiClient';

export const userServices = {
    async getCurrentUser() {
        const response = await apiClient.get(endpoints.users.getCurrentUser);
        return response.data;
    }
}