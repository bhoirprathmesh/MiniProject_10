import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import pickuplogo from '../assets/Schedule-pickup.png';
import aboutlogo from '../assets/revolution-e-waste.webp';

const Home = () => {
  return (
    <div className="bg-light text-dark py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-md-6 mb-4">
            <p className="text-success mb-1 fw-bold fs-4">Welcome to ESeva</p>
            <h1 className="display-5 font-weight-bold">
              Your trusted partner for smart,
              <br />
              e-waste recycling solutions.
              <br />
              <span className="text-success fw-bold">E-Waste Facility Locator</span>
            </h1>
            <p className="mt-4">
              <span className="text-success fw-bold">ESeva:</span> Your pathway to a cleaner, greener future.
            </p>
            <div className="mt-4">
              <button className="btn btn-success mr-3 fw-bold b">START RECYCLING</button>
              <button className="btn btn-success ms-3 fw-bold b">LOCATE FACILITY</button>
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
          <Container>
            <Row>
              <h4 className="text-center text-success fw-bold">-About ELocate-</h4>
              <h2 className="text-center font-weight-bold">Revolutionizing E-Waste Locator and Management</h2>
              <Col md={6} className="d-flex align-items-center">
                <div>
                  <p className='fw-bold'>
                    In India, the improper disposal of e-waste contributes to the alarming annual collection of 1.71 million metric tons. Locating trustworthy e-waste collection facilities remains a significant challenge, intensifying this environmental issue.
                  </p>
                  <p className='fw-bold'>
                    The ELocate Web Platform is conceived to directly address this issue. Our platform offers a dynamic, user-friendly interface for individuals and businesses seeking reliable e-waste collection facilities.
                  </p>
                  <div className="d-flex mt-3">
                    <Button className="btn btn-success mr-2 fw-bold b">CONTACT US</Button>
                    <Button className='btn btn-success ms-3 fw-bold b'>RECYCLING SERVICES</Button>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <img src={aboutlogo} alt="E-Waste Management" className="img-fluid" />
              </Col>
            </Row>
          </Container>
        </section>
    </div>
  );
};

export default Home;
