import { Navigate, Outlet } from "react-router-dom";
import { useAdminContext } from "../../Context/AdminContext";

const AdminPrivateRoute = () => {
  const { admin, loading } = useAdminContext();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;
