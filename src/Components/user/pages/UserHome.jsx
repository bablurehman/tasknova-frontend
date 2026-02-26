import { useMemo } from "react";
import { useUserContext } from "../../../Context/UserContext";
import { useTaskContext } from "../../../Context/TaskContext";
import { FiCheckCircle, FiRefreshCw, FiClock } from "react-icons/fi";

const UserHome = () => {
  const { user } = useUserContext();
  const { tasks } = useTaskContext();

  /* Memoized Stats */
  const { totalTasks, activeTasks, completedTasks } = useMemo(() => {
    const total = tasks.length;
    const active = tasks.filter((t) => !t.completed).length;
    const completed = tasks.filter((t) => t.completed).length;

    return {
      totalTasks: total,
      activeTasks: active,
      completedTasks: completed,
    };
  }, [tasks]);

  const recentTasks = useMemo(() => {
    if (!tasks.length) return [];
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-gray-500 mt-2">
            Here’s a quick overview of your productivity.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-12">
          <StatCard
            icon={<FiClock size={20} />}
            label="Total Tasks"
            value={totalTasks}
            iconColor="text-indigo-600"
          />
          <StatCard
            icon={<FiRefreshCw size={20} />}
            label="Active Tasks"
            value={activeTasks}
            iconColor="text-amber-600"
          />
          <StatCard
            icon={<FiCheckCircle size={20} />}
            label="Completed Tasks"
            value={completedTasks}
            iconColor="text-emerald-600"
          />
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Tasks
            </h2>
            <span className="text-sm text-gray-400">
              Last {recentTasks.length} items
            </span>
          </div>

          {recentTasks.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm">
                You don’t have any tasks yet.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentTasks.map((task) => (
                <li
                  key={task._id}
                  className="flex justify-between items-center py-4 group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        task.completed ? "bg-emerald-50" : "bg-amber-50"
                      }`}
                    >
                      {task.completed ? (
                        <FiCheckCircle className="text-emerald-600" size={16} />
                      ) : (
                        <FiRefreshCw className="text-amber-600" size={16} />
                      )}
                    </div>

                    <span
                      className={`text-sm truncate ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title || "Untitled Task"}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      task.completed
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {task.completed ? "Completed" : "Active"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value, iconColor }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 flex items-center gap-2 sm:gap-5 hover:shadow-md transition-all duration-300">
    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${iconColor}`}>
      <div className={iconColor}>{icon}</div>
    </div>

    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);

export default UserHome;
