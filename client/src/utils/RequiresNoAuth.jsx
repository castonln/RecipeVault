import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "./router";

const RequiresNoAuth = ({ children }) => {
  const { userId } = useAuth();

  return userId ? <Navigate to={ROUTES.RECIPEBOOK.path} /> : children;
};

export default RequiresNoAuth;
