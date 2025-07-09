import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import pickuplogo from "../assets/Schedule-pickup.png";
import aboutlogo from "../assets/revolution-e-waste.webp";
import Analytics from "./Analytics";
import "react-toastify/dist/ReactToastify.css";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import emailjs from "emailjs-com";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  // Contact
  const defaultContactFormData = {
    username: "",
    email: "",
    phone: "",
    message: "",
  };

  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUSerData] = useState(true);

  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      phone: user.phone,
      message: "",
    });

    setUSerData(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendMsg = (e) => {
    e.preventDefault();
    const templateParams = { ...contact };

    emailjs
      .send(
        import.meta.env.REACT_APP_EMAIL_SERVICE,
        import.meta.env.REACT_APP_EMAIL_TEMPLATE,
        templateParams,
        import.meta.env.REACT_APP_EMAIL_USER_ID
      )
      .then((result) => {
        setContact({
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
    <div className="bg-light text-dark py-5">
      <div className="container mt-5 mb-5">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-md-6 mb-4">
            <p className="text-success mb-1 fw-bold fs-4">Welcome to ESeva</p>
            <h1 className="display-5 font-weight-bold">
              Your trusted partner for smart,
              <br />
              e-waste recycling solutions.
              <br />
              <span className="text-success fw-bold">
                E-Waste Facility Locator
              </span>
            </h1>
            <p className="mt-4">
              <span className="text-success fw-bold">ESeva:</span> Your pathway
              to a cleaner, greener future.
            </p>
            <div className="mt-4">
              <button className="btn btn-success mr-3 fw-bold b">
                START RECYCLING
              </button>
              <button className="btn btn-success ms-3 fw-bold b">
                LOCATE FACILITY
              </button>
            </div>
          </div>
          {/* Image Section */}
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src={pickuplogo} // Replace with the actual path to your image
              alt="Team working"
              className="maxWidth: 80% maxHeight: 80%"
            />
          </div>
        </div>
      </div>

      <section className="about-us bg-white py-5">
        <Container className="mt-5 mb-5">
          <Row>
            <h2 className="text-center text-success fw-bold">
              -About ELocate-
            </h2>
            <h2 className="text-center font-weight-bold">
              Revolutionizing E-Waste Locator and Management
            </h2>
            <Col md={6} className="d-flex align-items-center">
              <div>
                <p className="fw-bold">
                  In India, the improper disposal of e-waste contributes to the
                  alarming annual collection of 1.71 million metric tons.
                  Locating trustworthy e-waste collection facilities remains a
                  significant challenge, intensifying this environmental issue.
                </p>
                <p className="fw-bold">
                  The ELocate Web Platform is conceived to directly address this
                  issue. Our platform offers a dynamic, user-friendly interface
                  for individuals and businesses seeking reliable e-waste
                  collection facilities.
                </p>
                <div className="d-flex mt-3">
                  <Button className="btn btn-success mr-2 fw-bold b">
                    CONTACT US
                  </Button>
                  <Button className="btn btn-success ms-3 fw-bold b">
                    RECYCLING SERVICES
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <img
                src={aboutlogo}
                alt="E-Waste Management"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <Analytics />

      <div className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="feature-box animate-box">
              <div className="feature-number">01</div>
              <h3>Comprehensive E-Waste Collection</h3>
              <p>
                A network of reliable and certified e-waste collection
                facilities to ensure responsible disposal.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-box animate-box">
              <div className="feature-number">02</div>
              <h3>Educational Resources</h3>
              <p>
                Detailed information about e-waste and collection facilities to
                empower users with knowledge.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-box animate-box">
              <div className="feature-number">03</div>
              <h3>User-Friendly Interface</h3>
              <p>
                A dynamic and easy-to-use platform for individuals and
                businesses seeking e-waste solutions.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-box animate-box">
              <div className="feature-number">04</div>
              <h3>Interactive Chatbot</h3>
              <p>
                An intelligent chatbot for immediate access to FAQs and
                educational resources, fostering awareness.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-box animate-box">
              <div className="feature-number">05</div>
              <h3>Streamlined Booking System</h3>
              <p>
                Efficient booking system with a credit mechanism to encourage
                responsible disposal practices.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-box animate-box">
              <div className="feature-number">06</div>
              <h3>Facility Management Dashboard</h3>
              <p>
                Comprehensive dashboard for facility owners to manage bookings
                and credits seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="container py-5">
        <div className="text-center">
          <h2 className=" fw-bold" style={{ color: "#28a745" }}>
            {" "}
            - Contact Us -{" "}
          </h2>
          <hr />
          <p className="lead fw-bold">
            Have questions or inquiries? Get in touch with us!
          </p>
        </div>

        <div className="row mt-5">
          {/* Left Image Section */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src={pickuplogo}
              alt="Contact Us"
              className="img-fluid shadow-lg"
              style={{ borderRadius: "10px" }}
            />
          </div>

          {/* Right Contact Form Section */}
          <div className="col-md-6">
            <div className="card shadow-lg p-4">
              <h3
                className="text-center mb-4 fw-bold"
                style={{ color: "#28a745" }}
              >
                Send us a Message
              </h3>
              <form onSubmit={sendMsg}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="username"
                    placeholder="Username"
                    className="form-control"
                    value={contact.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={contact.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    className="form-control"
                    value={contact.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter Your Message..."
                    rows={4}
                    className="form-control"
                    value={contact.message}
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
              <p className="mb-2">
                <FaMapMarkerAlt /> Vasai, Mumbai, Maharashtra, 401202
              </p>
              <p className="mb-2">
                <FaPhone /> +911234567890
              </p>
              <p className="mb-2">
                <FaEnvelope /> contact@eseva.com
              </p>
              <hr />
              <div className="d-flex">
                <a href="#" className="text-dark mr-3">
                  <FaLinkedin size={36} />
                </a>
                <a href="#" className="text-dark mr-3 ms-3">
                  <FaInstagram size={36} />
                </a>
                <a href="#" className="text-dark mr-3 ms-3">
                  <FaTwitter size={36} />
                </a>
                <a href="#" className="text-dark mr-3 ms-3">
                  <FaWhatsapp size={36} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
