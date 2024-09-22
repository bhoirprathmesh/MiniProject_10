import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaMobileAlt, FaLaptop, FaHeadphones, FaTv, FaRegSnowflake, FaRecycle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const RecycleCenter = () => {
  const recycleItems = [
    {
      icon: <FaMobileAlt size={40} />, // Smartphone icon
      title: 'Smartphone',
      description: 'Recycle your old smartphones responsibly. We ensure proper dismantling and recycling of electronic components. Make sure to remove any personal data before recycling.',
      link: '/recycle/smartphone'
    },
    {
      icon: <FaLaptop size={40} />, // Laptop icon
      title: 'Laptop',
      description: 'Dispose of your old laptops in an eco-friendly way. Our recycling process adheres to environmental standards. Please remove batteries before recycling.',
      link: '/recycle/laptop'
    },
    {
      icon: <FaHeadphones size={40} />, // Accessories icon
      title: 'Accessories',
      description: 'Recycle various electronic accessories responsibly. We separate and recycle different materials for each accessory. Bundle cables together before dropping off.',
      link: '/recycle/accessories'
    },
    {
      icon: <FaTv size={40} />, // Television icon
      title: 'Television',
      description: 'Environmentally friendly disposal of old televisions. Proper disposal of harmful components to minimize environmental impact. Bring remote controls and power cables for proper recycling.',
      link: '/recycle/television'
    },
    {
      icon: <FaRegSnowflake size={40} />, // Refrigerator icon
      title: 'Refrigerator',
      description: 'Eco-conscious disposal of old refrigerators. Safe removal and recycling of refrigerants and other components. Ensure the refrigerator is defrosted before recycling.',
      link: '/recycle/refrigerator'
    },
    {
      icon: <FaRecycle size={40} />, // Other items icon
      title: 'Other',
      description: 'Responsible recycling of any other Electronic Devices. Proper dismantling and recycling of metal and electronic components. Ensure it\'s not working before recycling.',
      link: '/recycle/others'
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center text-success fw-bold mb-4"> - Recycle Center - </h2>
      <hr/>
      <Row>
        {recycleItems.map((item, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">
                    {item.icon}
                  </div>
                  <Card.Title className='fw-bold'>{item.title}</Card.Title>
                </div>
                <Card.Text>{item.description}</Card.Text>
                <Link to={item.link} className="btn btn-success mr-2 fw-bold">Recycle Now</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Outlet /> 
    </Container>
  );
};

export default RecycleCenter;
