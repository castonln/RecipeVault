import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const RecipeBook = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={3}>
                <Card sx={{height: '150px'}}>
                    <CardContent>
                        <Typography Variant="h5" component="div">
                            Title
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Recipe description...
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={3}>
                <Card sx={{height: '150px'}}>
                    <CardContent>
                        <Typography Variant="h5" component="div">
                            Title
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Recipe description...
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={3}>
                <Card sx={{height: '150px'}} >
                    <CardContent>
                        <Typography Variant="h5" component="div">
                            Title
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Recipe description...
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={3}>
                <Card sx={{height: '150px'}}>
                    <CardContent>
                        <Typography Variant="h5" component="div">
                            Title
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Recipe description...
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default RecipeBook;