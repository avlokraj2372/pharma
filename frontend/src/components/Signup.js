import React, { useState } from 'react';
import "../styles/signup.css";

const Signup = () => {
  // Form state for all input fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, username, password, confirmPassword } = formData;

    // Basic validation (this part stays in the frontend to improve user experience)
    if (!fullName || !email || !username || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Send data to backend API
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);
        setErrorMessage('');
        setFormData({
          fullName: '',
          email: '',
          username: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        setErrorMessage(result.message || 'Signup failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred while signing up.');
      console.log(error);
      
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Choose a username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter a password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
