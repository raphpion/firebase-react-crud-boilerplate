import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../controllers/user.controller";
import { useAppSelector } from "../hooks";

const Register: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) return navigate('/');
  }, [user, navigate]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (inputPassword !== inputConfirmPassword) throw new Error('Passwords do not match!');
      await register(inputEmail, inputPassword, inputFirstName, inputLastName);
    } catch (error) {
      console.log(error);
    }
  };

  return (<>
    <h1>Register</h1>
    <form onSubmit={handleRegister}>
      <p>
        <label htmlFor="first-name">First name</label>
        <input id="first-name" type="text" value={inputFirstName} onChange={(event) => setInputFirstName(event.target.value)} />
      </p>
      <p>
        <label htmlFor="last-name">Last name</label>
        <input id="last-name" type="text" value={inputLastName} onChange={(event) => setInputLastName(event.target.value)} />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={inputEmail} onChange={(event) => setInputEmail(event.target.value)} />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input id="password" type={showPassword ? "text" : "password"} value={inputPassword} onChange={(event) => setInputPassword(event.target.value)} />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
      </p>
      <p>
        <label htmlFor="confirm-password">Confirm</label>
        <input id="confirm-password" type={showPassword ? "text" : "password"} value={inputConfirmPassword} onChange={(event) => setInputConfirmPassword(event.target.value)} />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
      </p>
      <p><button type="submit">Register</button></p>
      <p>Already have an account? <Link to="/login">Login</Link>.</p>
    </form>
  </>);
};

export default Register;