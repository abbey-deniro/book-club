import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useState, useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import BookImage from './images/book.png';
import testImage from './images/bookExamp.jpg';
import { CommentSection } from 'react-comments-section';
import axios from 'axios';
import 'react-comments-section/dist/index.css';
import { useParams } from 'react-router-dom';
import moment from 'moment';

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
    const user = JSON.parse(localStorage.getItem('user'));
    const clubCode = useParams().code

    const [bookclub, setClub] = useState({});
    const [comment, setComment] = useState('');

    const postComment = () => {
        console.log(comment);

        axios.post(`https://0io5c6icc0.execute-api.us-west-2.amazonaws.com/bookclub/club/comment`, {
            "bookClubCode": clubCode,
            "username": user.username,
            "comment": comment
        }, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                getComment()
            })
            .catch(e => {
                console.log(e)
            })
    };


    const getComment = () => {
        //console.log(user)
        axios.get(`https://0io5c6icc0.execute-api.us-west-2.amazonaws.com/bookclub/club/${clubCode}`,
            {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res)
                setClub(res.data)

                if (res.data === null || !(res.data.members.includes(user._id))) {
                    //Someone snuck into the club do something 
                    console.log("User not in club or club doesnt exist")
                }
            })
            .catch(e => console.log(e));
    }
    const uploadData = () => {
        console.log("Upload Data");
    };

    // Gets the clubs data when the page opens
    useEffect(() => {
        //console.log(user)
        axios.get(`https://0io5c6icc0.execute-api.us-west-2.amazonaws.com/bookclub/club/${clubCode}`,
            {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res)
                setClub(res.data)

                if (res.data === null || !(res.data.members.includes(user._id))) {
                    //Someone snuck into the club do something 
                    console.log("User not in club or club doesnt exist")
                }
            })
            .catch(e => console.log(e));
    }, []);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex', mt: 3 }}>
                <CssBaseline />
                {/* Background */}
                <Container maxWidth="md" sx={{ mt: 2, mb: 4 }}>
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
                                <Typography component="h1" variant="h3" paddingBottom={'1rem'} paddingLeft={'1rem'}>
                                    {bookclub.Name}
                                </Typography>
                                {/* Club Input -- Name & Code */}
                                <Grid container rowSpacing={1} flexDirection={'column'} columnSpacing={{ xs: 1, sm: 2, md: 3, }}>
                                    <Typography component="h2" variant="h5" paddingBottom={'1rem'} paddingLeft={'3rem'}>
                                        Book Title: {bookclub.BookTitle}
                                    </Typography>
                                    <Typography component="h2" paddingBottom={'1rem'} paddingLeft={'3rem'}>
                                        Book Length: "{bookclub.BookLength}"
                                    </Typography>
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
                                <img src={bookclub.Image} width="100%" height="215px" name="bookImage" />
                            </Paper>
                        </Grid>
                        {/* Comment Grid */}
                        <Grid item xs={10} md={12} lg={12} >
                            <Paper
                                sx={{
                                    p: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minHeight: 250,
                                }}
                            >
                                {/* comment box */}

                                <Typography component="h2" variant="h5" paddingBottom={'1rem'} paddingLeft={'1rem'}>Comments:</Typography>
                                {
                                    bookclub.comments ?
                                    bookclub.comments.map(comment => {
                                        return(
                                            <Paper
                                                sx={{
                                                    p: 3,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    minHeight: 200,
                                                    marginBottom: 3,
                                                }}
                                            >
                                                <Typography component='h6' variant='h6' sx={{textDecoration: 'underline'}}>{comment.user}</Typography>
                                                <Typography component='h5' variant='h6'>{comment.comment}</Typography>
                                                <Typography component='h7'>{moment(comment.time).utcOffset(-14).format('h:mm:ss a MM/DD/YYYY')}</Typography>
                                            </Paper>
                                        )

                                    }) : 
                                    <Paper
                                        sx={{
                                            p: 3,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            minHeight: 200,
                                            marginBottom: 3,
                                        }}
                                    >
                                        No comments. Be the first to comment in this club!
                                    </Paper>
                                }
                                    {/* Submit comment */}
                                
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        bottom: 0,
                                        minHeight: 30,
                                    }}
                                >
                                    <TextField placeholder='Enter Comment' variant='outlined' fullWidth multiline rows={2} onChange={(newValue) => setComment(newValue.target.value)} />
                                    <Button variant="contained" sx={{ marginTop: 2 }} onClick={postComment}>Submit</Button>
                                </Paper>
                            </Paper>
                        </Grid>
                        {/* Create Club Button */}
                        {/* <Button variant="contained" sx={{ marginTop: 3, marginLeft: 3 }} onClick={uploadData}>Create Club</Button> */}
                        {/* <TextField placeholder='Enter Comment' variant='outlined' fullWidth multiline rows={4} ref={inputRef} onChange={onChangeTextValue} /> */}
                    </Grid>

                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}