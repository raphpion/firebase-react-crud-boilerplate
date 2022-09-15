import { useEffect, useMemo } from 'react';
import { auth } from './firebaseConfig';
import { createUser, getUserById } from './controllers/user.controller';
import { useAppDispatch } from './hooks';
import { setUser } from './slices/user.slice';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { getDefaultTheme } from './theme/default.theme';
import Navbar from './components/Navbar';
import './theme/default.style.css';

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => getDefaultTheme(prefersDarkMode ? 'dark' : 'light'), [prefersDarkMode]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        dispatch(setUser(null));
        return;
      }
      let appUser = await getUserById(authUser.uid);
      if (!appUser) {
        appUser = await createUser(authUser);
      }
      dispatch(setUser(appUser));
    });
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </ThemeProvider>);
}

export default App;
