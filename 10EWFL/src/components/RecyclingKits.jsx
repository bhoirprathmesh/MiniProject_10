import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const recyclingKits = [
  {
    img: "https://via.placeholder.com/150",
    title: "EcoDisassemble Kit",
    description: "A complete kit for safely disassembling electronic devices.",
    rating: 4.8,
    price: "$45",
    link: "/details/disassemble-kit"
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Home Recycling Starter Pack",
    description: "Everything you need to start recycling electronics at home.",
    rating: 4.6,
    price: "$35",
    link: "/details/recycling-starter-pack"
  },
  {
    img: "https://via.placeholder.com/150",
    title: "E-Waste Collector Bag",
    description: "Durable and eco-friendly bag for collecting e-waste.",
    rating: 4.5,
    price: "$20",
    link: "/details/collector-bag"
  },
  {
    img: "https://via.placeholder.com/150",
    title: "RecycleGuide Booklet",
    description: "A handy guide on how to recycle your electronics responsibly.",
    rating: 4.2,
    price: "$15",
    link: "/details/recycle-guide"
  }
];

function RecyclingKits() {
  return (
    <Container className="my-5">
      <div className='mt-4'>
        <h2 className="fw-bold text-center text-success">- E-Waste Recycling Kits -</h2>
        <hr />

        <Row>
          {recyclingKits.map((item, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={item.img} alt={item.title} />
                <Card.Body>
                  <Card.Title className='fw-bold'>{item.title}</Card.Title>
                  <Card.Text className="text-muted">{item.description}</Card.Text>

                  <div className="mb-2">
                    <span className="text-warning">
                      {"★".repeat(Math.floor(item.rating)) + "☆".repeat(5 - Math.floor(item.rating))}
                    </span>
                    <span className="ms-2">{item.rating}/5</span>
                  </div>

                  <Card.Text className='text-primary fw-bold'>Price: {item.price}</Card.Text>

                  <Link to={item.link} className="btn btn-success fw-bold b">Details</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default RecyclingKits;
