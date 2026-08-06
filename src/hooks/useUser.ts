import {userServices} from '@/services/userService';
import {useQuery} from "@tanstack/react-query";

export const useGetChannel = (username: string) => {
    return useQuery({
        queryKey: ['channel', username],
        queryFn: () => userServices.getChannel(username),
        enabled: !!username, // Only run the query if username is provided
        refetchOnWindowFocus: false, 
        refetchOnMount: false,
    });
}