import { ClerkProvider } from "@clerk/react-router";
import { rootAuthLoader } from "@clerk/react-router/ssr.server";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import { Route } from "./+types/root";
import { TRPCReactProvider } from "./common/trpc/react";
import { Header } from "./components/Header";
import { Toaster } from "./components/Toaster";
import stylesheet from "./global.css?url";
import { trpcServer } from "./common/trpc";

export const links: Route.LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const loader = (args: Route.LoaderArgs) =>
  rootAuthLoader(args, async () => {
    const user = await trpcServer(args.request).user.getMyUserInfo.query();
    return { user };
  });

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function App({ loaderData }: Route.ComponentProps) {
  // console.log("loaderData", loaderData);
  return (
    <ClerkProvider loaderData={loaderData} signInFallbackRedirectUrl="/" signUpForceRedirectUrl={"/sync-user"}>
      <ThemeProvider attribute="data-theme" defaultTheme="light">
        <TRPCReactProvider>
          <main className="flex h-screen w-screen flex-col items-center justify-center gap-4">
            <Header />
            <Outlet />
          </main>
          <Toaster />
          <ReactQueryDevtools />
        </TRPCReactProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
