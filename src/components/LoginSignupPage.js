import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ForgotPassword from './ForgotPassword';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Perform login logic
        const response = await axios.post('http://localhost:5000/auth/Login', {
          email,
          password,
        });
        const responseData = response.data;

        if (responseData.message === 'login success') {
          // Handle successful login
          alert('Logged in successfully');
        } else {
          alert('Login failed: ' + responseData.message);
        }
      } else {
        // Perform signup logic
        const response = await axios.post('http://localhost:5000/auth/Register', {
          email,
          password,
        });
        const responseData = response.data;

        if (responseData.message === 'Successfully registered') {
          // Handle successful signup
          alert('Registered successfully');
        } else {
          alert('Registration failed: ' + responseData.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="login-signup-container">
      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
        </p>
        <Link to="/forgot-password">Forgot Password?</Link>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default LoginSignupPage;