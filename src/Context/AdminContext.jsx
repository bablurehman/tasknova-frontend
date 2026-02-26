import React, { createContext, useContext, useEffect, useState } from "react";
import adminApi from "../Services/adminApi";

export const AdminContext = createContext();
export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  /* RESTORE SESSION */
  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminData");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  /* ADMIN LOGIN */
  const adminLogin = async (email, password) => {
    const { data } = await adminApi.post("/api/admin/login", {
      email,
      password,
    });

    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminData", JSON.stringify(data.admin));

    setAdmin(data.admin);
  };

  /* ADMIN LOGOUT */
  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setAdmin(null);
  };

  /* GET ALL USERS */
  const getAllUsers = async () => {
    const { data } = await adminApi.get("/api/admin/users");
    return data;
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        loading,
        adminLogin,
        adminLogout,
        getAllUsers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
