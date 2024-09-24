import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import aboutlogo from '../assets/revolution-e-waste.webp';
import Analytics from './Analytics';

const AboutUs = () => {
  return (
    <section className="about-us py-5">
      <Container>
        <Row>
          <h2 className="text-center text-success fw-bold">-About ESeva-</h2>
          <hr/>
          <h2 className="text-center font-weight-bold">Revolutionizing E-Waste Locator and Management</h2>
          <Col md={6} className="d-flex align-items-center">
            <div>
              <p className='fw-bold'>
                Every year, India faces a growing e-waste crisis, with over 1.71 million metric tons accumulating due to inadequate disposal methods. Finding dependable e-waste collection points remains a tough task, escalating the environmental burden.
              </p>
              <p className='fw-bold'>
                Introducing ESeva: a transformative platform tailored to simplify the search for certified e-waste disposal sites. Our intuitive platform empowers individuals and businesses to effortlessly locate and connect with trusted e-waste facilities, making responsible disposal easier than ever.
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
    
  );
};

export default AboutUs;
