import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom'

function Header() {
  const [locations, setLocation] = useState('');

  useEffect(() => {
    document.documentElement.classList.remove('no-js');

    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1Ijoic2h1ZW5jZSIsImEiOiJjbG9wcmt3czMwYnZsMmtvNnpmNTRqdnl6In0.vLBhYMBZBl2kaOh1Fh44Bw`)
            .then(response => response.json())
            .then(data => {
              const cityFeature = data.features.find((context) => context.place_type.includes('place'));
              const stateFeature = data.features.find((context) => context.place_type.includes('region'));
              const city = cityFeature ? cityFeature.text : '';
              const state = stateFeature ? stateFeature.text : '';
              setLocation(city && state ? `${city}, ${state}` : 'Location not found');
            })
            .catch(error => {
              console.error('Error:', error);
              setLocation('Unable to retrieve location');
            });
        },
        (error) => {
          console.error(error);
          setLocation('Geolocation not enabled');
        },
        options
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocation('Geolocation not supported');
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-lightgreen shadow bottom-shadow bg-white px-lg-3 py-lg-2 shadow-sm sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand me-5 fw-bold fs-2 h-font" href="/">E<span className='text-success'>Seva</span></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon shadow-none"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={({isActive}) => 
                  `nav-link me-2 fs-5 a ${isActive ? "text-success fw-bold" : "text-body" }`
                }>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/aboutus" className={({isActive}) => 
                    `nav-link me-2 fs-5 a ${isActive ? "text-success fw-bold" : "text-body" }`
                  }>About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/e-facilities" className={({isActive}) => 
                    `nav-link me-2 fs-5 a ${isActive ? "text-success fw-bold" : "text-body" }`
                  }>E-Facilities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/recycle" className={({isActive}) => 
                    `nav-link me-2 fs-5 a ${isActive ? "text-success fw-bold" : "text-body" }`
                  }>Recycle
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/store" className={({isActive}) => 
                    `nav-link me-2 fs-5 a ${isActive ? "text-success fw-bold" : "text-body" }`
                  }>Store
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/education" className={({isActive}) => 
                    `nav-link me-2 fs-5 a ${isActive ? "text-success fw-bold" : "text-body" }`
                  }>Education
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contactus" className={({isActive}) => 
                    `nav-link me-2 fs-5 a ${isActive ? "text-success fw-bold" : "text-body" }`
                  }>Contactus
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/rules" className={({isActive}) => 
                    `nav-link me-2 fs-5 a ${isActive ? "text-success fw-bold" : "text-body" }`
                  }>Rules
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/dashboard" className={({isActive}) => 
                    `nav-link me-2 fs-5 a ${isActive ? "text-success fw-bold" : "text-body" }`
                  }>Dashboard
              </NavLink>
            </li>
          </ul>
          <h5 className="font-montserrat font-bold text-xl ml-12 me-auto md:ml-4 md:text-2xl text-emerald-600 d-flex align-items-center gap-2 text-success">
            <FaMapMarkerAlt />
            {locations || 'Loading...'}
          </h5>
          <div className="d-flex">
            <Link to="/SignIn" className="btn btn-outline-dark shadow-none me-lg-3 me-2 text-success d fw-bold">SIGNIN</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
