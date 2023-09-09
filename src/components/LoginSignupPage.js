import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ForgotPassword from './ForgotPassword';
import './Login.css';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Perform login logic
        const response = await axios.post('http://localhost:5000/auth/login', {
          email,
          password,
        });
        const responseData = response.data;

        if (responseData.message === 'Login success') {
          // Handle successful login
          alert('Logged in successfully');

          // Redirect to the "allexcercisepage" after successful login
          navigate('/allexcercisepage');
        } else {
          alert('Login failed: ' + responseData.message);
        }
      } else {
        // Perform signup logic
        const response = await axios.post('http://localhost:5000/auth/register', {
          email,
          password,
          username, // Add username to the signup data
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
          {isLogin || (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
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
       
        <div className="google-icon">
  <i className="fab fa-google"></i> <strong>Sign in with Google</strong>
</div>

        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default LoginSignupPage;
