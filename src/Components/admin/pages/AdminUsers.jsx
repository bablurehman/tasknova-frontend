import { useEffect, useState, useMemo } from "react";
import { useAdminContext } from "../../../Context/AdminContext";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const AdminUsers = () => {
  const { getAllUsers } = useAdminContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getAllUsers();
        if (Array.isArray(res)) setUsers(res);
        else if (Array.isArray(res?.users)) setUsers(res.users);
        else setUsers([]);
      } catch {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u._id?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div className="w-full bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              User Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage registered platform users
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm w-fit">
            <span className="text-xs sm:text-sm text-gray-500">
              Total Users
            </span>
            <span className="ml-2 text-base sm:text-lg font-semibold text-gray-800">
              {users.length}
            </span>
          </div>
        </div>

        <div className="relative w-full sm:max-w-sm">
          <FiSearch className="absolute left-4 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase whitespace-nowrap">#</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase whitespace-nowrap">User</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Email</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase whitespace-nowrap">User ID</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400 text-sm">
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <FaUserCircle className="text-gray-300 text-2xl shrink-0" />
                          <span className="text-sm font-medium text-gray-800 truncate">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600 break-words">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-xs font-medium bg-green-50 text-green-600 px-3 py-1 rounded-full whitespace-nowrap">
                          Active
                        </span>
                      </td>

                      <td className="px-6 py-4 break-all">
                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-md font-mono">
                          {user._id}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400 text-sm">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden divide-y divide-gray-100">
            {loading ? (
              <div className="p-6 text-center text-gray-400 text-sm">
                Loading users...
              </div>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div key={user._id} className="p-5 space-y-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <FaUserCircle className="text-gray-300 text-3xl shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        #{index + 1}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 break-words">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>

                  <p className="text-sm text-gray-600 break-all">
                    <span className="font-medium">User ID:</span> {user._id}
                  </p>

                  <span className="inline-block text-xs font-medium bg-green-50 text-green-600 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-400 text-sm">
                No users found
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminUsers;