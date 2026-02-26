import React, { useState, useRef, useEffect } from "react";
import { useTaskContext } from "../../../Context/TaskContext";
import { toast } from "react-toastify";
import { FiPlus, FiChevronDown } from "react-icons/fi";

const AddTask = () => {
  const { createTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await createTask(title, priority);
      toast.success("Task created");
      setTitle("");
      setPriority("medium");
    } catch {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const priorities = ["low", "medium", "high"];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-gray-200 rounded-2xl shadow-sm p-3 sm:p-4">

        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
        />

        <div ref={dropdownRef} className="relative w-full sm:w-40">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span className="capitalize">{priority}</span>
            <FiChevronDown
              size={16}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {priorities.map((level) => (
                <div
                  key={level}
                  onClick={() => {
                    setPriority(level);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer capitalize hover:bg-indigo-50 ${
                    priority === level
                      ? "bg-indigo-50 text-indigo-600"
                      : ""
                  }`}
                >
                  {level}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-full transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <FiPlus size={16} />
              Add
            </>
          )}
        </button>

      </div>
    </form>
  );
};

export default AddTask;