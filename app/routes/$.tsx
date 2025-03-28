import { Route } from "./+types/$";
import { BackButton } from "@/components/BackButton";
import { Title } from "@/components/Title";

export const meta: Route.MetaFunction = () => {
  return [{ title: "page not found | remix-t3-stack" }];
};

export default function PageNotFound() {
  return (
    <>
      <Title>Page Not Found</Title>
      <BackButton />
    </>
  );
}
