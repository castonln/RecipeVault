import { useEffect, useState } from "react";
import { Stack, Paper, Box, TextField, Typography, Button, CircularProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import { ROUTES } from "../utils/router";
import { signUp } from "../network/authApi";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
    const { userId, setUserId } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setError(null);

        if (password !== reenterPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const response = await signUp({ username, email, password });

            if (response.status === 200) {
                const newUserId = await response.json();
                setUserId(newUserId);
                navigate(ROUTES.SIGNIN.path);
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred during signup.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            navigate(ROUTES.RECIPEBOOK.path);
        }
    }, [userId]);

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100vh" }}
        >
            <Paper elevation={5} sx={{ width: "620px" }}>
                <Box component="form" onSubmit={handleSubmit} noValidate margin="40px">
                    <Typography
                        component="h1"
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            textAlign: "center",
                            marginBottom: "30px",
                        }}
                    >
                        Sign Up
                    </Typography>

                    {error && (
                        <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
                            {error}
                        </Typography>
                    )}

                    <TextField
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        required
                        autoFocus
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        placeholder="Re-enter Password"
                        type="password"
                        value={reenterPassword}
                        onChange={(e) => setReenterPassword(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: "20px" }}
                    />

                    <Button type="submit" variant="contained" fullWidth>
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                    </Button>

                    <Typography
                        sx={{
                            marginTop: "20px",
                            textAlign: "center",
                        }}
                    >
                        Already have an account? <NavLink to={ROUTES.SIGNIN.path}>Sign in</NavLink>
                    </Typography>
                </Box>
            </Paper>
        </Stack>
    );
};

export default SignUp;
