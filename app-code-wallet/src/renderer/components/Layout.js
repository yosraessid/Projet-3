import React from 'react';
import { ThemeProvider, CssBaseline, Box, AppBar, Toolbar, Typography, IconButton, Switch } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = {
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                Code Wallet
              </Typography>
              <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Toolbar>
          </AppBar>
          
          <Box component="nav" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Link to="/fragments" style={{ textDecoration: 'none', color: 'inherit', marginRight: '1rem' }}>
              Fragments
            </Link>
            <Link to="/tags" style={{ textDecoration: 'none', color: 'inherit', marginRight: '1rem' }}>
              Tags
            </Link>
            <Link to="/new" style={{ textDecoration: 'none', color: 'inherit', marginRight: '1rem' }}>
              New
            </Link>
            <Link to="/info" style={{ textDecoration: 'none', color: 'inherit' }}>
              Info
            </Link>
          </Box>

          <Box component="main" sx={{ flex: 1, p: 3 }}>
            {children}
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default Layout;
