import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-5 pb-4 bg-lightgreen shadow bottom-shadow">
      <div className="container">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-4 mb-4">
            <h2 className="h5 fw-bold fs-3">E<span className='text-success'>Seva</span></h2>
            <p className="mb-4">
              Transforming E-Waste Management. Find E-waste facilities effortlessly with our platform. Your key to responsible recycling and sustainability.
            </p>
            {/* <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-success" type="button">
                  <FaMapMarkerAlt />
                </button>
              </div>
            </div> */}
          </div>

          {/* Middle Left Section */}
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold fs-4">Our Services</h5>
            <ul className="list-unstyled">
              <li>Smartphone Recycle</li>
              <li>Laptop Recycle</li>
              <li>Accessories Recycle</li>
              <li>Television Recycle</li>
              <li>Refrigerator Recycle</li>
              <li>Washing Machine Recycle</li>
            </ul>
          </div>

          {/* Middle Right Section */}
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold fs-4">Company</h5>
            <ul className="list-unstyled">
              <li>About us</li>
              <li>Education</li>
              <li>E-waste Facilities</li>
              <li>Latest News</li>
              <li>Contact Us</li>
              <li>Our Blog</li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold fs-4">Contact Us</h5>
            <p className="mb-2"><FaMapMarkerAlt /> Vasai, Mumbai, Maharashtra, 401202</p>
            <p className="mb-2"><FaPhone /> +911234567890</p>
            <p className="mb-2"><FaEnvelope /> contact@eseva.com</p>
            <div className="d-flex">
              <a href="#" className="text-dark mr-3"><FaLinkedin size={24} /></a>
              <a href="#" className="text-dark mr-3 ms-3"><FaInstagram size={24} /></a>
              <a href="#" className="text-dark mr-3 ms-3"><FaTwitter size={24} /></a>
              <a href="#" className="text-dark mr-3 ms-3"><FaWhatsapp size={24} /></a>
            </div>
          </div>
        </div>
{/*         
        <hr />
        
        <div className="row text-center">
          <div className="col-md-12">
            <h6 className="mb-0">
            Designed by Paras Adkurkar, Prathmesh Bhoir, Abhishek Barote
            </h6>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
