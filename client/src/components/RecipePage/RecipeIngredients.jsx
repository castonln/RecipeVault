import { useState } from 'react';
import {
    Paper,
    Typography,
    IconButton,
    Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const RecipeIngredients = () => {
    const [ingredients, setIngredients] = useState([
        '2 cups of flour',
        '1 tsp baking powder',
        '1/2 cup sugar'
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [tempIngredients, setTempIngredients] = useState([...ingredients]);

    const handleEditClick = () => {
        setTempIngredients([...ingredients]);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIngredients([...tempIngredients]);
        setIsEditing(false);
    };

    const handleDeleteIngredient = (index) => {
        const updated = [...tempIngredients];
        updated.splice(index, 1);
        setTempIngredients(updated);
    };

    const handleAddIngredient = () => {
        setTempIngredients([...tempIngredients, 'New Ingredient']);
    };

    return (
        <Paper elevation={3} sx={{ mt: 4, borderRadius: 2, overflow: 'hidden' }}>
            {/* Blue Banner */}
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
                        <Typography variant="body1">{ingredient}</Typography>

                        <Box>
                            <IconButton
                                size="small"
                                sx={{ mr: 1, visibility: isEditing ? 'visible' : 'hidden' }}
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
                        <IconButton onClick={handleAddIngredient} size="large" sx={{height: "0px"}}>
                            <AddIcon fontSize="inherit" />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default RecipeIngredients;
