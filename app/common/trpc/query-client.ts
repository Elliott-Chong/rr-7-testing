import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import { useRevalidator } from "react-router";
import { OnTRPCError } from "../utils";

export const createQueryClient = () => {
  const { revalidate } = useRevalidator();
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000,
      },
      mutations: {
        onSuccess: () => {
          revalidate()
        },
        onError: error => {
          if (error instanceof Error) {
            OnTRPCError(error)
          }
        }

      },
    },
  });
};
