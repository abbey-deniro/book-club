import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import BookImage from './images/book.png';

const mdTheme = createTheme({
    palette: {
        primary: {
            main: '#314772',
        },
        secondary: {
            main: '#4D6FB3',
        },
        darkest: {
            main: "#00171F",
        }
    }
});

function DashboardContent() {
    const [ imagePreview , setImagePreview ] = React.useState(BookImage);

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file));
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex', mt: 3 }}>
                <CssBaseline />
                {/* Background */}
                <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={8} md={8} lg={9} >
                            {/* Welcome/ Book clubs */}
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minHeight: 250,
                                }}
                            >
                                <Typography component="h1" variant="h4" paddingBottom={'1rem'} paddingLeft={'1rem'}>
                                    Create a Book Club:
                                </Typography>
                                {/* Input */}
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={5}
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: 250,
                                            '& > :not(style)': { m: 1, width: '22ch' },
                                            alignItems: "center",
                                            marginLeft: 6.8
                                        }}
                                    >
                                        <TextField required id="outlined-basic" label="Club Name" variant="outlined" />
                                        <TextField required id="outlined-basic" label="Club Code" variant="outlined" inputProps={{ maxLength: 15 }} />
                                    </Grid>
                                    <Grid item xs={5}
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: 250,
                                            '& > :not(style)': { m: 1, width: '22ch' },
                                        }}
                                    >
                                        <TextField required id="outlined-basic" label="Book Title" variant="outlined" />
                                        <TextField id="outlined-basic" label="Book Length/Pages" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} md={4} lg={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 250,
                                }}
                            >
                                <img src={imagePreview} width="100%" height="100%" name="bookImage" />
                                <Button
                                variant="contained"
                                component="label"
                                startIcon={<PhotoCamera />}
                                sx={{
                                    marginTop: 6
                                }}
                            >
                                Upload
                                <input hidden accept="image/*" type="file" onChange={handleImage} />
                            </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}