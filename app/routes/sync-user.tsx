import { getAuth } from "@clerk/react-router/ssr.server";
import { Route } from "./+types/sync-user";
import { redirect } from "react-router";
import { clerkClient } from "@/lib/clerkClient";
import { db } from "@/.server/db";



export const loader = async (loaderArgs: Route.LoaderArgs) => {
    const { userId } = await getAuth(loaderArgs)
    if (!userId) {
        return redirect('/not-found')
    }
    const user = await clerkClient.users.getUser(userId)
    await db.user.upsert({
        create: {
            id: userId,
            emailAddress: user.emailAddresses[0].emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
        },
        update: {
            emailAddress: user.emailAddresses[0].emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
        },
        where: {
            id: userId
        }
    })
    return redirect('/')
};