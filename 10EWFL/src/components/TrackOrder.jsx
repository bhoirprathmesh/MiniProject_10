import React from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FaTruck, FaCheckCircle } from 'react-icons/fa';

const TrackOrder = () => {
  const location = useLocation();
  const { product, address, paymentMethod } = location.state || {};

  if (!product) {
    return <div>Error: No order details found.</div>;
  }

  const orderStatus = 'In Transit'; // Simulated order status

  return (
    <Container className="my-5">
      <h2 className="fw-bold text-center text-success">Track Your Order</h2>

      <Card className="p-4 mb-4 shadow-sm">
        <h5 className="fw-bold">{product.title}</h5>
        <p><strong>Delivery Address:</strong> {address}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        
        <div className="mt-4 text-center">
          <FaTruck size={50} className="text-primary" />
          <h4 className="mt-3">Order Status: {orderStatus}</h4>
          <Alert variant="info" className="mt-3">
            Your order is currently {orderStatus}. We will notify you once it's delivered.
          </Alert>
        </div>
      </Card>
    </Container>
  );
};

export default TrackOrder;
