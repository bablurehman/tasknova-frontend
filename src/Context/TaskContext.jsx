import React, { createContext, useContext, useEffect, useState } from "react";
import userApi from "../Services/userApi";
import { useUserContext } from "./UserContext";

export const TaskContext = createContext();
export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { user, userLogout } = useUserContext();
  const [tasks, setTasks] = useState([]);

  /*  GET ALL  */
  const fetchTasks = async () => {
    if (!user) return;

    try {
      const { data } = await userApi.get("/api/task/all");
      setTasks(Array.isArray(data.task) ? data.task : []);
    } catch (err) {
      if (err.response?.status === 401) {
        userLogout();
      }
      console.error("Fetch error:", err.response?.data || err.message);
      setTasks([]);
    }
  };

  /*  CREATE  */
  const createTask = async (title, priority = "medium") => {
    try {
      const { data } = await userApi.post("/api/task/create", {
        title,
        priority,
      });

      const newTask = data.task;
      setTasks((prev) => [newTask, ...prev]);

      return newTask;
    } catch (err) {
      if (err.response?.status === 401) {
        userLogout();
      }
      throw err.response?.data || err;
    }
  };

  /*  UPDATE  */
  const updateTask = async (id, updates) => {
    try {
      const { data } = await userApi.put(`/api/task/update/${id}`, updates);
      const updatedTask = data.task;

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? updatedTask : task
        )
      );

      return updatedTask;
    } catch (err) {
      if (err.response?.status === 401) {
        userLogout();
      }
      throw err.response?.data || err;
    }
  };

  /*  DELETE  */
  const deleteTask = async (id) => {
    try {
      await userApi.delete(`/api/task/delete/${id}`);
      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );
    } catch (err) {
      if (err.response?.status === 401) {
        userLogout();
      }
      throw err.response?.data || err;
    }
  };

  /*  EFFECT  */
  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
