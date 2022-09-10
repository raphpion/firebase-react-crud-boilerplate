import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../controllers/user.controller";
import { useAppSelector } from "../hooks";

const Login: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) return navigate('/');
  }, [user, navigate]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(inputEmail, inputPassword);
  };

  return (<>
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={inputEmail} onChange={(event) => setInputEmail(event.target.value)} />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input id="password" type={showPassword ? "text" : "password"} value={inputPassword} onChange={(event) => setInputPassword(event.target.value)} />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
      </p>
      <p><button type="submit">Login</button></p>
      <p>Don't have an account? <Link to="/register">Register</Link>.</p>
    </form>
  </>)
};

export default Login;