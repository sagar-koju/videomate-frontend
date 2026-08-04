import { authServices } from '@/services/authServices'
import { userServices } from '@/services/userService';
import { useMutation, useQuery } from "@tanstack/react-query";

export type LoginPayload = {
    email: string;
    password: string;
};

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: LoginPayload) => authServices.login(email, password),
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
        queryFn: userServices.getCurrentUser,
        retry: false,
    })
}