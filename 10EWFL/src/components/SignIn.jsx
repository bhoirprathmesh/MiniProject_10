import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;
  
    setUser({
      ...user,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`http://localhost:4000/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("Response from server", res_data.extraDetails);
      
      if(response.ok){
        //stored the token in the localstoreage
        storeTokenInLS(res_data.token);
        // localStorage.setItem("token", res_data.token);
        setUser({ email: "", password: "" });
        navigate("/");
        toast.success("Login Successful !");
      }else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log("Invalid Credentials");
      }

      console.log(response);
    }catch (error) {
      console.log("login", error);
    }
    
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="bg-white shadow-lg rounded p-4 w-100" style={{ maxWidth: '500px' }}>
        <h2 className="text-center fw-bold" style={{ color: '#28a745' }}>Welcome back</h2>
        <p className="text-center text-muted mb-4">Please enter your details</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              id="email"
              className="form-control"
              value={user.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              name='password'
              placeholder="password"
              id="password"
              className="form-control"
              value={user.password}
              onChange={handleInput}
              required
            />
          </div>
          {/* <div className="form-check mb-3">
            <input
              type="checkbox"
              id="remember"
              className="form-check-input"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember" className="form-check-label">Remember Password</label>
          </div> */}
          <button type="submit" className="btn w-100 fw-bold b btn-success" >
            Sign In
          </button>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register" style={{ color: '#28a745' }}>Sign Up</Link>
          </p>
          <p className="text-center mt-2">
            <a href="#" style={{ color: '#28a745' }}>Forgot password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
