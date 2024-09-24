import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Analytics() {
  return (
    <section className="section-analytics py-5">
      <Container>
        <Row className="text-center">
          <Col md={3} className="mb-4">
            <div className="analytics-box shadow p-4">
              <h2 className="text-success fw-bold">50+</h2>
              <p className="text-muted">Registered Facility</p>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <div className="analytics-box shadow p-4">
              <h2 className="text-success fw-bold">1000+</h2>
              <p className="text-muted">Happy Clients</p>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <div className="analytics-box shadow p-4">
              <h2 className="text-success fw-bold">200+</h2>
              <p className="text-muted">Well known Workers</p>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <div className="analytics-box shadow p-4">
              <h2 className="text-success fw-bold">24/7</h2>
              <p className="text-muted">Service</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Analytics;
