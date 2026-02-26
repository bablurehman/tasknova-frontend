import { useUserContext } from "../../../Context/UserContext";
import { FiUser, FiMail } from "react-icons/fi";

const UserSettings = () => {
  const { user } = useUserContext();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Account Settings
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage your profile details and account preferences.
          </p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8">

          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-6 sm:mb-8">
            Profile Information
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8 sm:mb-10">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold shadow-md shrink-0">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                  {user?.name || "User"}
                </h3>
                <p className="text-gray-500 text-sm truncate">
                  {user?.email}
                </p>
              </div>

            </div>

            <span className="self-start sm:self-auto px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-600 rounded-full">
              Active
            </span>

          </div>

          <div className="border-t border-gray-200 pt-6 sm:pt-8 space-y-6 sm:space-y-8">

            <div className="flex items-start gap-4">
              <FiUser className="text-gray-400 mt-1 shrink-0" size={18} />
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Full Name
                </p>
                <p className="text-gray-900 font-medium break-words">
                  {user?.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiMail className="text-gray-400 mt-1 shrink-0" size={18} />
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Email Address
                </p>
                <p className="text-gray-900 font-medium break-words">
                  {user?.email}
                </p>
              </div>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
};

export default UserSettings;