import { Card, CardContent, CardActionArea, Grid, Typography } from "@mui/material";
import { useState } from "react";

const cards = [
	{
		id: 1,
		title: 'Plants',
		description: 'Plants are essential for all life.',
	},
	{
		id: 2,
		title: 'Animals',
		description: 'Animals are a part of nature.',
	},
	{
		id: 3,
		title: 'Humans',
		description: 'Humans depend on plants and animals for survival.',
	},
];

const RecipeBook = () => {
	const [selectedCard, setSelectedCard] = useState(0);
	return (
		<Grid container spacing={2} padding={2}>
			{cards.map((card, index) => (
				<Grid size={3}>
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
								<Typography Variant="h5" component="div">
									Title
								</Typography>
								<Typography variant="body2" sx={{ color: 'text.secondary' }}>
									Recipe description...
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}

export default RecipeBook;