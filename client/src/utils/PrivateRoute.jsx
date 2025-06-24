import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { userId } = useAuth();

  return userId ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
