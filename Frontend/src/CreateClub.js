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
import axios from "axios";
import { useState } from 'react';
import { uploadFile } from 'react-s3';
import {awsAccessKey, awsSecretKey} from './awsKeys'
import { v4 as uuid } from 'uuid';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
window.Buffer = window.Buffer || require("buffer").Buffer;

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

const CustomLinearProgress = styled(LinearProgress)(({ }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#BDBDBD',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: mdTheme.palette.primary.main,
    },
}));

const s3Config = {
    bucketName: 'bookclubteam1',
    region: 'us-west-2',
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
}

function DashboardContent() {
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [imagePreview, setImagePreview] = React.useState(BookImage);
    const [bookLength, setBookLength] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [loading, setLoading] = useState(false);
    let decodeUser = JSON.parse(localStorage.getItem('user'))

    const addMember = (code, Email) => {
        const config = {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        };
        axios.post(`https://0io5c6icc0.execute-api.us-west-2.amazonaws.com/bookclub/club/member`, {
            "bookClubCode": code,
            "userEmail": Email
        }, config)
            .then(res => {
                console.log(res)
                window.location.href = '/Home';

            })
            .catch(e => {
                console.log("Register Error: " + e);
                console.log("code :" + code)
                console.log("Email :" + Email)
            })
    };

    const createClub = async (bookClubCode, owner, title, name, bookLength) => {
        let imageUrl;

        var renamedFile = new File([imageFile], `${uuid()}.${imageFile.name.split('.').pop()}`, {type: imageFile.type})
        await uploadFile(renamedFile, s3Config)
            .then(data => {
                console.log(data); 
                imageUrl = data.location;
            })
            .catch(err => console.error(err))

        var data = JSON.stringify({
            "bookClubCode": bookClubCode,
            "owner": owner,
            "imageUrl": imageUrl,
            "title": title,
            "name": name,
            "bookLength": bookLength
        });

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://0io5c6icc0.execute-api.us-west-2.amazonaws.com/bookclub/club',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                addMember(code, decodeUser._id);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // When the user clicks on the upload button, get file url they upload
    const handleImage = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file));
        setImageFile(file);
    }

    const uploadData = () => {
        setLoading(true);
        createClub(code, decodeUser._id, title, name, bookLength);

    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex', mt: 3 }}>
                <CssBaseline />
                {/* Background */}
                <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={8} md={8} lg={9} >
                            {/* Create a Book club title */}
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
                                {/* Club Input -- Name & Code */}
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
                                        {/* Name and Code Inputes  */}
                                        <TextField required id="outlined-basic" label="Club Name" value={name} onChange={(newValue) => setName(newValue.target.value)} variant="outlined" />
                                        <TextField required id="outlined-basic" label="Club Code" value={code} onChange={(newValue) => setCode(newValue.target.value)} variant="outlined" inputProps={{ maxLength: 15 }} />
                                    </Grid>
                                    {/* Book Input -- Title & Length */}
                                    <Grid item xs={5}
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: 250,
                                            '& > :not(style)': { m: 1, width: '22ch' },
                                        }}
                                    >
                                        {/* Title & Length */}
                                        <TextField required id="outlined-basic" label="Book Title" value={title} onChange={(newValue) => setTitle(newValue.target.value)} variant="outlined" />
                                        <TextField id="outlined-basic" label="Book Length/Pages" value={bookLength} onChange={(newValue) => setBookLength(newValue.target.value)} variant="outlined" />
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
                                {/* Image Preview */}
                                <img src={imagePreview} width="100%" height="175px" name="bookImage" />
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<PhotoCamera />}
                                    sx={{
                                        marginTop: 1.5
                                    }}
                                >
                                    {/* Upload Button calls the handleImage func */}
                                    Upload
                                    <input hidden accept="image/*" type="file" onChange={handleImage} />
                                </Button>
                            </Paper>
                        </Grid>
                        {/* Create Club Button */}
                        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                        <Button variant="contained" sx={{ marginTop: 3, marginLeft: 3 }} onClick={uploadData}>Create Club</Button>
                        {loading ? <CustomLinearProgress variant='indeterminate' sx={{width: '495px', height: '7px', margin: '15px 15px 0px 15px'}}/> : null}
                        </div>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}