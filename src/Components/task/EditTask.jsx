import React, { useState } from "react";
import { useTaskContext } from "../../Context/TaskContext";

const EditTask = ({ task, onClose }) => {
  const { updateTask } = useTaskContext();

  if (!task) return null;

  const [title, setTitle] = useState(task.title || "");
  const [priority, setPriority] = useState(task.priority || "medium");

  const handleSave = async () => {
    if (!title.trim()) return;

    await updateTask(task._id, {
      title: title.trim(),
      priority,
    });

    onClose();
  };

  return (
<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
        <h2 className="text-lg font-semibold mb-4">
          Edit Task
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
