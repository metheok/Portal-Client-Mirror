import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, userLoading } = useSelector((state) => state.user);

  if (userLoading) {
    return <Outlet />;
  }
  if (!user?.user && !userLoading) {
    return <Navigate replace to="/register" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
