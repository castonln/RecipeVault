import { ArrowBack, Delete, Share } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { Box, CircularProgress, FormControl, Grid, IconButton, Input, InputBase, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { RecipeContext } from '../../context/RecipeContext.js';
import { deleteRecipe, modifyRecipe } from '../../network/recipesApi.js';
import { ROUTES } from '../../utils/router.jsx';
import { useErrorContext } from '../../context/ErrorContext.jsx';

const WhiteTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: 'white', // input text color
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.8)', // label color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'white', // focused label color
  },
  '& .MuiInput-underline:before': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)', // unfocused underline
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid white', // hover underline
  },
  '& .MuiInput-underline:after': {
    borderBottom: '2px solid white', // focused underline
  },
}));

const WhiteSelect = styled(Select)(({ theme }) => ({
  color: 'white',
  '& .MuiSelect-icon': {
    color: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid white',
  },
  '& .MuiInput-underline:after': {
    borderBottom: '2px solid white',
  },
}));

const WhiteInput = styled(Input)(({ theme }) => ({
  color: 'white',
  '&:before': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
  },
  '&:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid white',
  },
  '&:after': {
    borderBottom: '2px solid white',
  },
}));

const RecipeDetails = () => {
  const navigate = useNavigate();
  const { showError } = useErrorContext();
  const { recipe, recipeMetadata } = useContext(RecipeContext);
  const recipeId = recipe.id;
  const { userId } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState(recipe.name);
  const [description, setDescription] = useState(recipe.description);
  const [prepTime, setPrepTime] = useState(recipe.prepTime);
  const [cookTime, setCookTime] = useState(recipe.cookTime);

  const [tempState, setTempState] = useState({
    title,
    description,
    prepTime,
    cookTime,
  });

  const handleEditClick = () => {
    setTempState({ title, description, prepTime, cookTime });
    setIsEditing(true);
  };

  const handleSaveClick = async () => {

    try {
      setIsLoading(true);
      const response = await modifyRecipe(userId, recipeId, tempState);

      if (response.ok) {
        setTitle(tempState.title);
        setDescription(tempState.description);
        setPrepTime(tempState.prepTime);
        setCookTime(tempState.cookTime);
        setIsEditing(false);
      } else {
        console.error("Failed to save recipe");
        showError('Failed to save recipe: Bad server response.');
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      showError('Failed to save recipe.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    try {
      setIsLoading(true);
      const response = await deleteRecipe(recipe.id, userId);

      if (response.ok) {
        navigate(ROUTES.RECIPEBOOK.path);
      } else {
        console.error("Failed to delete recipe");
        showError('Failed to delete recipe: Bad server response.');
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      showError('Failed to delete recipe.');
    } finally {
      setIsLoading(false);
    }
  };

  const timeOptions = [5, 10, 15, 20, 30, 45, 60, 90, 120];

  return (
    <Box sx={(theme) => ({
      padding: 2.5,
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      position: 'relative',
      textAlign: 'center',
      boxShadow: theme.shadows[3]
    })}>

      {/* Top Menu */}
      <Stack direction='row' sx={{ justifyContent: 'space-between', marginBottom: 2, }}>
        <IconButton onClick={() => { navigate(ROUTES.RECIPEBOOK.path) }} sx={{ color: 'white' }}>
          <ArrowBack />
        </IconButton>

        <Stack direction='row'>
          <IconButton onClick={isEditing ? isLoading ? undefined : handleSaveClick : handleEditClick} sx={{ color: 'white' }}>
            {isEditing ?
              isLoading ?
                <CircularProgress size={24} color='inherit' />
                :
                <CheckIcon />
              :
              <EditIcon />
            }
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <Share />
          </IconButton>
          <IconButton sx={{ color: 'white' }} onClick={isLoading ? undefined : handleDeleteClick}>
            {isLoading ?
              <CircularProgress size={24} color='inherit' />
              :
              <Delete />
            }
          </IconButton>
        </Stack>
      </Stack>

      {/* Title */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', mb: 2 }}>
        {isEditing ? (
          <WhiteTextField
            variant="standard"
            label="Recipe Title"
            value={tempState.title}
            onChange={(e) => setTempState((prev) => ({ ...prev, title: e.target.value }))}
            sx={{
              width: {
                xs: '90%',
                sm: '75%',
                md: '50%',
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.8)',
              },
            }}
            slotProps={{
              input: {
                style: {
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: 'white',
                },
              },
            }}
          />
        ) : (
          <Typography variant="h4" fontWeight='bold' sx={{ lineHeight: 1.2 }}>
            {title}
          </Typography>
        )}
      </Box>

      {/* Description */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
        {isEditing ? (
          <WhiteTextField
            variant="standard"
            multiline
            minRows={2}
            label="Description"
            value={tempState.description}
            onChange={(e) => setTempState((prev) => ({ ...prev, description: e.target.value }))}
            sx={{
              width: {
                xs: '90%',
                sm: '75%',
                md: '50%',
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.8)',
              },
            }}
            slotProps={{
              input: { style: { color: 'white' } },
            }}
          />
        ) : (
          <Typography variant="body1">{description}</Typography>
        )}
      </Box>


      <Grid
        container
        spacing={4}
        rowSpacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >

        {/* Prep Time */}
        <Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
            Prep Time
          </Typography>
          {isEditing ? (
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
              <WhiteSelect
                value={tempState.prepTime}
                onChange={(e) => setTempState((prev) => ({ ...prev, prepTime: e.target.value }))}
                input={<WhiteInput />}
              >
                {timeOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option} min</MenuItem>
                ))}
              </WhiteSelect>
            </FormControl>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
              {prepTime} min
            </Typography>
          )}
        </Box>

        {/* Cook Time */}
        <Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
            Cook Time
          </Typography>
          {isEditing ? (
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
              <WhiteSelect
                value={tempState.cookTime}
                onChange={(e) => setTempState((prev) => ({ ...prev, cookTime: e.target.value }))}
                input={<WhiteInput />}
              >
                {timeOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option} min</MenuItem>
                ))}
              </WhiteSelect>
            </FormControl>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
              {cookTime} min
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            flexBasis: '100%',
            height: 0,
            display: { sm: 'none' }
          }}
        />

        {/* Calories */}
        <Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
            Calories
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
            {Math.round(recipeMetadata.calories)} Cal
          </Typography>
        </Box>

        {/* Protein */}
        <Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
            Protein
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
            {Math.round(recipeMetadata.protein)} g
          </Typography>
        </Box>

        {/* Carbs */}
        <Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
            Carbs
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
            {Math.round(recipeMetadata.carbs)} g
          </Typography>
        </Box>

        {/* Fats */}
        <Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
            Fats
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
            {Math.round(recipeMetadata.fats)} g
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};

export default RecipeDetails;
