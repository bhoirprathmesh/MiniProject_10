import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cat1 from '../assets/categorystore1.jpg';
import cat2 from '../assets/catstore2.jpg';

const categories = [
  {
    img: cat1,
    title: "Recycled Electronics",
    description: "Explore a wide range of refurbished and recycled electronics.",
    link: "/store/recycled-electronics"
  },
  {
    img: cat2,
    title: "E-Waste Recycling Kits",
    description: "DIY kits to help you recycle your electronic waste at home.",
    link: "/store/recycling-kits"
  }
];

function Store() {
  return (
    <Container className="my-5">
      <div className='mt-4'>
        <h2 className="fw-bold text-center text-success">- E-Waste Store Categories -</h2>
        <hr />

        <Row>
          {categories.map((category, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={category.img} alt={category.title} />
                <Card.Body>
                  <Card.Title className='fw-bold'>{category.title}</Card.Title>
                  <Card.Text className="text-muted">{category.description}</Card.Text>
                  
                  {/* Explore Button */}
                  <div className="d-flex justify-content-center">
                    <Link to={category.link} className="btn btn-success fw-bold b">Explore</Link>
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
