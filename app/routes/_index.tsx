import { Link } from "react-router";
import { Route } from "./+types/_index";
import { trpcServer } from "@/common/trpc";
import { RegisterButton } from "@/components/RegisterButton";
import { Title } from "@/components/Title";

export const meta: Route.MetaFunction = () => {
  return [{ title: "remix-t3-stack" }];
};

// server loader just for ssr
export const loader = async ({ request }: Route.LoaderArgs) => {
  const userList = await trpcServer(request).user.getUserList.query();
  return { userList };
};

export default function PageHome({ loaderData: { userList } }: Route.ComponentProps) {
  if (!userList.length) {
    return (
      <>
        <Title>No One User Yet</Title>
        <RegisterButton />
      </>
    );
  }

  return (
    <>
      <Title>User List ({userList.length})</Title>
      <div className="my-2 flex max-h-[70vh] flex-col gap-2 overflow-scroll p-4">
        {userList.map(({ id, firstName, lastName, createdAt }, index) => {
          return (
            <div key={id}>
              <Link to={`/tasks/${id}`}>
                <div className="border-base-300 hover:bg-base-200 flex flex-col rounded-lg border px-4 py-2 transition-all">
                  <div className="text-lg">{`${firstName} ${lastName}`}</div>
                  <div className="text-sm font-light text-gray-400" suppressHydrationWarning>
                    create at {new Date(createdAt).toLocaleString()}
                  </div>

                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <RegisterButton />
    </>
  );
}
