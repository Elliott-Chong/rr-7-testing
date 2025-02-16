import { Plus } from "lucide-react";
import { Link } from "react-router";
import { LuIcon } from "./LuIcon";

export const AddTaskForm = () => {

  return (
    <Link to={`add`}>
      <button
        className="btn"
        type="button"
      >
        <LuIcon icon={Plus} />
        Add Task
      </button>
    </Link>
  );
};
