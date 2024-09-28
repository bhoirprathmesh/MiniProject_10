import React from 'react';
import { NavLink } from 'react-router-dom';

function Error() {
  return (
    <>
      <section id="error-page" className="error-page">
        <div className="content">
          <h2 className="header animated-404">404</h2>
          <h4 className="fade-in">Sorry! Page not found</h4>
          <p className="fade-in">
            Oops! It seems like the page you're trying to access doesn't exist.
            If you believe there's an issue, feel free to report it, and we'll
            look into it.
          </p>
          <div className="btns">
            <NavLink to="/" className="btn btn-return">return home</NavLink>
            <NavLink to="/contactus" className="btn btn-report">report problem</NavLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error;
