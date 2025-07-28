import { AccountCircle } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { AppBar, Box, Card, CardActionArea, CardContent, CircularProgress, createTheme, Grid, IconButton, Menu, MenuItem, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRecipes, postRecipe } from "../network/recipesApi";
import { ROUTES } from "../utils/router";
import { defaultRecipeInfo } from "./RecipePage/defaultRecipeInfo";
import { useErrorContext } from "../context/ErrorContext";
import { getSharedRecipes } from "../network/sharedRecipesApi";

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

const RecipeBook = () => {
	const navigate = useNavigate();
	const { showError } = useErrorContext();
	const { userId, setUserId } = useAuth();

	const handleSignOut = () => {
		setUserId("");
		navigate(ROUTES.SIGNIN.path);
	};

	const [recipes, setRecipes] = useState([]);
	const [sharedRecipes, setSharedRecipes] = useState([]);

	const [selectedCard, setSelectedCard] = useState(null);

	const [anchorEl, setAnchorEl] = useState(null);

	const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
	const [isLoadingCreateRecipe, setIsLoadingCreateRecipe] = useState(false);

	const addRecipe = async () => {
		try {
			setIsLoadingCreateRecipe(true);
			const response = await postRecipe(userId, defaultRecipeInfo);
			const data = await response.json();
			navigate(ROUTES.RECIPEPAGE.path.replace(":recipeId", data.id).replace(":ownerId", data.createdBy));
		} catch (error) {
			console.error("Failed to create recipe:", error);
			showError('Failed to create recipe.');
		} finally {
			setIsLoadingCreateRecipe(false);
		}
	};

	useEffect(() => {
		const fetchUserRecipes = async () => {
			try {
				setIsLoadingRecipes(true);
				const response = await getRecipes(userId);
				const data = await response.json();
				setRecipes(data);
			} catch (error) {
				console.error("Failed to load recipes:", error);
				showError('Failed to load recipes.');
			} finally {
				setIsLoadingRecipes(false);
			}
		};

		const fetchSharedRecipes = async () => {
			try {
				setIsLoadingRecipes(true);
				const response = await getSharedRecipes(userId);
				const data = await response.json();
				setSharedRecipes(data);
			} catch (error) {
				console.error("Failed to load shared recipes:", error);
				showError('Failed to load shared recipes.');
			} finally {
				setIsLoadingRecipes(false);
			}
		}

		fetchUserRecipes();
		fetchSharedRecipes();
	}, []);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [tabValue, setTabValue] = useState(0);

	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`
		};
	}

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Recipe Vault
					</Typography>
					<div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>

			<Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
				<Tab label="My Recipes" {...a11yProps(0)} />
				<Tab label="Shared With Me" {...a11yProps(1)} />
			</Tabs>

			<CustomTabPanel value={tabValue} index={0}>
				<Grid container spacing={2} padding={2}>
					{isLoadingRecipes ?
						<Grid size={{ xs: 12, sm: 6, md: 3 }}>
							<Box sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								color: 'grey',
								justifyContent: 'center',
								height: '100%',
							}}>
								<CircularProgress size={100} color='inherit' />
								<Box sx={{ margin: 2 }}>Loading Recipes...</Box>
							</Box>
						</Grid>
						:
						recipes.map((recipe, index) => (
							<Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
								<Card elevation={3} sx={{ height: '150px' }}>
									<CardActionArea
										onClick={() => {
											setSelectedCard(index);
											navigate(ROUTES.RECIPEPAGE.path.replace(":recipeId", recipe.id).replace(":ownerId", recipe.createdBy));
										}}
										data-active={selectedCard === index ? '' : undefined}
										sx={{
											height: '100%',
											'&[data-active]': {
												backgroundColor: 'action.selected',
												'&:hover': {
													backgroundColor: 'action.selectedHover',
												},
											},
										}}
									>
										<CardContent>
											<Typography variant="h5" component="div">
												{recipe.name}
											</Typography>
											<Typography variant="body2" sx={{ color: 'text.secondary' }}>
												{recipe.description}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))}
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Card elevation={3} sx={{ height: '150px' }}>
							<CardActionArea
								onClick={addRecipe}
								sx={{
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: 'text.secondary',
								}}
							>
								{isLoadingCreateRecipe ?
									<CircularProgress size={50} color='inherit' />
									:
									<AddIcon sx={{ fontSize: 50 }} />}
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			</CustomTabPanel>
			<CustomTabPanel value={tabValue} index={1}>
				<Grid container spacing={2} padding={2}>
					{isLoadingRecipes ?
						<Grid size={{ xs: 12, sm: 6, md: 3 }}>
							<Box sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								color: 'grey',
								justifyContent: 'center',
								height: '100%',
							}}>
								<CircularProgress size={100} color='inherit' />
								<Box sx={{ margin: 2 }}>Loading Recipes...</Box>
							</Box>
						</Grid>
						:
						sharedRecipes.map((recipe, index) => (
							<Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
								<Card elevation={3} sx={{ height: '150px' }}>
									<CardActionArea
										onClick={() => {
											setSelectedCard(index);
											navigate(ROUTES.RECIPEPAGE.path.replace(":recipeId", recipe.id).replace(":ownerId", recipe.createdBy));
										}}
										data-active={selectedCard === index ? '' : undefined}
										sx={{
											height: '100%',
											'&[data-active]': {
												backgroundColor: 'action.selected',
												'&:hover': {
													backgroundColor: 'action.selectedHover',
												},
											},
										}}
									>
										<CardContent>
											<Typography variant="h5" component="div">
												{recipe.name}
											</Typography>
											<Typography variant="body2" sx={{ color: 'text.secondary' }}>
												{recipe.description}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))}
				</Grid>
			</CustomTabPanel>
		</>
	);
}

export default RecipeBook;