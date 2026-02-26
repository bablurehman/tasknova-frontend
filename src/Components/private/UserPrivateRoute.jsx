import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";

const UserPrivateRoute = () => {
  const { user, loading } = useUserContext();

  if (loading) return <p>Loading...</p>;

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default UserPrivateRoute;
