import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";

const RecipePage = () => {
    let { recipeId } = useParams();
    return ( 
        <>
            <RecipeDetails />
            <Stack direction="column" spacing={2} sx={{padding: "20px"}}>
                <RecipeIngredients />
                <RecipeInstructions />
            </Stack>
        </>
     );
}
 
export default RecipePage;