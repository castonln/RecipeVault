import { Box } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRecipeAccess } from "../network/recipesApi";
import LoadingRecipe from "./LoadingRecipe";
import RecipeNotFound from "../components/NotFound/RecipeNotFound";

const PermissionsContext = createContext();

const RequiresRecipeAccess = ({ children }) => {
    const { userId } = useAuth();
    const { recipeId } = useParams();

    const [hasAccess, setHasAccess] = useState();
    const [ownership, setOwnership] = useState();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeAccess = async () => {
            try {
                const response = await getRecipeAccess(recipeId, userId);
                const data = await response.json();

                setHasAccess(data.hasAccess);
                setOwnership(data.reason);
                setIsLoading(false);
            } catch (error) {
                console.error("Error getting recipe access:", error);
            }
        }

        fetchRecipeAccess();
    }, []);

    return isLoading ?
        <LoadingRecipe />
        :
        hasAccess ?
            <PermissionsContext.Provider value={{ ownership }}>
                {children}
            </PermissionsContext.Provider>
            : <RecipeNotFound />;
};

export default RequiresRecipeAccess;

export const usePermissionsContext = () => useContext(PermissionsContext);