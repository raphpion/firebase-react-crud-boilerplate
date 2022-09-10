import './App.css';
import { useEffect } from 'react';
import { auth } from './firebaseConfig';
import { getUserById } from './controllers/user.controller';
import { useAppDispatch, useAppSelector } from './hooks';
import { setUser } from './slices/user.slice';
import { NavLink, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

const App: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

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
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li>{user ? <NavLink to="/profile">Profile</NavLink>
        : <NavLink to="/login">Login</NavLink>}</li>
    </ul>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>;
}

export default App;
