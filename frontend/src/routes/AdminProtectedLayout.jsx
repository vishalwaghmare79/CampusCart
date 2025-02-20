import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminProtectedLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (auth.user.role !== 1) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedLayout;
