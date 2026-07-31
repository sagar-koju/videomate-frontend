import { endpoints } from '@/api/endpoints'
import { apiClient } from '@/lib/apiClient'

export const authServices = {
    async login(email: string, password: string) {
        const response = await apiClient.post(endpoints.auth.login, { email, password })
        return response.data
    },

    async register(username: string, fullName: string, email: string, password: string, avatar: string, coverImage: string) {
        const response = await apiClient.post(endpoints.auth.register, { username, fullName, email, password, avatar, coverImage })
        return response.data
    },

    async logout() {
        const response = await apiClient.post(endpoints.auth.logout)
        return response.data
    },

    async refreshToken() {
        const response = await apiClient.post(endpoints.auth.refreshToken)
        return response.data
    },

    async changePassword(oldPassword: string, newPassword: string) {
        const response = await apiClient.post(endpoints.auth.changePassword, { oldPassword, newPassword })
        return response.data
    }
}