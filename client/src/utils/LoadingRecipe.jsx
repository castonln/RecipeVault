import { Box, CircularProgress } from "@mui/material";

const LoadingRecipe = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'grey',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <CircularProgress size={100} color='inherit' />
            <Box sx={{ margin: 2, fontSize: 32 }}>Loading Recipe...</Box>
        </Box>
    );
}

export default LoadingRecipe;