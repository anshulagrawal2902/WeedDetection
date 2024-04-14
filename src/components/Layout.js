import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WeedLogo from "../weed.avif";
import MainApp from './MainApp';


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/anshulagrawal2902/WeedDetection">
                {'Anshul Agrawal and Sahil Kamdar'}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50', // Green color for nature
      },
      secondary: {
        main: '#2196F3', // Blue color for technology/science
      },
      background: {
        default: '#F5F5F5', // Light gray background
      },
      text: {
        primary: '#333333', // Dark text color
        secondary: '#666666', // Lighter secondary text color
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h1: {
        fontSize: '1.5rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: '#333333',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        color: '#333333',
      },
    },
  });


export default function Layout() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: "100vh", flexDirection: "column", display: "flex" }}>
                <AppBar position="relative" component="header">
                    <Toolbar>
                        {/* <CameraIcon sx={{ mr: 2 }} /> */}
                        <img src={WeedLogo} alt="Custom Icon" style={{ width: '60px', height: '60px', marginRight: '10px' }} />
                        <Typography component="h1" variant="h6" color="inherit" noWrap>
                            Weed Detector Demo
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{ p: 6, flex: "1", display: "flex", flexDirection: "column", justifyContent: "center" }} component="main" >
                    <MainApp />
                </Box>
                <Box sx={{ p: 6 }} component="footer">
                    <Typography variant="h6" align="center" gutterBottom>
                        Weed Detector Demo
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        component="p">
                    </Typography>
                    <Copyright />
                </Box>
            </Box >
        </ThemeProvider >
    );
}
