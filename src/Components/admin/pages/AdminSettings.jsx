import { useAdminContext } from "../../../Context/AdminContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";

const AdminSettings = () => {
  const { adminLogout, admin } = useAdminContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  return (
    <div className="w-full bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Account Settings
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your administrator account
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <FiUser className="text-indigo-600 text-xl sm:text-2xl" />
            </div>

            <div className="min-w-0 space-y-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                {admin?.name || "Administrator"}
              </h3>
              <p className="text-sm text-gray-500 break-words">
                {admin?.email}
              </p>
              <span className="inline-block mt-2 text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                Admin Account
              </span>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
            Account Actions
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-700">
                Sign out from your account
              </p>
              <p className="text-xs text-gray-500 mt-1">
                This will end your current admin session.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-md transition duration-200"
            >
              <FiLogOut size={16} />
              Logout
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSettings;