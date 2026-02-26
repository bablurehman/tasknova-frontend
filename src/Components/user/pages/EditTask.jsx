import React, { useState, useEffect, useRef } from "react";
import { useTaskContext } from "../../../Context/TaskContext";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";

const EditTask = ({ task, trigger }) => {
  const { updateTask } = useTaskContext();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (trigger && task) {
      setIsOpen(true);
    }
  }, [trigger, task]);

  // Populate fields
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority || "medium");
    }
  }, [task]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await updateTask(task._id, { title, priority });
      toast.success("Task updated successfully");
      closeModal();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-110"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full max-w-md p-8 relative"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <FiX size={20} />
        </button>

        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Edit Task</h3>

        <form onSubmit={handleUpdate} className="flex flex-col">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Task Title
            </label>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Priority
            </label>

            <div className="flex items-center gap-3">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${priorityColors[priority]}`}
              >
                {priority}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
