import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Calendar from 'react-calendar';
import Stack from '@mui/material/Stack';
// import useState from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './Calender.css';
import axios from 'axios';
// import { mainListItems, secondaryListItems } from './listItems';


const drawerWidth = 240;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  height: '3rem',
}));


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
  let user = JSON.parse(localStorage.getItem('user'))
  const [value, onChange] = useState(new Date());
  const [open, setOpen] = React.useState(true);
  const [clubs, setClubs] = useState({})

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    //console.log(user)
    axios.get(`https://0io5c6icc0.execute-api.us-west-2.amazonaws.com/bookclub/user/clubs`,
      {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res)
        setClubs(res.data)
      })
      .catch(e => console.log(e));

  }, []);

  console.log(clubs[0])


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex', mt: 3 }}>
        <CssBaseline />
        {/* Background */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9} >
              {/* Welcome/ Book clubs */}
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 250,
                }}
              >
                <Typography component="h1" variant="h4" paddingBottom={ '2rem' }>
                  Welcome, {user.username}
                </Typography>
                {/* Book club stack */}
                <Stack spacing={3} direction="column" justifyContent='space-evenly' >
                  <Button variant="contained" href="/joinClub" color="primary" style={{ textTransform: "none", letterSpacing: "2px" }}>Join New Club</Button>
                  <Button variant="contained" href="/createClub" color="primary" style={{ textTransform: "none", letterSpacing: "2px" }}>Create New Club</Button>
                </Stack>
              </Paper>
            </Grid>
            {/* Calendar */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 250,
                }}
              >
                <Calendar onChange={onChange} value={value} />
              </Paper>
            </Grid>
            {/* Buttons on row */}
            {/* <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={1} direction="row" justifyContent='space-evenly' >
                  <Button variant="contained" href="/joinClub" color="primary" style={{ textTransform: "none", width: "30rem", letterSpacing: "2px" }}>Join New Club</Button>
                  <Button variant="contained" href="/createClub" color="primary" style={{ textTransform: "none", width: "30rem", letterSpacing: "2px" }}>Create New Club</Button>
                </Stack>
              </Paper>
            </Grid> */}
          </Grid>
          <Grid>
            <Grid item xs={12}>
              {
                clubs[0] ?
                  clubs.map(club => {
                    return (
                      <Grid item xs={1}
                        // style={{
                        //   height: "400px",
                        //   width: "575px",
                        //   display: 'inline',
                        //   float: "left"
                        // }}>
                        sx={{
                          p: 2,
                          // paddingTop: "1rem",
                          maxHeight: "400px",
                          minWidth: "555px",
                          display: 'inline',
                          float: "left"
                        }}>

                        <Paper sx={{ p: 9, display: 'flex', flexDirection: 'column', margin: "20"}}>
                          <img src={club.Image} width="400px" height="400px" name="bookImage" />
                          <Button marginTop="15px" variant="contained" href={'/club/' + club._id} color="secondary" style={{ marginTop: '1rem' }}>{club.Name}: {club.BookTitle}</Button>
                        </Paper>

                      </Grid>
                    )
                  })
                  :
                  <Stack spacing={2} direction="column" alignContent={'stretch'} justifyContent='space-evenly' paddingTop={'1rem'}> No Club. Join a club!</Stack>
              }
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