import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Select, MenuItem, Button, Box, FormControl, InputLabel, FormHelperText, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect, useContext } from 'react';
import createIngredientObject from './createIngredientObject';
import { RecipeContext } from '../../context/RecipeContext';
import { getIngredients } from '../../network/ingredientsApi';

const unitOptions = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'cups', 'pcs'];

const EditIngredientDialog = ({ open, onClose, onSave, initialData }) => {
	const { id: recipeId } = useContext(RecipeContext);

	const [ingredient, setIngredient] = useState({});
	const [quantity, setQuantity] = useState('');
	const [unit, setUnit] = useState(initialData?.unit || 'cups');

	const [ingredientError, setIngredientError] = useState(false);
	const [quantityError, setQuantityError] = useState(false);
	const [unitError, setUnitError] = useState(false);

	const [ingredientsList, setIngredientsList] = useState([]);

	useEffect(() => {
		const fetchIngredients = async () => {
			const response = await getIngredients();
			const data = await response.json();
			setIngredientsList(data);
		}
		fetchIngredients();
	}, [])

	useEffect(() => {
		setIngredient(initialData?.ingredient || {});
		setQuantity(initialData?.quantity || '');
		setUnit(initialData?.unit || 'cups');

		setIngredientError(false);
		setQuantityError(false);
		setUnitError(false);
	}, [initialData, open]);

	const handleSave = () => {
		setIngredientError(false);
		setQuantityError(false);
		setUnitError(false);

		let valid = true;

		if (!ingredient?.name) {
			setIngredientError(true);
			valid = false;
		}
		if (!quantity || Number(quantity) <= 0) {
			setQuantityError(true);
			valid = false;
		}
		if (!unit) {
			setUnitError(true);
			valid = false;
		}

		if (!valid) return;

		onSave(createIngredientObject(
			ingredient,
			quantity,
			unit,
			initialData?.id || undefined,
			recipeId
		));
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle sx={{ m: 0, p: 2 }}>
				{initialData?.ingredient ? 'Edit Ingredient' : 'Add Ingredient'}
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Autocomplete
						disablePortal
						options={ingredientsList}
						getOptionLabel={(option) => option.name || ''}
						value={ingredient}
						onChange={(event, newValue) => {
							console.log('Selected ingredient:', newValue);
							setIngredient(newValue);
						}}
						isOptionEqualToValue={(option, value) => option.id === value?.id}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Ingredient Name"
								error={ingredientError}
								helperText={ingredientError ? "Please enter an ingredient name." : ''}
							/>
						)}
					/>

					<Box sx={{ display: 'flex', gap: 2 }}>
						<TextField
							label="Quantity"
							type="number"
							slotProps={{
								htmlInput: {
									min: 0
								}
							}}
							value={quantity}
							onChange={(e) => { setQuantity(e.target.value) }}
							sx={{ flex: 2 }}
							error={quantityError}
							helperText={quantityError ? "Please enter a valid quantity." : ''}
						/>

						<FormControl fullWidth sx={{ flex: 1 }} error={unitError}>
							<InputLabel>Unit</InputLabel>
							<Select
								value={unit}
								label="Unit"
								onChange={(e) => setUnit(e.target.value)}
							>
								{unitOptions.map((u) => (
									<MenuItem key={u} value={u}>
										{u}
									</MenuItem>
								))}
							</Select>
							{unitError && (
								<FormHelperText>Please select a unit.</FormHelperText>
							)}
						</FormControl>
					</Box>
				</Box>
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleSave} variant="contained" color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditIngredientDialog;
