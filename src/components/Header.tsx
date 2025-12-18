import { Link, NavLink } from "react-router";

export default function Header() {
  return (
    <header className="p-4 py-6 bg-black text-white">
      <div className="container mx-auto flex items-center flex-wrap gap-3">
        <Link to={"/"} className="text-2xl font-bold">
          Task Manager
        </Link>
        <ul className="flex items-center flex-wrap gap-6 mx-auto">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-black px-4 py-1.5 rounded-md duration-300"
                  : "px-4 py-1.5 rounded-md"
              }
              to="/">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-black px-4 py-1.5 rounded-md duration-300"
                  : "px-4 py-1.5 rounded-md"
              }
              to="/add-project">
              Add Project
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-black px-4 py-1.5 rounded-md duration-300"
                  : "px-4 py-1.5 rounded-md"
              }
              to="/add-task">
              Add Task
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
