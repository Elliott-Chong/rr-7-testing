import { p, t } from "../trpc";

export const userRouter = t.router({
  getMyUserInfo: p.public.query(async ({ ctx: { myUserInfo, userId } }) => {
    if (!userId) {
      return null;
    }

    return myUserInfo;
  }),

  getUserList: p.public.query(async ({ ctx: { db } }) => {
    return await db.query.users.findMany({
      columns: {
        id: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });
  }),
});
