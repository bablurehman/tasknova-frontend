import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { LuRocket } from "react-icons/lu";

import { useUserContext } from "../../Context/UserContext";
import { useState, useEffect } from "react";

const UserLayout = () => {
  const { user, userLogout } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  const getPageTitle = () => {
    if (location.pathname.includes("tasks")) return "Tasks";
    if (location.pathname.includes("settings")) return "Settings";
    return "Dashboard";
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed sm:static z-100 top-0 left-0 h-full w-58 sm:64 bg-black text-gray-300 flex flex-col transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0`}
      >

<div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
<h1 className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
    <LuRocket className="text-indigo-500 text-xl" />
    TaskNova
  </h1>

  <button
    className="sm:hidden text-gray-400 hover:text-white transition"
    onClick={() => setSidebarOpen(false)}
  >
    <FiX size={20} />
  </button>
</div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/user/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-md transition text-sm ${
                isActive
                  ? "bg-indigo-600 text-white shadow"
                  : "hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <FiHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/user/dashboard/tasks"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-md transition text-sm ${
                isActive
                  ? "bg-indigo-600 text-white shadow"
                  : "hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <FiCheckSquare />
            Tasks
          </NavLink>

          <NavLink
            to="/user/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-md transition text-sm ${
                isActive
                  ? "bg-indigo-600 text-white shadow"
                  : "hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <FiSettings />
            Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col w-full">

        <header className="h-16 bg-white border-b px-6 flex items-center justify-between sticky top-0 z-30">
  
          <div className="flex items-center gap-4">
 
            <button
              className="sm:hidden text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={22} />
            </button>

            <h2 className="text-lg font-semibold text-gray-800">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center  font-semibold text-sm">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <span className="text-sm text-slate-800 font-semibold hidden sm:block">
              {user?.name}
            </span>
          </div>
        </header>


        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
