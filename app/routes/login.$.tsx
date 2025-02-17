import { useUser } from "@/hooks/useUser";
import { Controller, useZodForm } from "@/hooks/useZodForm";
import { clsx } from "@/common/clsx";
import { Title } from "@/components/Title";
import { LuIcon } from "@/components/LuIcon";
import { LogIn } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { loginFormSchema } from "@/common/formSchema";
import { Route } from "./+types/login.$";
import { trpc } from "@/common/trpc/react";
import { SignIn } from "@clerk/react-router";

export const meta: Route.MetaFunction = () => {
  return [{ title: "login account | remix-t3-stack" }];
};

export default function PageLogin() {
  const { myUserInfo } = useUser();

  if (myUserInfo) {
    return (
      <>
        <Title>
          Welcome {myUserInfo?.firstName} {myUserInfo?.lastName}, You Have Already Login
        </Title>
        <BackButton />
      </>
    );
  }

  return (
    <>
      <Title>Login Account</Title>
      <SignIn />
    </>
  );
}
