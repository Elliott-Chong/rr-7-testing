import { useClerk } from "@clerk/react-router";
import { Home, LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router";
import { BackButton } from "./BackButton";
import { LuIcon } from "./LuIcon";
import { ThemeButton } from "./ThemeButton";
import { useUser } from "@/hooks/useUser";

export const Header = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="fixed top-0 left-0 flex w-screen items-center justify-between p-6">
      <div className="flex items-center gap-2">
        <Link to="/">
          <button className="btn btn-sm">
            <LuIcon icon={Home} /> Home
          </button>
        </Link>
        <BackButton className="btn-sm" />
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            <Link to={`/tasks/${user.id}`}>
              <button className="btn btn-sm">
                <LuIcon icon={User} />
                {`${user.firstName} ${user.lastName}`}
              </button>
            </Link>
            <button
              className="btn btn-sm"
              onClick={() => {
                signOut();
              }}
            >
              <LuIcon icon={LogOut} />
              Logout
            </button>
          </div>
        ) : (
          <Link className="btn btn-sm" to="/login">
            <LuIcon icon={LogIn} />
            Login
          </Link>
        )}
        <ThemeButton className="btn-sm" />
      </div>
    </div>
  );
};
