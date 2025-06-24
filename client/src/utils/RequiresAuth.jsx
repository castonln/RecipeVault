import { useContext } from "react";
import { Navigate } from "react-router-dom";

const RequiresAuth = ({ children }) => {
    const userIsLogged = false;

    if (!userIsLogged) {
        return <Navigate to={"/signin"} replace />
    }

    return children;
}

export default RequiresAuth;