import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:4000/auth/register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      // console.log(response);
      const res_data = await response.json();
      console.log("Response from server", res_data.extraDetails);
      
      if(response.ok){
        //stored the token in the localstoreage
        storeTokenInLS(res_data.token);
        // localStorage.setItem("token", res_data.token);  -->we cant you it because we need to use each and every time for that we to create the functions
        setFormData({ username: "", fullname: "", email: "", phone: "", password: "" });
        navigate("/login");
        toast.success("Registration Successful !");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }

    }catch (error) {
      console.log("register", error);
    }
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
          <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
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
          <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
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
          {/* <div className="mb-3">
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
          </div> */}
          <button type="submit" className="btn w-100 fw-bold b btn-success ">
            Sign Up
          </button>
          <p className="text-center text-muted mt-3">
            Already have an account? <Link to="/login" style={{ color: '#28a745' }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
