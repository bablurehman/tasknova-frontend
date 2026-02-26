import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";

// CONTEXT PROVIDERS
import { UserProvider } from "./Context/UserContext";
import { AdminProvider } from "./Context/AdminContext";
import { TaskProvider } from "./Context/TaskContext";

// TOAST
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <AdminProvider>
          <TaskProvider>
            <App />
            <ToastContainer position="top-right" autoClose={3000} />
          </TaskProvider>
        </AdminProvider>
      </UserProvider>
    </Router>
  </StrictMode>,
);
