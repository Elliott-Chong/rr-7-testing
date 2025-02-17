import { QueryClient } from "@tanstack/react-query";
import { OnTRPCError } from "@/common/utils";

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /*
         * With SSR, we usually want to set some default staleTime
         * above 0 to avoid refetching immediately on the client
         */
        staleTime: 30 * 1000,
      },
      mutations: {
        onError: (error) => {
          if (error instanceof Error) {
            OnTRPCError(error);
          }
        },
      },
    },
  });
};
