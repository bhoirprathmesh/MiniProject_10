import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import laptop1 from "../assets/laptop1.png";

const recycledProducts = [
  {
    img: laptop1,
    title: "EcoRenew Laptops",
    description: "High-quality refurbished laptops at a discounted price.",
    rating: 4.7,
    price: "$350",
    link: "/details/laptop",
  },
  {
    img: "https://via.placeholder.com/150/28A745/FFFFFF?text=ReFresh+Smartphones",
    title: "ReFresh Smartphones",
    description: "Certified pre-owned smartphones that perform like new.",
    rating: 4.5,
    price: "$200",
    link: "/details/smartphone",
  },
  {
    img: "https://via.placeholder.com/150/FFC107/FFFFFF?text=GreenTech+Tablets",
    title: "GreenTech Tablets",
    description:
      "Refurbished tablets for a great price and eco-friendly choice.",
    rating: 4.6,
    price: "$150",
    link: "/details/tablet",
  },
  {
    img: "https://via.placeholder.com/150/DC3545/FFFFFF?text=EcoGear+Smartwatches",
    title: "EcoGear Smartwatches",
    description: "Recycled smartwatches that are affordable and sustainable.",
    rating: 4.4,
    price: "$120",
    link: "/details/smartwatch",
  },
  {
    img: "https://via.placeholder.com/150/17A2B8/FFFFFF?text=Renew+Wireless+Earbuds",
    title: "Renew Wireless Earbuds",
    description: "Refurbished wireless earbuds with top-notch sound quality.",
    rating: 4.3,
    price: "$80",
    link: "/details/earbuds",
  },
  {
    img: "https://via.placeholder.com/150/6F42C1/FFFFFF?text=EcoCharge+Power+Banks",
    title: "EcoCharge Power Banks",
    description: "Recycled power banks for on-the-go charging needs.",
    rating: 4.5,
    price: "$60",
    link: "/details/power-bank",
  },
];

function RecycledElectronics() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } }); // Pass product data to the Checkout page
  };
  return (
    <Container className="my-5">
      <div className="mt-4 mb-4">
        <h2 className="fw-bold text-center text-success">
          - Recycled Electronics -
        </h2>
        <hr />

        <Row className="mt-5">
          {recycledProducts.map((item, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={item.img} alt={item.title} />
                <Card.Body>
                  <Card.Title className="fw-bold">{item.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {item.description}
                  </Card.Text>

                  <div className="mb-2">
                    <span className="text-warning">
                      {"★".repeat(Math.floor(item.rating)) +
                        "☆".repeat(5 - Math.floor(item.rating))}
                    </span>
                    <span className="ms-2">{item.rating}/5</span>
                  </div>

                  <Card.Text className="text-primary fw-bold">
                    Price: {item.price}
                  </Card.Text>

                  <div className="d-flex justify-content-between">
                    <Link to={item.link} className="btn btn-success fw-bold">
                      Details
                    </Link>
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="btn btn-warning fw-bold"
                    >
                      Buy Now
                    </button>
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

export default RecycledElectronics;
