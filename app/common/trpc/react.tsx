"use client";

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { httpBatchLink, loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact, inferReactQueryProcedureOptions } from "@trpc/react-query";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import SuperJSON from "superjson";

import { type AppRouter } from "@/.server/router";
import { createQueryClient } from "./query-client";

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
    if (typeof window === "undefined") {
        // Server: always make a new query client
        return createQueryClient();
    }
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient());
};

export const trpc = createTRPCReact<AppRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    const trpcClient = trpc.createClient({
        transformer: SuperJSON,
        links: [
            loggerLink({
                enabled: (op) =>
                    process.env.NODE_ENV === "development" ||
                    (op.direction === "down" && op.result instanceof Error),
            }),
            httpBatchLink({
                url: getBaseUrl() + "/trpc",
            }),
            unstable_httpBatchStreamLink({
                url: getBaseUrl() + "/trpc",
            }),
        ],
    })

    return (
        <QueryClientProvider client={queryClient}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
            </trpc.Provider>
        </QueryClientProvider>
    );
}

function getBaseUrl() {
    if (typeof window !== "undefined") return window.location.origin;
    if (process.env.BASE_URL) return `https://${process.env.BASE_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

