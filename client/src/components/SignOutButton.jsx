import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { ROUTES } from "../utils/router";

const SignOut = () => {
  const { setUserId } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUserId("");            
    navigate(ROUTES.SIGNIN.path);  
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOut;
