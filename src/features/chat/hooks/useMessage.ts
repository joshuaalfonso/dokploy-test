
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMessageApi } from "../chat.api";

export const useMessage = () => {
  const { conversation_id } = useParams();

  const query = useInfiniteQuery({
    queryKey: ["messages", conversation_id],
    enabled: !!conversation_id,

    queryFn: async ({ pageParam }: {pageParam: number | null}) => {
      if (!conversation_id) throw new Error("Missing ID");

      return getMessageApi(Number(conversation_id), pageParam);
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage.has_more) return undefined;

      const messages = lastPage.data;

      // since backend is DESC, oldest is LAST item
      return messages[messages.length - 1]?.message_id;
    },

    initialPageParam: null,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // flatten all pages into 1 array
//   const messages = query.data?.pages.flatMap((p: any) => p.data) || [];

    // const messages =
    // query.data?.pages
    //     .flatMap((p) => p.data)
    //     .reverse() || [];

  const messages =
  [...(query.data?.pages.flatMap((p) => p.data) || [])]
    .reverse();

    return {
        messages,
        fetchNextPage: query.fetchNextPage,
        hasNextPage: query.hasNextPage,
        isFetchingNextPage: query.isFetchingNextPage,
        isPending: query.fetchStatus === 'fetching',
        error: query.error,
    };
};
























// import { useQuery } from "@tanstack/react-query";
// import { getMessageApi } from "../chat.api";
// import { useParams } from "react-router-dom";



// export const useMessage = () => {

//     const { conversation_id } = useParams();

//     const query = useQuery({
//         queryKey: ["messages", conversation_id],
//         queryFn: async () => {
//             if (!conversation_id) {
//                 throw new Error("Missing ID is required");
//             }
//             return getMessageApi(Number(conversation_id));
//         },
//         enabled: !!conversation_id,
//         staleTime: 1000 * 60 * 5,
//         gcTime: 1000 * 60 * 10,
//     });

//     return {
//         messages: query.data,
//         isPending: query.fetchStatus === 'fetching',
//         error: query.error,
//     };
// };