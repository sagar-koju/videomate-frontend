import { authServices } from '@/services/authServices'
import { userServices } from '@/services/userService';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export type LoginPayload = {
    email: string;
    password: string;
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ email, password }: LoginPayload) => authServices.login(email, password),
        onSuccess: async (response) => {
            await queryClient.setQueryData(['currentUser'], {
                statusCode: 200,
                message: 'Current user fetched successfully',
                data: response?.data?.user,
            });
            await queryClient.invalidateQueries({ queryKey: ['homeFeed'] });
        }
    })
}

export type SignupPayload = {
    fullName: string;
    username: string;
    email: string;
    password: string;
    avatar: File | null;
    coverImage: File | null;
};

export const useRegister = () => {
    return useMutation({
        mutationFn: (
            {
                fullName,
                username,
                email,
                password,
                avatar,
                coverImage
            }: SignupPayload) => authServices.register(
                fullName,
                username,
                email,
                password,
                avatar ?? undefined,
                coverImage ?? undefined
            ),
    })
}

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: authServices.getCurrentUser,
        retry: false,
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => authServices.logout(),
        onSuccess: async () => {
            await queryClient.removeQueries({ queryKey: ['currentUser'] });
            await queryClient.removeQueries({ queryKey: ['homeFeed'] });
        }
    })
}