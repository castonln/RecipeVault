import { Stack, Paper, Box, TextField, Typography, Button } from "@mui/material";
import { NavLink } from "react-router";
import { ROUTES } from "../utils/router";

//test sync
const SignUp = () => {
    const handleSubmit = () => {
        console.log("Submit")
    }

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{height: "100vh" }}>

            <Paper elevation={5}>
                <Box component="form" onSubmit={handleSubmit} noValidate margin="40px">
                    <Typography
                        component="h1"
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            textAlign: "center",
                            marginBottom: "30px"
                        }}>
                        Sign Up
                    </Typography>
                    <TextField placeholder="Username" fullWidth required autoFocus sx={{ marginBottom: "20px" }} />
                    <TextField placeholder="Password" fullWidth required type="password" sx={{ marginBottom: "20px" }} />
                    <TextField placeholder="Renter Password" fullWidth required type="password" sx={{ marginBottom: "20px" }} />
                    <Button type="submit" variant="contained" fullWidth>Sign Up</Button>
                    
                    <Typography sx={{
                        marginTop: "20px",
                        textAlign: "center",
                    }}>
                        Already have an account? <NavLink to={"/signin"}>Sign in</NavLink>
                    </Typography>
                </Box>
            </Paper>
        </Stack>
    );
}

export default SignUp;