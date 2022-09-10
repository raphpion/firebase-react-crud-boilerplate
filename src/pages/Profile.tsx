import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount, logout, updateUser, updateUserEmail, updateUserPassword } from "../controllers/user.controller";
import { useAppDispatch, useAppSelector } from "../hooks"
import { setUser } from "../slices/user.slice";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');

  useEffect(() => {
    if (!user) return navigate('/');
    setInputEmail(user.email);
    setInputFirstName(user.firstName);
    setInputLastName(user.lastName);
  }, [user, navigate]);

  const handleDeleteAccount = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm("WARNING: Are you sure you wish to delete your account?\nThis action is irreversible.");
    if (!confirmed) return;
    await deleteAccount();
    dispatch(setUser(null));
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleUpdateEmail = async () => {
    if (!user) throw new Error('User is not found!');
    const updatedUser = await updateUserEmail(inputEmail);
    dispatch(setUser(updatedUser));
  };

  const handleUpdatePassword = async () => {
    if (!user) throw new Error('User is not found!');
    if (!inputPassword) throw new Error('No password was input!');
    await updateUserPassword(inputPassword);
  };

  const handleUpdateName = async () => {
    if (!user) throw new Error('User is not found!');
    if (!inputFirstName || !inputLastName) return;
    await updateUser(user.id, { firstName: inputFirstName, lastName: inputLastName });
  };

  return (<>
    <h1>Your Profile</h1>
    <p>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={inputEmail} onChange={(event) => setInputEmail(event.target.value)} />
      <button type="button" onClick={handleUpdateEmail}>Update</button>
    </p>
    <p>
      <label htmlFor="password">Password</label>
      <input id="password" type={showPassword ? "text" : "password"} value={inputPassword} onChange={(event) => setInputPassword(event.target.value)} />
      <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
      <button type="button" onClick={handleUpdatePassword}>Update</button>
    </p>
    <p>
      <label htmlFor="first-name">First name</label>
      <input value={inputFirstName} id="first-name" type="text" onChange={(event) => setInputFirstName(event.target.value)} />
      <label htmlFor="last-name">Last name</label>
      <input value={inputLastName} id="last-name" type="text" onChange={(event) => setInputLastName(event.target.value)} />
      <button type="button" onClick={handleUpdateName}>Update</button>
    </p>
    <p><button onClick={handleLogout}>Logout</button></p>
    <p><button onClick={handleDeleteAccount}>Delete account</button></p>
  </>);
}

export default Profile;