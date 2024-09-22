import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pickuplogo from '../assets/Schedule-pickup.png';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
// import emailjs from "emailjs-com";
import { Link } from "react-router-dom"; // Use React Router for navigation

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendMsg = (e) => {
    e.preventDefault();
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    emailjs
      .send(
        "service_jqn5flv",
        "template_cnom5kj",
        templateParams,
        "ddYcz13MvW01UFF5u"
      )
      .then((result) => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        toast.success("Message Sent Successfully");
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="container py-5">
        <div className="text-center">
          <h2 className=" fw-bold" style={{ color: "#28a745" }}> - Contact Us - </h2>
          <hr/>
          <p className="lead fw-bold">Have questions or inquiries? Get in touch with us!</p>
        </div>

        <div className="row mt-5">
          {/* Left Image Section */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src={pickuplogo}
              alt="Contact Us"
              className="img-fluid shadow-lg"
              style={{ borderRadius: '10px' }}
            />
          </div>

          {/* Right Contact Form Section */}
          <div className="col-md-6">
            <div className="card shadow-lg p-4">
              <h3 className="text-center mb-4 fw-bold" style={{ color: "#28a745" }}>Send us a Message</h3>
              <form onSubmit={sendMsg}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">Username</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Username"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter Your Message..."
                    rows={4}
                    className="form-control"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: "#28a745", color: "white" }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Info Section Below */}
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card shadow-lg p-4">
              <h3 style={{ color: "#28a745" }}>Contact Information</h3>
              <p className="mb-2"><FaMapMarkerAlt /> Vasai, Mumbai, Maharashtra, 401202</p>
              <p className="mb-2"><FaPhone /> +911234567890</p>
              <p className="mb-2"><FaEnvelope /> contact@eseva.com</p>
              <hr />
              <div className="d-flex">
                <a href="#" className="text-dark mr-3"><FaLinkedin size={36} /></a>
                <a href="#" className="text-dark mr-3 ms-3"><FaInstagram size={36} /></a>
                <a href="#" className="text-dark mr-3 ms-3"><FaTwitter size={36} /></a>
                <a href="#" className="text-dark mr-3 ms-3"><FaWhatsapp size={36} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
