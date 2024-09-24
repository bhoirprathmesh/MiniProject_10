import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Education() {
  return (
    <Container className="my-5">
        <div className='mt-4'>
            <h2 className="fw-bold text-center text-success">- E-Waste Education -</h2>
            <hr />

            {/* Video Section */}
            <h3 className="fw-bold text-black">Watch Videos</h3>
            <Row className="mt-3">
                <Col md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                    <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Video thumbnail" />
                    <Card.Body>
                    <Card.Title className='fw-bold'>Video Title</Card.Title>
                    <Card.Text>Short description about the video.</Card.Text>
                    <Link to='/play' className="btn btn-success mr-2 fw-bold b">Play Now</Link>
                    </Card.Body>
                </Card>
                </Col>

                <Col md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                    <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Video thumbnail" />
                    <Card.Body>
                    <Card.Title className='fw-bold'>Video Title 2</Card.Title>
                    <Card.Text>Another short description about the video.</Card.Text>
                    <Link to='/play' className="btn btn-success mr-2 fw-bold b">Play Now</Link>
                    </Card.Body>
                </Card>
                </Col>
            </Row>

            {/* Read Section */}
            <h3 className="fw-bold text-black">Read Articles</h3>
            <Row className="mt-3">
                <Col md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                    <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Article thumbnail" />
                    <Card.Body>
                    <Card.Title className='fw-bold'>Article Title</Card.Title>
                    <Card.Text>Brief description about the article.</Card.Text>
                    <Link to='/read' className="btn btn-success fw-bold b">Read Now</Link>
                    </Card.Body>
                </Card>
                </Col>

                <Col md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                    <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Article thumbnail" />
                    <Card.Body>
                    <Card.Title className='fw-bold'>Article Title 2</Card.Title>
                    <Card.Text>Brief description about another article.</Card.Text>
                    <Link to='/read' className="btn btn-success fw-bold b">Read Now</Link>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </div>
    </Container>
  );
}

export default Education;
