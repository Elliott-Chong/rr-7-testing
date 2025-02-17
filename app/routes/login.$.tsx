import { SignIn } from "@clerk/react-router";
import { LogIn } from "lucide-react";
import { Route } from "./+types/login.$";
import { clsx } from "@/common/clsx";
import { loginFormSchema } from "@/common/formSchema";
import { trpc } from "@/common/trpc/react";
import { BackButton } from "@/components/BackButton";
import { LuIcon } from "@/components/LuIcon";
import { Title } from "@/components/Title";
import { useMyUserInfo } from "@/hooks/useMyUserInfo";
import { Controller, useZodForm } from "@/hooks/useZodForm";

export const meta: Route.MetaFunction = () => {
  return [{ title: "login account | remix-t3-stack" }];
};

export default function PageLogin() {
  const { myUserInfo } = useMyUserInfo();

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
