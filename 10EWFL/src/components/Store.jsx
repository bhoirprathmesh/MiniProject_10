import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const items = [
  {
    img: "https://via.placeholder.com/150",
    title: "E-Waste Item 1",
    description: "Short description about the Product.",
    rating: 4.5,
    price: "$50",
    link: "/details/1"
  },
  {
    img: "https://via.placeholder.com/150",
    title: "E-Waste Item 2",
    description: "Another Short description about the Product.",
    rating: 4.0,
    price: "$40",
    link: "/details/2"
  },
  // Add more items as needed
];

function Store() {
  return (
    <Container className="my-5">
      <div className='mt-4'>
        <h2 className="fw-bold text-center text-success">- E-Waste Store -</h2>
        <hr />

        <Row>
          {items.map((item, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={item.img} alt={item.title} />
                <Card.Body>
                  <Card.Title className='fw-bold'>{item.title}</Card.Title>
                  
                  {/* Description below Title */}
                  <Card.Text className="text-muted">{item.description}</Card.Text>

                  {/* Display Rating */}
                  <div className="mb-2">
                    <span className="text-warning">
                      {"★".repeat(Math.floor(item.rating)) + "☆".repeat(5 - Math.floor(item.rating))}
                    </span>
                    <span className="ms-2">{item.rating}/5</span>
                  </div>

                  {/* Display Price */}
                  <Card.Text className='text-primary fw-bold'>Price: {item.price}</Card.Text>

                  <div className="d-flex justify-content-between">
                    {/* Details Button */}
                    <Link to={item.link} className="btn btn-success fw-bold b">Details</Link>

                    {/* Buy Now Button */}
                    <Link to="/buy" className="btn btn-success fw-bold b">Buy Now</Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default Store;
