import { ChevronLeft } from "lucide-react";
import { ComponentProps } from "react";
import { useLocation, useNavigate } from "react-router";
import { LuIcon } from "./LuIcon";
import { clsx } from "@/common/clsx";

export const BackButton = (props: ComponentProps<"button">) => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";

  if (isHomePage) {
    return null;
  }

  return (
    <button
      {...props}
      className={clsx("btn", props.className)}
      onClick={() => {
        nav(-1);
      }}
    >
      <LuIcon icon={ChevronLeft} />
      Back
    </button>
  );
};
