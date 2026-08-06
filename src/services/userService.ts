import {endpoints} from '@/api/endpoints';
import {apiClient} from '@/lib/apiClient';

export const userServices = {
    async getChannel(username: string) {
        const response = await apiClient.get(endpoints.users.getChannel.replace(':username', username));
        return response.data;
    }
}