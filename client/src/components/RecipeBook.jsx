import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getRecipes } from "../network/recipesApi";
import SignOut from "./SignOutButton";

const RecipeBook = () => {
	const { userId } = useAuth();

	const [recipes, setRecipes] = useState([]);
	const [selectedCard, setSelectedCard] = useState(null);

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
								onClick={() => setSelectedCard(index)}
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
			</Grid>
		</>
	);
}

export default RecipeBook;