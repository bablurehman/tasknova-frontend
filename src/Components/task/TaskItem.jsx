import React, { useState } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { useTaskContext } from "../../Context/TaskContext";
import EditTask from "./EditTask";

const priorityColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const TaskItem = ({ task }) => {
  const { deleteTask, updateTask } = useTaskContext();
  const [showModal, setShowModal] = useState(false);

  if (!task || !task._id) return null;

  const handleToggle = async () => {
    await updateTask(task._id, {
      completed: !task.completed,
    });
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
  };

  const priority =
    task.priority && priorityColors[task.priority]
      ? task.priority
      : "medium";

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={Boolean(task.completed)}
            onChange={handleToggle}
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded"
          />

          <div>
            <p
              className={`text-sm font-medium ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {task.title}
            </p>

            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                priorityColors[priority]
              }`}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 text-indigo-600 text-sm hover:text-indigo-700 transition"
          >
            <FiEdit size={14} />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 transition"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {showModal && (
        <EditTask
          task={task}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default TaskItem;
