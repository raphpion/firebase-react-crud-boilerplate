import './App.css';
import { useEffect } from 'react';
import { auth } from './firebaseConfig';
import { createUser, getUserById, login, logout } from './controllers/user.controller';
import { useAppDispatch, useAppSelector } from './hooks';
import { setUser } from './slices/user.slice';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

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
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      {user
        ? <>
          <li>
            <NavLink to="/profile">
              {user.photoURL && <img referrerPolicy="no-referrer" src={user.photoURL} alt="avatar" />}
              {user.displayName}
            </NavLink>
          </li>
          <li><button type="button" onClick={logout}>Logout</button></li>
        </>
        : <li><button type="button" onClick={handleLogin}>Login</button></li>}
    </ul>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>;
}

export default App;
