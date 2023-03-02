import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";

const theme = createTheme({
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
const Activate = (Name, Email, Username, Active, Clubs) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    axios.put(`https://0io5c6icc0.execute-api.us-west-2.amazonaws.com/bookclub/user`, {
        "body": {
            Name,
            Email,
            Username,
            Active,
            Clubs
        }
    }, config)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log("Register Error: " + e);
        })
};

export default function Code() {
    let user = JSON.parse(localStorage.getItem('user'))
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (Number(data.get('code')) !== user.VerifcationCode) {
            console.log('wrong code')
        } else {
            console.log('right code')
            Activate(user.Name, user._id, user.username, true, user.Clubs)
            window.location.href = '/Home';

        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <EmailIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Please Check Your Email For Code
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="code"
                            label="Activation Code"
                            type="number"
                            id="code"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Active Account
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}