import { useState } from 'react';
import {
  Paper,
  Typography,
  IconButton,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const RecipeDetails = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState('My Awesome Recipe');
  const [description, setDescription] = useState("This is a tasty recipe that you'll love.");
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
    <Paper elevation={3} sx={{ padding: 3, position: 'relative', textAlign: 'center', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <Box sx={{ flex: 1 }}>
          {isEditing ? (
            <TextField
              label="Title"
              variant="standard"
              value={tempState.title}
              onChange={(e) => setTempState({ ...tempState, title: e.target.value })}
              sx={(theme) => ({
                width: '400px',
                // match Typography h3 styles
                '& .MuiInputBase-input': {
                  fontSize: theme.typography.h3.fontSize,
                  fontWeight: theme.typography.h3.fontWeight,
                  lineHeight: theme.typography.h3.lineHeight,
                  fontFamily: theme.typography.h3.fontFamily,
                  padding: 0,
                  // To roughly match Typography height
                  height: '1.2em',
                  minHeight: '40px',
                  boxSizing: 'content-box',
                },
                // reduce bottom margin below label
                '& .MuiInputLabel-root': {
                  fontSize: theme.typography.body2.fontSize,
                },
              })}
            />
          ) : (
            <Typography variant="h3" noWrap sx={{ lineHeight: 1.2 }}>
              {title}
            </Typography>
          )}
        </Box>
        <Box sx={{ position: 'absolute', right: 0 }}>
          <IconButton onClick={isEditing ? handleSaveClick : handleEditClick}>
            {isEditing ? <CheckIcon /> : <EditIcon />}
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        {isEditing ? (
          <TextField
            label="Description"
            multiline
            minRows={3}
            fullWidth
            value={tempState.description}
            onChange={(e) => setTempState({ ...tempState, description: e.target.value })}
          />
        ) : (
          <Typography variant="body1">{description}</Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 3 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Prep Time:
          </Typography>
          {isEditing ? (
            <FormControl variant="standard" fullWidth>
              <Select
                value={tempState.prepTime}
                onChange={(e) => setTempState({ ...tempState, prepTime: e.target.value })}
              >
                {timeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Typography>{prepTime}</Typography>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Cook Time:
          </Typography>
          {isEditing ? (
            <FormControl variant="standard" fullWidth>
              <Select
                value={tempState.cookTime}
                onChange={(e) => setTempState({ ...tempState, cookTime: e.target.value })}
              >
                {timeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Typography>{cookTime}</Typography>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Calories:
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Protein:
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Carbs:
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default RecipeDetails;
