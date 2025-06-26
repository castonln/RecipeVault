import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getRecipes, postRecipe } from "../network/recipesApi";
import SignOut from "./SignOutButton";
import AddIcon from "@mui/icons-material/Add";
import { defaultRecipeInfo } from "./RecipePage/defaultRecipeInfo";
import { ROUTES } from "../utils/router";
import { useNavigate } from "react-router-dom";

const RecipeBook = () => {
	const navigate = useNavigate();
	const { userId } = useAuth();

	const [recipes, setRecipes] = useState([]);
	const [selectedCard, setSelectedCard] = useState(null);

	const addRecipe = async () => {
		try {
			const response = await postRecipe(userId, defaultRecipeInfo);
			const data = await response.json();
			navigate(ROUTES.RECIPEPAGE.path.replace(":recipeId", data.id));
		} catch (error) {
			console.error("Failed to create recipe:", error);
		}
	};

	useEffect(() => {
		const fetchUserRecipes = async () => {
			const response = await getRecipes(userId);
			const data = await response.json();
			setRecipes(data);
		}
		fetchUserRecipes();
	}, []);

	return (
		<>
			<SignOut />
			<Grid container spacing={2} padding={2}>
				{recipes.map((recipe, index) => (
					<Grid key={index} size={3}>
						<Card sx={{ height: '150px' }}>
							<CardActionArea
								onClick={() => {
									setSelectedCard(index);
									navigate(ROUTES.RECIPEPAGE.path.replace(":recipeId", recipe.id));
								}}
								data-active={selectedCard === index ? '' : undefined}
								sx={{
									height: '100%',
									'&[data-active]': {
										backgroundColor: 'action.selected',
										'&:hover': {
											backgroundColor: 'action.selectedHover',
										},
									},
								}}
							>
								<CardContent>
									<Typography variant="h5" component="div">
										{recipe.name}
									</Typography>
									<Typography variant="body2" sx={{ color: 'text.secondary' }}>
										{recipe.description}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
				<Grid size={3}>
					<Card sx={{ height: '150px' }}>
						<CardActionArea
							onClick={addRecipe}
							sx={{
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'text.secondary',
								border: '2px dashed grey',
							}}
						>
							<AddIcon sx={{ fontSize: 50 }} />
						</CardActionArea>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

export default RecipeBook;