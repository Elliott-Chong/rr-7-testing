import { Title } from "@/components/Title";
import { useMyUserInfo } from "@/hooks/useMyUserInfo";
import { BackButton } from "@/components/BackButton";
import { Route } from "./+types/register.$";
import { SignUp } from "@clerk/react-router";

export const meta: Route.MetaFunction = () => {
  return [{ title: "register account | remix-t3-stack" }];
};

export default function PageRegister() {
  const { myUserInfo } = useMyUserInfo();


  if (myUserInfo) {
    return (
      <>
        <Title>You Need To Logout Before You Register Account</Title>
        <BackButton />
      </>
    );
  }


  return (
    <>
      <Title>Register New Account</Title>
      <SignUp />
    </>
  );
}
