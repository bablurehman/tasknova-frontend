import React, { createContext, useContext, useEffect, useState } from "react";
import userApi from "../Services/userApi";

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /*  RESTORE SESSION  */
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /*  REGISTER  */
  const userRegister = async (name, email, password) => {
    const { data } = await userApi.post("/api/user/register", {
      name,
      email,
      password,
    });

    const userData = {
      ...data.user,
      token: data.token,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userToken", data.token);

    setUser(userData);
    return userData;
  };

  /*  LOGIN  */
  const userLogin = async (email, password) => {
    const { data } = await userApi.post("/api/user/login", {
      email,
      password,
    });

    const userData = {
      ...data.user,
      token: data.token,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userToken", data.token);

    setUser(userData);
    return userData;
  };

  /*  LOGOUT  */
  const userLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        userRegister,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
