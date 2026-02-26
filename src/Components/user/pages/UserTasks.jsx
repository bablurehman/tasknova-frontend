import React, { useState } from "react";
import { useTaskContext } from "../../../Context/TaskContext";
import { toast } from "react-toastify";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import AddTask from "./AddTask";
import EditTask from "./EditTask";

const UserTasks = () => {
  const { tasks, deleteTask, updateTask, loading } = useTaskContext();

  const [selectedTask, setSelectedTask] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const handleDelete = async (id) => {
    try {
      setActionLoadingId(id);
      await deleteTask(id);
      toast.success("Task deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      setActionLoadingId(task._id);
      await updateTask(task._id, { completed: !task.completed });
    } catch {
      toast.error("Failed to update task");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      
   <div className="sticky top-0 z-50 bg-gray-50/95 backdrop-blur-md border-b border-black/10 px-4 sm:px-6 py-4 sm:py-6">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative overflow-visible">
    
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">
        Tasks
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Manage and track your productivity
      </p>
    </div>

    <div className="relative overflow-visible">
      <AddTask />
    </div>

  </div>
</div>

      <div className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-7xl mx-auto">
          
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : tasks.length > 0 ? (

            <div className="
              grid 
              grid-cols-1
              sm:grid-cols-2 
              lg:grid-cols-3 
              xl:grid-cols-4 
              gap-8
            ">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      
                      <h3
                        className={`min-w-0 flex-1 text-base font-semibold leading-snug break-words ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </h3>

                      {task.priority && (
                        <span
                          className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                            task.priority === "low"
                              ? "bg-emerald-50 text-emerald-600"
                              : task.priority === "medium"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {task.priority}
                        </span>
                      )}
                    </div>

                    <div className="mt-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                          task.completed
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {task.completed ? "Completed" : "In Progress"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8">

                    <button
                      onClick={() => handleToggleStatus(task)}
                      disabled={actionLoadingId === task._id}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${task.completed ? "border-emerald-600" : "border-amber-600"} `}
                    >
                      {task.completed && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      
                      <button
                        onClick={() => setSelectedTask(task)}
                        disabled={actionLoadingId === task._id}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                      >
                        <FiEdit2 className="text-gray-600" size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(task._id)}
                        disabled={actionLoadingId === task._id}
                        className="p-2 rounded-lg hover:bg-red-50 transition"
                      >
                        {actionLoadingId === task._id ? (
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <FiTrash2 className="text-red-500" size={16} />
                        )}
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>

          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <h3 className="text-lg font-medium text-gray-700">
                No tasks yet
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Start by adding your first task.
              </p>
            </div>
          )}
        </div>
      </div>

      <EditTask task={selectedTask} trigger={selectedTask} />
    </div>
  );
};

export default UserTasks;
