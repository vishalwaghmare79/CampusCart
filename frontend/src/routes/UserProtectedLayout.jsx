import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserProtectedLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!auth?.user || auth.user.role !== 0) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtectedLayout;
