import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/router";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            m: 5,
        }}>
            <Typography variant='h1' fontWeight='bold'>404</Typography>
            <Typography>Sorry, we couldn't find that page.</Typography>
            <Button                
                variant='contained'
                onClick={() => { navigate(ROUTES.RECIPEBOOK.path) }}
                sx={{ m: 2 }}>
                Back to homepage
            </Button>
        </Box>
    );
}
 
export default PageNotFound;