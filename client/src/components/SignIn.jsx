import { Stack, Paper, Box, TextField, Typography, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import { ROUTES } from "../utils/router";
import { logIn } from "../network/authApi";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
    const { userId, setUserId } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await logIn({
            username,
            password
        });

        if (response.status == 200) {
            const newUserId = await response.json();
            setUserId(newUserId);
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
            sx={{ height: "100vh" }}>
            <Paper elevation={5} sx={{ width: "620px" }}>
                <Box component="form" onSubmit={handleSubmit} noValidate margin="40px">
                    <Typography
                        component="h1"
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            textAlign: "center",
                            marginBottom: "30px"
                        }}>
                        Sign In
                    </Typography>

                    <TextField
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        required
                        autoFocus
                        sx={{ marginBottom: "20px" }} />

                    <TextField
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        type="password"
                        sx={{ marginBottom: "20px" }} />

                    <Button type="submit" variant="contained" fullWidth>Sign In</Button>

                    <Typography sx={{
                        marginTop: "20px",
                        textAlign: "center",
                    }}>
                        Don't have an account? <NavLink to={ROUTES.SIGNUP.path}>Sign up</NavLink>
                    </Typography>
                </Box>
            </Paper>
        </Stack>
    );
}

export default SignIn;