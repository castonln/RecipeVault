import { Box, CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getRecipe } from "../../network/recipesApi";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";
import { RecipeContext } from "../../context/RecipeContext";
import { IngredientsContext } from "../../context/IngredientsContext";
import { getIngredients } from "../../network/ingredientsApi";

const RecipePage = () => {
    const { userId } = useAuth();
    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState(null);

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

        const fetchIngredients = async () => {
            try {
                const response = await getIngredients();
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };

        fetchRecipe();
        fetchIngredients();
    }, [recipeId, userId]);

    if (!recipe) return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'grey',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <CircularProgress size={100} color='inherit' />
            <Box sx={{ margin: 2, fontSize: 32 }}>Loading Recipe...</Box>
        </Box>
    );

    return (
        <RecipeContext.Provider value={recipe}>
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