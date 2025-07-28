import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IngredientsContext } from "../../context/IngredientsContext";
import { RecipeContext } from "../../context/RecipeContext";
import { getIngredients } from "../../network/ingredientsApi";
import { getRecipe, getRecipeMetadata } from "../../network/recipesApi";
import LoadingRecipe from "../../utils/LoadingRecipe";
import { usePermissionsContext } from "../../utils/RequiresRecipeAccess";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";

const RecipePage = () => {
    const { userId } = useAuth();
    const { recipeId, ownerId } = useParams();
    const { ownership } = usePermissionsContext();

    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState(null);
    const [recipeMetadata, setRecipeMetadata] = useState(null);

    const fetchRecipeMetadata = async () => {
        try {
            const response = await getRecipeMetadata(recipeId, ownerId);
            const data = await response.json();
            setRecipeMetadata(data);
        } catch (error) {
            console.error("Error fetching recipe metadata:", error);
        }
    }

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await getRecipe(recipeId, ownerId);
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };

        const fetchIngredients = async () => {
            try {
                const response = await getIngredients();
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };

        fetchRecipeMetadata();
        fetchRecipe();
        fetchIngredients();
    }, []);

    if (!recipe) return (
        <LoadingRecipe />
    );

    return (
        <RecipeContext.Provider value={{ recipe, recipeMetadata, fetchRecipeMetadata }}>
            <RecipeDetails />
            <Stack direction="column" spacing={2} sx={{ padding: "20px" }}>
                <IngredientsContext.Provider value={ingredients}>
                    <RecipeIngredients />
                </IngredientsContext.Provider>
                <RecipeInstructions />
            </Stack>
        </RecipeContext.Provider>
    );
}

export default RecipePage;