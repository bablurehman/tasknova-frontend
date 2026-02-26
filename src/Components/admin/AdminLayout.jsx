import {
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useAdminContext } from "../../Context/AdminContext";
import { useState, useEffect } from "react";

const AdminLayout = () => {
  const { admin, adminLogout } = useAdminContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  const getPageTitle = () => {
    if (location.pathname.includes("users")) return "Users";
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

      {/* Sidebar */}
      <aside
        className={`fixed sm:static z-50 top-0 left-0 h-full w-64 bg-black text-gray-300 flex flex-col transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <h1 className="text-white font-semibold text-lg tracking-wide">
            Admin Panel
          </h1>

          <button
            className="sm:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
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
            to="/admin/dashboard/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-md transition text-sm ${
                isActive
                  ? "bg-indigo-600 text-white shadow"
                  : "hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <FiUsers />
            Users
          </NavLink>

          <NavLink
            to="/admin/dashboard/settings"
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

        {/* Logout */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">

        <header className="h-16 bg-white border-b px-6 flex items-center justify-between sticky top-0 z-30">

          {/* Left */}
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

          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
              {admin?.email?.charAt(0)?.toUpperCase()}
            </div>
            <span className="text-sm text-gray-600 hidden sm:block">
              {admin?.email}
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

export default AdminLayout;
