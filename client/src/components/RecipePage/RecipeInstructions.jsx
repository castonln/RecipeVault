import { useState } from 'react';
import {
  Paper,
  Typography,
  IconButton,
  TextField,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const RecipeInstructions = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [instructions, setInstructions] = useState([
    'Preheat the oven to 350°F (175°C).',
    'Mix the dry ingredients together.',
    'Add wet ingredients and stir until combined.',
    'Pour batter into a pan and bake for 30 minutes.'
  ]);

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);

  const handleInstructionChange = (index, value) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const handleDeleteInstruction = (index) => {
    const updated = [...instructions];
    updated.splice(index, 1);
    setInstructions(updated);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, 'New step...']);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(instructions);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setInstructions(reordered);
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
        <Typography variant="h6">Instructions</Typography>
        <IconButton onClick={isEditing ? handleSaveClick : handleEditClick} sx={{ color: 'white' }}>
          {isEditing ? <CheckIcon /> : <EditIcon />}
        </IconButton>
      </Box>

      <Box>
        {isEditing ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="instructions">
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {instructions.map((step, index) => (
                    <Draggable key={index} draggableId={`step-${index}`} index={index}>
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: snapshot.isDragging ? 'action.hover' : 'inherit',
                            borderRadius: 1,
                            px: 2,
                            py: 1.5,
                            userSelect: 'none',
                            mb: 1
                          }}
                        >
                          {/* Step Number */}
                          <Box
                            sx={(theme) => ({
                              minWidth: 24,
                              mr: 2,
                              fontWeight: 'bold',
                              color: theme.palette.text.secondary,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: theme.typography.body1.fontSize,
                              fontFamily: theme.typography.fontFamily,
                              lineHeight: '30px',
                              userSelect: 'none',
                            })}
                          >
                            {index + 1}.
                          </Box>

                          {/* Editable Text */}
                          <Box sx={{ flexGrow: 1 }}>
                            <TextField
                              fullWidth
                              multiline
                              variant="standard"
                              value={step}
                              onChange={(e) => handleInstructionChange(index, e.target.value)}
                              inputProps={{
                                style: {
                                  fontSize: '16px',
                                  lineHeight: '30px',
                                  padding: 0,
                                  minHeight: 30,
                                  height: 30,
                                  boxSizing: 'border-box',
                                  userSelect: 'text',
                                },
                              }}
                              sx={{
                                '& .MuiInputBase-input': {
                                  fontSize: '16px !important',
                                  lineHeight: '30px !important',
                                  height: '30px !important',
                                  padding: 0,
                                  boxSizing: 'border-box',
                                }
                              }}
                            />
                          </Box>

                          {/* Delete & Drag Handle Buttons */}
                          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                            <IconButton size="small" onClick={() => handleDeleteInstruction(index)}>
                              <CloseIcon fontSize="small" />
                            </IconButton>
                            <Box
                              {...provided.dragHandleProps}
                              sx={{
                                cursor: 'grab',
                                ml: 1,
                                color: 'text.secondary',
                                userSelect: 'none'
                              }}
                            >
                              <DragHandleIcon fontSize="small" />
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          // Non-edit mode static list
          <Box>
            {instructions.map((step, index) => (
              <Box
                key={index}
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'flex-start',
                  px: 2,
                  py: 1.5,
                  borderBottom: index !== instructions.length - 1 ? '1px solid #ddd' : 'none',
                  userSelect: 'none'
                })}
              >
                <Box
                  sx={(theme) => ({
                    minWidth: 24,
                    mr: 2,
                    fontWeight: 'bold',
                    color: theme.palette.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: theme.typography.body1.fontSize,
                    fontFamily: theme.typography.fontFamily,
                    lineHeight: '30px',
                    userSelect: 'none',
                  })}
                >
                  {index + 1}.
                </Box>

                <Typography variant="body1" sx={{ lineHeight: '30px' }}>
                  {step}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Add New Step Button */}
        {isEditing && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2, mt: 2, borderTop: '1px solid #ddd' }}>
            <IconButton onClick={handleAddInstruction} size="large" sx={{ height: "40px" }}>
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default RecipeInstructions;
