import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

const Checkout = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [address, setAddress] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (useCurrentLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setAddress(`Lat: ${latitude}, Lon: ${longitude}`);
          },
          (error) => {
            alert("Error fetching location: " + error.message);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }, [useCurrentLocation]);

  const handleOrderPlacement = () => {
    if (address && paymentMethod) {
      setOrderSuccess(true);
    } else {
      alert('Please provide address and select a payment method.');
    }
  };

  if (!product) {
    return <div>Error: Product data not found. Please go back and try again.</div>;
  }

  return (
    <Container className="my-5">
      <h2 className="fw-bold text-center text-success">Checkout</h2>

      {orderSuccess ? (
        <Alert variant="success" className="text-center mt-4">
          <FaCheckCircle size={30} className="me-2" />
          Order Successful! Thank you for your purchase.
          <br />
          <Button variant="link" href="/track-order" className="mt-3">
            Track Your Order
          </Button>
        </Alert>
      ) : (
        <div>
          {/* Product Details Section */}
          <Card className="p-3 mb-4 shadow-sm">
            <Row>
              <Col md={4}>
                <img src={product.img} alt={product.title} className="img-fluid" />
              </Col>
              <Col md={8}>
                <h4 className="fw-bold">{product.title}</h4>
                <p>{product.description}</p>
                <p className="text-primary fw-bold">Price: {product.price}</p>
              </Col>
            </Row>
          </Card>

          {/* Address Section */}
          <Card className="p-3 mb-4 shadow-sm">
            <h5 className="fw-bold mb-3">
              <FaMapMarkerAlt size={20} className="me-2" /> Delivery Address
            </h5>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={useCurrentLocation}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Use current location"
                onChange={(e) => setUseCurrentLocation(e.target.checked)}
                className="text-muted"
              />
            </Form.Group>
          </Card>

          {/* Payment Methods */}
          <Card className="p-3 mb-4 shadow-sm">
            <h5 className="fw-bold mb-3">
              <FaCreditCard size={20} className="me-2" /> Payment Method
            </h5>
            <div className="d-flex flex-column">
              <Form.Check
                type="radio"
                label="UPI"
                name="paymentMethod"
                value="upi"
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-2"
              />
              {paymentMethod === 'upi' && (
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Enter UPI ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="example@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </Form.Group>
              )}

              <Form.Check
                type="radio"
                label="Cash on Delivery (COD)"
                name="paymentMethod"
                value="cod"
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-2"
              />
            </div>
          </Card>

          {/* Place Order Button */}
          <div className="d-flex justify-content-center">
            <Button
              variant="success"
              className="fw-bold px-5 py-2"
              onClick={handleOrderPlacement}
              style={{ fontSize: '18px' }}
            >
              Place Order
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Checkout;
