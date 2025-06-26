import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import EditIngredientDialog from './EditIngredientDialog';
import { RecipeContext } from '../../context/RecipeContext';
import { patchIngredients } from '../../network/ingredientsApi';

const RecipeIngredients = () => {
	const recipe = useContext(RecipeContext);
	const [ingredients, setIngredients] = useState(recipe.recipeIngredients);

	const [isEditing, setIsEditing] = useState(false);
	const [tempIngredients, setTempIngredients] = useState([...ingredients]);

	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [ingredientToEdit, setIngredientToEdit] = useState(null);

	const [updatedIngredients, setUpdatedIngredients] = useState([]);
	const [createdIngredients, setCreatedIngredients] = useState([]);
	const [deletedIngredients, setDeletedIngredients] = useState([]);

	const handleEditClick = () => {
		setTempIngredients([...ingredients]);
		setIsEditing(true);
	};

	const handleSaveClick = async () => {
		try {
			const response = await patchIngredients(createdIngredients, updatedIngredients, deletedIngredients);
			const data = await response.json();
			console.log(data);
			setIngredients([...tempIngredients]);
			setUpdatedIngredients([]);
			setCreatedIngredients([]);
			setDeletedIngredients([]);
			setIsEditing(false);
		} catch (err) {
			console.error('Error saving instructions:', err);
		}
	};

	const handleEditIngredientClick = (ingredient, index) => {
		setIngredientToEdit({ ...ingredient, index });
		setEditDialogOpen(true);
	};

	const handleIngredientSave = (updatedIngredient) => {
		// Ingredient exists, update
		if (ingredientToEdit?.index !== undefined) {
			const updatedList = [...tempIngredients];
			updatedList[ingredientToEdit.index] = updatedIngredient;
			setUpdatedIngredients([...updatedIngredients, updatedIngredient]);
			setTempIngredients(updatedList);
			// Ingredient new, add
		} else {
			setCreatedIngredients([...createdIngredients, updatedIngredient]);
			setTempIngredients((prev) => [...prev, updatedIngredient]);
		}
		setEditDialogOpen(false);
	};

	const handleDeleteIngredient = (index) => {
		const updated = [...tempIngredients];
		setDeletedIngredients([...deletedIngredients, updated[index]]);
		updated.splice(index, 1);
		setTempIngredients(updated);
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
					{(isEditing ? tempIngredients : ingredients).map((ingredient, index, arr) => (
						<Box
							key={index}
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
								{ingredient.quantity} {ingredient.unit} {ingredient.ingredient.name}
							</Typography>

							<Box>
								<IconButton
									size="small"
									sx={{ mr: 1, visibility: isEditing ? 'visible' : 'hidden' }}
									onClick={() => handleEditIngredientClick(ingredient, index)}
									disabled={!isEditing}
								>
									<EditIcon fontSize="small" />
								</IconButton>
								<IconButton
									size="small"
									sx={{ visibility: isEditing ? 'visible' : 'hidden' }}
									disabled={!isEditing}
									onClick={() => handleDeleteIngredient(index)}
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
				onSave={handleIngredientSave}
				initialData={ingredientToEdit}
			/>
		</>
	);
};

export default RecipeIngredients;
