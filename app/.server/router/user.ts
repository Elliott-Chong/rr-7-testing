import { db } from "../db";
import { p, t } from "../trpc";

export const userRouter = t.router({
    getMyUserInfo: p.public.query(async ({ ctx }) => {
        if (!ctx.userId) return null
        return ctx.myUserInfo
    }),

    getUserList: p.public.query(async () => {
        return await db.user.findMany({
            select: { id: true, firstName: true, lastName: true, createAt: true },
        });
    }),
});
