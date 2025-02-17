import { User } from "lucide-react";
import { Link } from "react-router";
import { LuIcon } from "./LuIcon";

export const RegisterButton = () => {
  return (
    <Link to="/register">
      <button className="btn">
        <LuIcon icon={User} />
        Register New Account
      </button>
    </Link>
  );
};
