import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import EditIngredientDialog from './EditIngredientDialog';

const RecipeIngredients = () => {
	{/* Temporary Ingredients (will retrieve from database) */}
	const [ingredients, setIngredients] = useState([
		{ name: 'flour', quantity: '2', unit: 'cups' },
		{ name: 'baking powder', quantity: '1', unit: 'tsp' },
		{ name: 'sugar', quantity: '0.5', unit: 'cup' }
	]);

	const [isEditing, setIsEditing] = useState(false);
	const [tempIngredients, setTempIngredients] = useState([...ingredients]);

	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [ingredientToEdit, setIngredientToEdit] = useState(null);

	const handleEditClick = () => {
		setTempIngredients([...ingredients]);
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIngredients([...tempIngredients]);
		setIsEditing(false);
	};

	const handleEditIngredientClick = (ingredient, index) => {
		setIngredientToEdit({ ...ingredient, index });
		setEditDialogOpen(true);
	};

	const handleIngredientSave = (updatedIngredient) => {
		if (ingredientToEdit?.index !== undefined) {
			const updatedList = [...tempIngredients];
			updatedList[ingredientToEdit.index] = updatedIngredient;
			setTempIngredients(updatedList);
		} else {
			setTempIngredients((prev) => [...prev, updatedIngredient]);
		}
		setEditDialogOpen(false);
	};

	const handleDeleteIngredient = (index) => {
		const updated = [...tempIngredients];
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
								{ingredient.quantity} {ingredient.unit} {ingredient.name}
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
