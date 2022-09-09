import './App.css';
import { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { deleteAccount, getUserById, login, logout, register, updateUser, updateUserEmail } from './controller/user.controller';
import User from './models/user.model';

/**
 * todo (raphpion) User Read/Update broke the login flow
 * 
 * Todo (raphpion) Fix this warning:
 * 
 * `react-dom.development.js:86 Warning: A component is changing an uncontrolled input to be controlled. This is likely caused
 * by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or 
 * uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components`
 */
function App() {
  const [user, setUser] = useState<User | null>(null);

  const [formAction, setFormAction] = useState('login');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      const userTemp = authUser ? await getUserById(authUser.uid) : null;
      setUser(userTemp);
      setFormEmail(userTemp ? userTemp.email : '');
      setFormPassword('');
      setFormFirstName(userTemp ? userTemp.firstName : '');
      setFormLastName(userTemp ? userTemp.lastName : '');
    });
  }, []);


  const handleClickRegister = async () => {
    await register(formEmail, formPassword, formFirstName, formLastName);
  };

  const handleClickLogin = async () => {
    await login(formEmail, formPassword);
  };

  const handleClickLogout = async () => {
    await logout();
  };

  const handleClickUpdateEmail = async () => {
    if (!user) return;
    const updatedUser = await updateUserEmail(formEmail);
    setUser(updatedUser);
  };

  const handleClickUpdateName = async () => {
    if (!user) return;
    const updatedUser = await updateUser(user.id, { firstName: formFirstName, lastName: formLastName });
    setUser(updatedUser);
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
        <h1>Welcome, {user.firstName}!</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" onChange={(event) => setFormEmail(event.target.value)} />
          <button type="button" onClick={handleClickUpdateEmail}>Update</button>
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type={showPassword ? "text" : "password"} onChange={(event) => setFormPassword(event.target.value)} />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
        </p>
        <p>
          <label htmlFor="first-name">First name</label>
          <input value={formFirstName} id="first-name" type="text" onChange={(event) => setFormFirstName(event.target.value)} />
          <label htmlFor="last-name">Last name</label>
          <input value={formLastName} id="last-name" type="text" onChange={(event) => setFormLastName(event.target.value)} />
          <button type="button" onClick={handleClickUpdateName}>Update</button>
        </p>
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
