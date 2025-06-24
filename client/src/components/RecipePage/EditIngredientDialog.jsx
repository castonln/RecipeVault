import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Select, MenuItem, Button, Box, FormControl, InputLabel, FormHelperText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

const unitOptions = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'cups', 'pcs'];

const EditIngredientDialog = ({ open, onClose, onSave, initialData }) => {
	const [name, setName] = useState('');
	const [quantity, setQuantity] = useState('');
	const [unit, setUnit] = useState(initialData?.unit || 'cups');

	const [nameError, setNameError] = useState(false);
	const [quantityError, setQuantityError] = useState(false);
	const [unitError, setUnitError] = useState(false);

	useEffect(() => {
		setName(initialData?.name || '');
		setQuantity(initialData?.quantity || '');
		setUnit(initialData?.unit || 'cups');

		setNameError(false);
		setQuantityError(false);
		setUnitError(false);
	}, [initialData, open]);

	const handleSave = () => {
		setNameError(false);
		setQuantityError(false);
		setUnitError(false);

		let valid = true;

		if (!name.trim()) {
			setNameError(true);
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

		onSave({ name: name.trim(), quantity, unit });
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle sx={{ m: 0, p: 2 }}>
				{initialData?.name ? 'Edit Ingredient' : 'Add Ingredient'}
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
					<TextField
						label="Ingredient Name"
						fullWidth
						value={name}
						onChange={(e) => setName(e.target.value)}
						error={nameError}
						helperText={nameError ? "Please enter an ingredient name." : ''}
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
