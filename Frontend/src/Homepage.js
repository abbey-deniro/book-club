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
import { useState } from 'react';
import Button from '@mui/material/Button';
import './Calender.css';
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
  const [value, onChange] = useState(new Date());
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  

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
                <Typography component="h1" variant="h4">
                  Welcome, "User.name"
                </Typography>
                {/* Book club stack */}
                <Stack spacing={2} direction="column" alignContent={'stretch'} justifyContent='space-evenly' paddingTop={'1rem'}>
                  <Button variant="contained" href="" color="secondary" style={{ justifyContent: "flex-start", textTransform: "none" }}>Club Name: Book Title</Button>
                  <Button variant="contained" href="" color="secondary" style={{ justifyContent: "flex-start", textTransform: "none" }}>Club Name: Book Title</Button>
                  <Button variant="contained" href="" color="secondary" style={{ justifyContent: "flex-start", textTransform: "none" }}>Club Name: Book Title</Button>
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
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={1} direction="row" justifyContent='space-evenly' >
                  <Button variant="contained" href="" color="primary" style={{ textTransform: "none", width: "30rem", letterSpacing: "2px" }}>Join New Club</Button>
                  <Button variant="contained" href="" color="primary" style={{ textTransform: "none", width: "30rem", letterSpacing: "2px" }}>Create New Club</Button>
                </Stack>
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