import { ArrowBack, Delete, Share } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { Box, FormControl, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/router.jsx';

const RecipeDetails = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState('My Recipe');
  const [description, setDescription] = useState("This is my favorite meal.");
  const [prepTime, setPrepTime] = useState('15 mins');
  const [cookTime, setCookTime] = useState('30 mins');

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

  const handleSaveClick = () => {
    setTitle(tempState.title);
    setDescription(tempState.description);
    setPrepTime(tempState.prepTime);
    setCookTime(tempState.cookTime);
    setIsEditing(false);
  };

  const timeOptions = ['5 mins', '10 mins', '15 mins', '20 mins', '30 mins', '45 mins', '1 hr'];

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
          <IconButton onClick={isEditing ? handleSaveClick : handleEditClick} sx={{ color: 'white' }}>
            {isEditing ? <CheckIcon /> : <EditIcon />}
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <Share />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <Delete />
          </IconButton>
        </Stack>
      </Stack>

      {/* Title */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', mb: 1 }}>
        {isEditing ? (
          <TextField
            variant="standard"
            label="Recipe Title"
            value={tempState.title}
            onChange={(e) => setTempState((prev) => ({ ...prev, title: e.target.value }))}
            sx={{
              maxWidth: '500px', textAlign: 'center',
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.8)',
              },
            }}
            slotProps={{
              input: {
                style: {
                  textAlign: 'center',
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
          <TextField
            variant="standard"
            multiline
            label="Description"
            value={tempState.description}
            onChange={(e) => setTempState((prev) => ({ ...prev, description: e.target.value }))}
            sx={{
              maxWidth: '500px',
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
              <Select
                value={tempState.prepTime}
                onChange={(e) => setTempState((prev) => ({ ...prev, prepTime: e.target.value }))}
                sx={{ color: 'white' }}
              >
                {timeOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
              {prepTime}
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
              <Select
                value={tempState.cookTime}
                onChange={(e) => setTempState((prev) => ({ ...prev, cookTime: e.target.value }))}
                sx={{ color: 'white' }}
              >
                {timeOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
              {cookTime}
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
            320
          </Typography>
        </Box>

        {/* Protein */}
        <Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
            Protein
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
            12g
          </Typography>
        </Box>

        {/* Carbs */}
        <Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
            Carbs
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
            45g
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};

export default RecipeDetails;
