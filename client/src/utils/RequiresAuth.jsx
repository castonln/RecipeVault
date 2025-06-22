import { Navigate } from "react-router-dom";

const RequiresAuth = ({ children }) => {
    const userIsLogged = false; // TODO: Add hook to verify login

    if (!userIsLogged) {
        return <Navigate to={"/signin"} replace />
    }

    return children;
}

export default RequiresAuth;