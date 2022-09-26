import { useMemo, useState } from 'react';
import { auth } from './firebaseConfig';
import { createUser, getUserById } from './controllers/user.controller';
import { useAppDispatch } from './hooks';
import { setUser } from './slices/user.slice';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import { CssBaseline, ThemeProvider, Typography, useMediaQuery } from '@mui/material';
import { getDefaultTheme } from './theme/default.theme';
import Navbar from './components/Navbar';
import './theme/default.style.css';
import FireplaceIcon from '@mui/icons-material/Fireplace';

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => getDefaultTheme(prefersDarkMode ? 'dark' : 'light'), [prefersDarkMode]);
  const dispatch = useAppDispatch();

  const [showSplashPage, setShowSplashPage] = useState(true);
  const [hideSplashPage, setHideSplashPage] = useState(false);

  auth.onAuthStateChanged(async (authUser) => {
    if (authUser) {
      let appUser = await getUserById(authUser.uid);
      if (!appUser) appUser = await createUser(authUser);
      dispatch(setUser(appUser));
    } else dispatch(setUser(null));
    setShowSplashPage(false);
    setTimeout(() => { setHideSplashPage(true) }, 500);
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`splash-page${(!showSplashPage && !hideSplashPage) ? ' fade-out' : ''}${hideSplashPage ? ' hide' : ''}`}>
        <FireplaceIcon sx={{ width: 90, height: 90 }} />
        <Typography
          variant="h3"
          noWrap
          component="h3"
          sx={{
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.15rem',
            color: 'inherit',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          BOILERPLATE
        </Typography>
      </div>
      {!showSplashPage && <div className="App">
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>}
    </ThemeProvider>);
}

export default App;
