// src/components/auth.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography } from '@mui/material';

const Auth = ({ onLoginSuccess }) => {
  // State to toggle between login and register form
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Login API call
        const response = await axios.post('http://localhost:5000/login', {
          email: formData.email,
          password: formData.password,
        });
        // Assuming backend returns JWT token on success
        localStorage.setItem('token', response.data.token);
        onLoginSuccess();
      } else {
        // Register API call
        await axios.post('http://localhost:5000/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        // After registration, switch to login mode
        setIsLogin(true);
        setFormData({ username: '', email: '', password: '' });
        alert('Registration successful! Please login.');
      }
    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
    }
  };

  return (
    <Paper elevation={4} className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <Typography variant="h4" align="center" gutterBottom>
        {isLogin ? 'Login' : 'Register'}
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {!isLogin && (
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
          />
        )}
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
        />
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </form>
      <Typography
        variant="body2"
        align="center"
        className="mt-4 cursor-pointer text-blue-600 hover:underline"
        onClick={() => {
          setIsLogin(!isLogin);
          setError('');
          setFormData({ username: '', email: '', password: '' });
        }}
      >
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </Typography>
    </Paper>
  );
};

export default Auth;
