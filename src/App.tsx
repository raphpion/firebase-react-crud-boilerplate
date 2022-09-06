import './App.css';
import { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { login, logout, register } from './controller/user.controller';

function App() {
  const [user, setUser] = useState(auth.currentUser);

  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  auth.onAuthStateChanged((authUser) => {
    if (authUser === user) return;
    setUser(authUser);
  });

  const handleClickRegister = async () => {
    await register(formEmail, formPassword, formFirstName, formLastName);
  };

  const handleClickLogin = async () => {
    await login(formEmail, formPassword);
  }

  const handleClickLogout = async () => {
    await logout();
  }

  return <div className="App">
    {user
      ? <>
        <h1>Welcome!</h1>
        <p>{user.email}</p>
        <p><button onClick={handleClickLogout}>Logout</button></p>
      </>
      : <>
        <h1>Welcome! Please sign in.</h1>
        <p><label htmlFor="email">Email</label><input id="email" type="email" onChange={(event) => setFormEmail(event.target.value)} /></p>
        <p>
          <label htmlFor='password'>Password</label>
          <input id="password" type={showPassword ? "text" : "password"} onChange={(event) => setFormPassword(event.target.value)} />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
        </p>
        <p><button onClick={handleClickRegister}>Register</button><button onClick={handleClickLogin}>Login</button></p>
      </>
    }
  </div>;
}

export default App;
