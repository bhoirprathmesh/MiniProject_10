import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="bg-white shadow-lg rounded p-4 w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Welcome back</h2>
        <p className="text-center text-muted mb-4">Please enter your details</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              id="remember"
              className="form-check-input"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember" className="form-check-label">Remember Password</label>
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/SignUp" className="text-primary">Sign Up</Link>
          </p>
          <p className="text-center mt-2">
            <a href="#" className="text-primary">Forgot password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
