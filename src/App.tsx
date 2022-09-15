import { useEffect } from 'react';
import { auth } from './firebaseConfig';
import { createUser, getUserById, login, logout } from './controllers/user.controller';
import { useAppDispatch, useAppSelector } from './hooks';
import { setUser } from './slices/user.slice';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import './App.css';
import Avatar from './components/Avatar';
import Container from '@mui/material/Container';

const App: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userTemp = await login();
    if (userTemp) return;
    const newUser = await createUser();
    dispatch(setUser(newUser));
    navigate('/profile');
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser === null) {
        dispatch(setUser(null));
        return;
      }
      const appUser = await getUserById(authUser.uid);
      dispatch(setUser(appUser));
    });
  }, [dispatch]);


  return <div className="App">
    <Container>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        {user
          ? <>
            <li>
              <NavLink to="/profile">
                <Avatar size={32} />
                {user.displayName}
              </NavLink>
            </li>
            <li><Link to="#" onClick={logout}>Logout</Link></li>
          </>
          : <li><Link to="#" onClick={handleLogin}>Login</Link></li>}
      </ul>
    </Container>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>;
}

export default App;
