import { trpc } from "@/common/trpc/react";

export const useMyUserInfo = () => {
  const { data: myUserInfo } = trpc.user.getMyUserInfo.useQuery();

  return { myUserInfo };
};
