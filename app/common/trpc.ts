import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { AppRouter } from "@/.server/router";
import { TRPC_URL } from "./constants";

// use trpcServer to fetch in server environment, like in loader, for passing cookies to trpc endpoint
export const trpcServer = (request?: Request) => {
  return createTRPCProxyClient<AppRouter>({
    transformer: SuperJSON,
    links: [
      httpBatchLink({
        url: TRPC_URL,
        headers: () => {
          const cookie = request?.headers.get("Cookie") || "";
          return { cookie };
        },
      }),
    ],
  });
};

