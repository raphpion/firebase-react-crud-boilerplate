import './App.css';
import { useState } from 'react';
import { auth } from './firebaseConfig';
import { deleteAccount, login, logout, register } from './controller/user.controller';

function App() {
  const [user, setUser] = useState(auth.currentUser);

  const [formAction, setFormAction] = useState('login');
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

  const handleClickDeleteAccount = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm("WARNING: Are you sure you wish to delete your account?\nThis action is irreversible.");
    if (!confirmed) return;
    await deleteAccount();
  }

  return <div className="App">
    {user
      ? <>
        <h1>Welcome!</h1>
        <p>{user.email}</p>
        <p><button onClick={handleClickLogout}>Logout</button></p>
        <p><button onClick={handleClickDeleteAccount}>Delete account</button></p>
      </>
      : <>
        <h1>{formAction === 'login' ? 'Login' : 'Register'}</h1>
        <p><label htmlFor="action">I want to</label><select id="action" value={formAction} onChange={(event) => setFormAction(event.target.value)}>
          <option value="login">Login to an existing account</option>
          <option value="register">Create an account</option>
        </select></p>
        <p><label htmlFor="email">Email</label><input id="email" type="email" onChange={(event) => setFormEmail(event.target.value)} /></p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type={showPassword ? "text" : "password"} onChange={(event) => setFormPassword(event.target.value)} />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
        </p>
        {formAction === 'register'
          ? <>
            <p>
              <label htmlFor="first-name">First name</label>
              <input id="first-name" type="text" onChange={(event) => setFormFirstName(event.target.value)} />
            </p>
            <p>
              <label htmlFor="last-name">Last name</label>
              <input id="last-name" type="text" onChange={(event) => setFormLastName(event.target.value)} />
            </p>
            <p><button disabled={!(formFirstName && formLastName && formEmail && formPassword)} onClick={handleClickRegister}>Register</button></p>
          </>
          : <p><button onClick={handleClickLogin}>Login</button></p>}
      </>
    }
  </div>;
}

export default App;
