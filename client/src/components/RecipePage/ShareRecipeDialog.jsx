import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { useErrorContext } from '../../context/ErrorContext';
import { RecipeContext } from '../../context/RecipeContext';
import { deleteRecipeShare, getUsersSharedWith, postRecipeShare } from "../../network/sharedRecipesApi";
import { getUsers } from "../../network/usersApi";

const ShareRecipeDialog = ({ open, onClose }) => {
    const { recipe } = useContext(RecipeContext);
    const recipeId = recipe.id;
    const { userId } = useAuth();
    const { showError } = useErrorContext();

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [usersToShareWith, setUsersToShareWith] = useState([]);
    const [usersSharedWith, setUsersSharedWith] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                const fetchUsers = async () => {
                    const response = await getUsers();
                    const data = await response.json();
                    const filteredUsers = data.filter(user => user.id !== userId);
                    setUsers(filteredUsers);
                }

                const fetchUsersSharedWith = async () => {
                    const response = await getUsersSharedWith(recipeId, userId);
                    const data = await response.json();
                    setUsersSharedWith(data);
                }

                await Promise.all([
                    fetchUsers(),
                    fetchUsersSharedWith()
                ]);
            } catch (error) {
                console.error("Error fetching users:", error);
                showError('Failed to fetch users.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [recipeId, userId, open]);

    useEffect(() => {
        setUsersToShareWith(usersSharedWith);
    }, [usersSharedWith]);

    const handleShareClick = async () => {
        const newShares = usersToShareWith.filter(potentialShare =>
            !usersSharedWith.some(existingShare => existingShare.id === potentialShare.id)
        );

        const removedShares = usersSharedWith.filter(existingShare =>
            !usersToShareWith.some(potentialShare => existingShare.id === potentialShare.id)
        );

        // console.log("Users to newly share with:", newShares);
        // console.log("Users to unshare with:", removedShares);

        const updateSharedUsers = async () => {
            setIsSaving(true);
            try {
                const createShare = async (sharedUserId) => {
                    const response = await postRecipeShare(userId, sharedUserId, recipeId);
                    if (response.status !== 201) {
                        throw new Error(`Failed to create share for user ID ${sharedUserId}. Status: ${response.status}`);
                    }
                }

                const deleteShare = async (sharedUserId) => {
                    const response = await deleteRecipeShare(recipeId, sharedUserId);
                    if (response.status !== 200) {
                        throw new Error(`Failed to delete share for user ID ${sharedUserId}. Status: ${response.status}`);
                    }
                }

                await Promise.all([
                    ...newShares.map(user => createShare(user.id)),
                    ...removedShares.map(user => deleteShare(user.id)),
                ]);

            } catch (error) {
                console.error("Error updating user shares:", error);
                showError('Failed to update shared users.');
            } finally {
                setIsSaving(false);
                onClose();
            }
        };
        await updateSharedUsers(newShares, removedShares);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm">
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Share Recipe
                <IconButton
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
                {isLoading ?
                    <CircularProgress />
                    :
                    <Autocomplete
                        multiple
                        options={users}
                        getOptionLabel={(option) => option.username || ''}
                        value={usersToShareWith}
                        onChange={(event, newValue) => {
                            setUsersToShareWith(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Add users"
                            />
                        )
                        }
                        getOptionDisabled={(option) =>
                            usersToShareWith.some(selected => selected.id === option.id)
                        }
                    />
                }
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    onClick={handleShareClick}>
                    {isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ShareRecipeDialog;