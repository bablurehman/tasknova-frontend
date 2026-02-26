import React from "react";
import { useTaskContext } from "../../Context/TaskContext";
import TaskItem from "./TaskItem";

const TaskLists = () => {
  const { tasks } = useTaskContext();

  if (!Array.isArray(tasks)) {
    return (
      <p className="text-sm text-red-500">
        Failed to load tasks.
      </p>
    );
  }

  const validTasks = tasks.filter(
    (task) =>
      task &&
      typeof task === "object" &&
      task._id &&
      typeof task.title === "string"
  );

  if (validTasks.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No tasks yet. Add one!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {validTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskLists;
