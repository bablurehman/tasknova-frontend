import { Routes, Route } from "react-router-dom";

//  USER 
import UserLogin from "./Components/user/UserLogin";
import UserRegister from "./Components/user/UserRegister";
import UserLayout from "./Components/user/UserLayout";
import UserPrivateRoute from "./Components/private/UserPrivateRoute";

import UserHome from "./Components/user/pages/UserHome";
import UserTasks from "./Components/user/pages/UserTasks";
import UserSettings from "./Components/user/pages/UserSettings";

//  ADMIN 
import AdminLogin from "./Components/admin/AdminLogin";
import AdminLayout from "./Components/admin/AdminLayout";
import AdminPrivateRoute from "./Components/private/AdminPrivateRoute";

import AdminHome from "./Components/admin/pages/AdminHome";
import AdminUsers from "./Components/admin/pages/AdminUsers";
import AdminSettings from "./Components/admin/pages/AdminSettings";

const App = () => {
  return (
    <Routes>

      {/*  USER ROUTES  */}
      <Route path="/" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />

      <Route element={<UserPrivateRoute />}>
        <Route path="/user/dashboard" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="tasks" element={<UserTasks />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
      </Route>

      {/*  ADMIN ROUTES  */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<AdminPrivateRoute />}>
        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default App;
