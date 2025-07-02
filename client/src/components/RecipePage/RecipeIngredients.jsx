import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import EditIngredientDialog from './EditIngredientDialog';
import { RecipeContext } from '../../context/RecipeContext';
import { patchIngredient } from '../../network/ingredientsApi';
import { IngredientsContext } from '../../context/IngredientsContext';

const RecipeIngredients = () => {
	const ingredientsList = useContext(IngredientsContext);
	const recipe = useContext(RecipeContext);

	const [ingredients, setIngredients] = useState(recipe.recipeIngredients);

	const [isEditing, setIsEditing] = useState(false);

	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [ingredientToEdit, setIngredientToEdit] = useState(null);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
	};

	const handleEditIngredientClick = (ingredient) => {
		setIngredientToEdit(ingredient);
		setEditDialogOpen(true);
	};

	const handleIngredientCreate = async (ingredientToCreate) => {
		const response = await patchIngredient('create', ingredientToCreate);
		const data = await response.json();
		const newIngredient = data.createEntities[0];
		newIngredient.ingredient = ingredientsList.find(i => i.id === newIngredient.ingredientId); 	// get the coordinated ingredient object since it isn't returned by default
		setIngredients([...ingredients, newIngredient]);
		setEditDialogOpen(false);
	};

	const handleIngredientUpdate = async (ingredientToUpdate) => {
		const response = await patchIngredient('update', ingredientToUpdate);
		const data = await response.json();
		const updatedIngredient = {
			...data.updateEntities[0],
			ingredient: ingredientsList.find(i => i.id === data.updateEntities[0].ingredientId)
		};	// get the coordinated ingredient object since it isn't returned by default


		setIngredients((prev) =>
			prev.map((ingredient) =>
				ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
			)
		);

		setEditDialogOpen(false);
	};


	const handleDeleteIngredient = async (ingredientToDelete) => {
		await patchIngredient('delete', ingredientToDelete);

		const updated = ingredients.filter(
			(ingredient) => ingredient.id !== ingredientToDelete.id
		);

		setIngredients(updated);
	};

	const handleAddIngredient = () => {
		setIngredientToEdit(null);
		setEditDialogOpen(true);
	};

	return (
		<>
			<Paper elevation={3} sx={{ mt: 4, borderRadius: 2, overflow: 'hidden' }}>
				{/* Title */}
				<Box
					sx={{
						backgroundColor: 'primary.main',
						color: 'white',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						p: 2,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8
					}}
				>
					<Typography variant="h6">Ingredients</Typography>
					<IconButton onClick={isEditing ? handleSaveClick : handleEditClick} sx={{ color: 'white' }}>
						{isEditing ? <CheckIcon /> : <EditIcon />}
					</IconButton>
				</Box>

				{/* Ingredient List */}
				<Box sx={{ p: 0 }}>
					{ingredients.map((ingredient, index, arr) => (
						<Box
							key={ingredient.id}
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								px: 2,
								py: 1.5,
								borderBottom: index !== arr.length - 1 ? '1px solid #ddd' : 'none'
							}}
						>
							<Typography variant="body1">
								{ingredient?.quantity || ''} {ingredient?.unit || ''} {ingredient.ingredient?.name || '[Unknown Ingredient]'}
							</Typography>

							<Box>
								<IconButton
									size="small"
									sx={{ mr: 1, visibility: isEditing ? 'visible' : 'hidden' }}
									onClick={() => handleEditIngredientClick(ingredient)}
									disabled={!isEditing}
								>
									<EditIcon fontSize="small" />
								</IconButton>
								<IconButton
									size="small"
									sx={{ visibility: isEditing ? 'visible' : 'hidden' }}
									disabled={!isEditing}
									onClick={() => handleDeleteIngredient(ingredient)}
								>
									<CloseIcon fontSize="small" />
								</IconButton>
							</Box>
						</Box>
					))}

					{/* Add Ingredient Button (only in edit mode) */}
					{isEditing && (
						<Box sx={{ display: 'flex', justifyContent: 'center', py: 2, borderTop: '1px solid #ddd' }}>
							<IconButton onClick={handleAddIngredient} size="large" sx={{ height: "40px" }}>
								<AddIcon fontSize="inherit" />
							</IconButton>
						</Box>
					)}
				</Box>
			</Paper>

			<EditIngredientDialog
				open={editDialogOpen}
				onClose={() => setEditDialogOpen(false)}
				onCreate={handleIngredientCreate}
				onUpdate={handleIngredientUpdate}
				initialData={ingredientToEdit}
				existingIngredientIds={ingredients.map(i => i.ingredientId)}
			/>
		</>
	);
};

export default RecipeIngredients;
