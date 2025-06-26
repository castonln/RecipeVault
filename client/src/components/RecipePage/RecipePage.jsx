import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getRecipe } from "../../network/recipesApi";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";
import { RecipeContext } from "../../context/RecipeContext";

const RecipePage = () => {
    const { userId } = useAuth();
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await getRecipe(recipeId, userId);
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };

        fetchRecipe();
    }, [recipeId, userId]);

    if (!recipe) return <div>Loading recipe...</div>;

return (
    <RecipeContext.Provider value={recipe}>
        <RecipeDetails />
        <Stack direction="column" spacing={2} sx={{ padding: "20px" }}>
            <RecipeIngredients />
            <RecipeInstructions />
        </Stack>
    </RecipeContext.Provider>
);
}

export default RecipePage;