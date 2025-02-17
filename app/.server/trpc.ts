import { getAuth } from "@clerk/react-router/ssr.server";
import { TRPCError, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import SuperJSON from "superjson";
import { db } from "./db";

// insert userInfo to trpc ctx
export const createContext = async (ctx: FetchCreateContextFnOptions) => {
  console.log("HELLO!");

  const { userId } = await getAuth({
    request: ctx.req,
    context: {},
    params: {},
  });

  const myUserInfo = await db.user.findUnique({
    where: {
      id: userId ?? "",
    },
  });

  return { ...ctx, myUserInfo, userId: myUserInfo?.id };
};

type Context = Awaited<ReturnType<typeof createContext>>;

// trpc instance
export const t = initTRPC.context<Context>().create({ transformer: SuperJSON });

// middlewares
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.myUserInfo) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "please login" });
  }

  return next();
});

const isUnAuthed = t.middleware(({ ctx, next }) => {
  if (!!ctx.myUserInfo) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "you have already login",
    });
  }

  return next();
});

const publicProcedure = t.procedure;
const authProcedure = publicProcedure.use(isAuthed);
const unAuthProcedure = publicProcedure.use(isUnAuthed);

// procedures
export const p = {
  public: publicProcedure,
  auth: authProcedure,
  unAuth: unAuthProcedure,
};
