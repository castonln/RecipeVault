import { useContext, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  Box, CircularProgress, IconButton, Paper, TextField, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { patchInstructions } from '../../network/instructionsApi';
import { RecipeContext } from '../../context/RecipeContext';
import { useErrorContext } from '../../context/ErrorContext';
import { usePermissionsContext } from '../../utils/RequiresRecipeAccess';

const RecipeInstructions = () => {
  const { showError } = useErrorContext();
  const { recipe } = useContext(RecipeContext);
  const recipeId = recipe.id;
  const { ownership } = usePermissionsContext();

  const [isEditing, setIsEditing] = useState(false);
  const [instructions, setInstructions] = useState(recipe.instructions || []);

  const [editedInstructions, setEditedInstructions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    const cloned = JSON.parse(JSON.stringify(instructions)).map(inst => ({
      ...inst,
      id: undefined,
    }));

    setEditedInstructions(cloned);
    setIsEditing(true);
  };

  const handleInstructionChange = (index, value) => {
    const updated = [...editedInstructions];
    updated[index].description = value;
    setEditedInstructions(updated);
  };

  const handleDeleteInstruction = (index) => {
    const updated = [...editedInstructions];
    updated.splice(index, 1);
    setEditedInstructions(updated);
  };

  const handleAddInstruction = () => {
    setEditedInstructions([
      ...editedInstructions,
      {
        id: undefined,
        recipeId: recipeId,
        instructionNumber: editedInstructions.length,
        description: 'New step...'
      }
    ]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updated = [...editedInstructions];
    const [movedItem] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, movedItem);

    // Update instruction numbers
    const reordered = updated.map((item, index) => ({
      ...item,
      instructionNumber: index
    }));

    setEditedInstructions(reordered);
  };

  const handleSaveClick = async () => {
    // const editedInstructionsIds = new Set(editedInstructions.map(item => item.id));
    // const instructionsIds = new Set(instructions.map(item => item.id));

    // const deleteInstructions = instructions.filter(item => !editedInstructionsIds.has(item.id));
    // const createInstructions = editedInstructions.filter(item => item.id === undefined);
    // const updateInstructions = editedInstructions.filter(item => instructionsIds.has(item.id));

    // This is a stopgap solution until key error is fixed - LC
    const deletePayload = {
      "createEntities": [],
      "updateEntities": [],
      "deleteEntities": instructions,
    };

    const createPayload = {
      "createEntities": editedInstructions,
      "updateEntities": [],
      "deleteEntities": [],
    };

    try {
      setIsLoading(true);
      const deleteResp = await patchInstructions(deletePayload);
      const deleteData = await deleteResp.json();
      const response = await patchInstructions(createPayload);
      const data = await response.json();
      setInstructions(data.createEntities);
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving instructions:', err);
      showError('Failed to save instructions.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ mt: 4, borderRadius: 2, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8

      }}>
        <Typography variant="h6">Instructions</Typography>
        {(ownership === "owner") &&
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
        }
      </Box>

      {/* Body */}
      {isEditing ? (
        <Box>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="instructions">
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {editedInstructions.map((step, index) => (
                    <Draggable key={index} draggableId={`step-${index}`} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{ display: 'flex', alignItems: 'center', paddingX: 2, paddingY: 1 }}
                        >
                          <Box sx={{ minWidth: 24, mr: 2 }}>{index + 1}.</Box>
                          <TextField
                            fullWidth
                            variant="standard"
                            value={step.description}
                            onChange={(e) => handleInstructionChange(index, e.target.value)}
                          />
                          <IconButton onClick={() => handleDeleteInstruction(index)}>
                            <CloseIcon />
                          </IconButton>
                          <Box {...provided.dragHandleProps}>
                            <DragHandleIcon />
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
        </Box>
      ) : (
        <Box sx={instructions.length > 0 ? { p: 2 } : {}}>
          {instructions.map((step, index) => (
            <Box key={index} sx={{ display: 'flex', mb: 1 }}>
              <Box sx={{ minWidth: 24, mr: 2 }}>{index + 1}.</Box>
              <Typography>{step.description}</Typography>
            </Box>
          ))}
        </Box>
      )}
      {/* Add Step Button */}
      {isEditing && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <IconButton onClick={handleAddInstruction} size='large'>
            <AddIcon fontSize='inherit' />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

export default RecipeInstructions;
