import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user && user?.user?.isVerified !== "true") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoutes;

export const ProtectedRoutesAuth = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <>Loading...</>;
  }
  if (!user) {
    return children;
  }

  return <Navigate to="/" replace />;
};
