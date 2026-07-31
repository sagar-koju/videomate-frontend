import {useInfiniteQuery} from "@tanstack/react-query";
import {feedServices} from "@/services/feedServices";

export const useGetHomeFeed = () => {
    return useInfiniteQuery({
        queryKey: ['homeFeed'],
        queryFn: ({pageParam}) => feedServices.getHomeFeed({limit: 10, cursor: pageParam}),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextCursor : undefined;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnMount: true,
        retry: false,
    });
}