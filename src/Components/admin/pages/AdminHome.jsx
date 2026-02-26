import { useEffect, useState } from "react";
import { useAdminContext } from "../../../Context/AdminContext";
import { HiOutlineUsers } from "react-icons/hi2";
import { FiShield, FiActivity } from "react-icons/fi";

const AdminHome = () => {
  const { admin, getAllUsers } = useAdminContext();
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        if (Array.isArray(res)) setTotalUsers(res.length);
        else if (Array.isArray(res?.users)) setTotalUsers(res.users.length);
        else setTotalUsers(0);
      } catch (error) {
        setTotalUsers(0);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <HiOutlineUsers size={22} />,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Platform Status",
      value: "Operational",
      icon: <FiActivity size={22} />,
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Security",
      value: "Protected",
      icon: <FiShield size={22} />,
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-full p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Admin Dashboard
          </h2>
          <p className="text-gray-500 mt-2">
            Welcome back,
            <span className="ml-1 font-medium text-gray-700">
              {admin?.name || admin?.email}
            </span>
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>
                  <h3 className="text-3xl font-semibold text-gray-800 mt-3">
                    {item.value}
                  </h3>
                </div>

                <div
                  className={`p-4 rounded-xl ${item.bg} ${item.iconColor} group-hover:scale-110 transition`}
                >
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
