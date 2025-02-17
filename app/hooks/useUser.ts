import { useMatches, useRouteLoaderData } from "react-router";
import { trpc } from "@/common/trpc/react";
import { loader } from "@/root";

export const useUser = () => {
  const data = useRouteLoaderData<typeof loader>("root");

  return { user: data?.user };
};
