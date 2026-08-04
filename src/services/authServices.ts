import { endpoints } from '@/api/endpoints'
import { apiClient } from '@/lib/apiClient'

export const authServices = {
    async login(email: string, password: string) {
        const response = await apiClient.post(endpoints.auth.login, { email, password })
        return response.data
    },

    async register(fullName: string, username: string, email: string, password: string, avatar?: File | null, coverImage?: File | null) {
        const formData = new FormData()
        formData.append('username', username)
        formData.append('fullName', fullName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('avatar', avatar || '')
        formData.append('coverImage', coverImage || '')
        const response = await apiClient.post(endpoints.auth.register, formData)
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
    },

    async getCurrentUser() {
        const response = await apiClient.get(endpoints.auth.getCurrentUser);
        return response.data;
    }
}
