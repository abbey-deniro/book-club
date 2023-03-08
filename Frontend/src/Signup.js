import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import jwt_decode from "jwt-decode";

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
const config = {
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    },
};

const register = (Name, Email, Username, Password, Active, Clubs) => {
    axios.post(`https://0io5c6icc0.execute-api.us-west-2.amazonaws.com/bookclub/user`, {
        "body": {
            Name,
            Email,
            Username,
            Password,
            Active,
            Clubs
        }
    }, config)
        .then(res => {
            localStorage.setItem('user', res.data)
            window.location.href = '/Code';
        })
        .catch(e => {
            console.log("Register Error: " + e);
        })
};

export default function SignUp() {
    const [emailError, setError] = React.useState(false);

    const register = (Name, Email, Username, Password, Active, Clubs) => {
        axios.post(`https://0io5c6icc0.execute-api.us-west-2.amazonaws.com/bookclub/user`, {
            "body": {
                Name,
                Email,
                Username,
                Password,
                Active,
                Clubs
            }
        }, config)
            .then(res => {
                if(res.data !== "User with that email already exists"){
                    localStorage.setItem('token', res.data)
                    var decoded = jwt_decode(res.data);
                    localStorage.setItem('user', JSON.stringify(decoded));
    
                    window.location.href = '/Code';
                }
                else{
                    setError(true)
                }
            })
            .catch(e => {
                console.log("Register Error: " + e);
            })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            username: data.get('username')
        });
        register(data.get('firstName'), data.get('email'), data.get('username'), data.get('password'), false, {})
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={emailError}
                                    helperText={emailError ? "An account with that email already exists." : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/login" variant="body2" color="darkest.main">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}