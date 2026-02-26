import React, { useState } from "react";
import { useTaskContext } from "../../Context/TaskContext";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const AddTask = () => {
  const { createTask } = useTaskContext();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createTask(trimmedTitle, priority);

      setTitle("");
      setPriority("medium");
      toast.success("Task created successfully");
    } catch (err) {
     toast.error(err.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex gap-3 mt-20 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError("");
        }}
        placeholder="Add new task..."
        className="flex-1 px-4 py-2 border rounded-lg"
        disabled={loading}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="px-3 py-2 border rounded-lg"
        disabled={loading}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg disabled:opacity-50 flex items-center justify-center"
      >
        {loading ? "..." : <FaPlus />}
      </button>

      {error && (
        <p className="text-red-500 text-sm absolute mt-12">
          {error}
        </p>
      )}
    </form>
  );
};

export default AddTask;
