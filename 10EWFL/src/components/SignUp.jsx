import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="bg-white shadow-lg rounded p-4 w-100 mt-5 mb-5" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-1 fw-bold" style={{ color: '#28a745' }}>Welcome to ESeva</h2>
        <p className="text-dark text-center text-muted mb-4">Please enter your details to register</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
          <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
          <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
          <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
          <label>Password</label>
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
          <label>Confirm Password</label>
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="showPassword"
              checked={formData.showPassword}
              onChange={() => setFormData({ ...formData, showPassword: !formData.showPassword })}
              className="form-check-input"
            />
            <label className="form-check-label text-muted">
              Show Password
            </label>
          </div>
          <button type="submit" className="btn w-100 fw-bold b btn-success " style={{ backgroundColor: '#28a745', color: 'white' }}>
            Sign Up
          </button>
          <p className="text-center text-muted mt-3">
            Already have an account? <Link to="/SignIn" style={{ color: '#28a745' }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
