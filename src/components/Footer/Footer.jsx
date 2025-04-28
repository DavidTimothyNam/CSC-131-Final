import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-5" id="backgroundFooter">
      <Container>
        <Row>
          <Col lg={3} className="mb-4">
            <h5><b>Quick Links</b></h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/about" className="nav-link p-0 text-body-secondary">
                  About Us
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/faq" className="nav-link p-0 text-body-secondary">
                  FAQs
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/resources"
                  className="nav-link p-0 text-body-secondary"
                >
                  Resources
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/services"
                  className="nav-link p-0 text-body-secondary"
                >
                  Services
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/blog" className="nav-link p-0 text-body-secondary">
                  Blog
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={3} className="mb-4">
            <h5><b>Contact Us</b></h5>
            <p className="fw-bold">Ron Smithey Financial Services</p>
            <p className="small mb-0">
              5101 East La Palma Avenue, Suite #202-D, Anaheim Hills, CA 92807
            </p>
          </Col>

          <Col lg={6} className="mb-4">
            <h5><b>Subscribe to our newsletter</b></h5>
            <p>Get notified when we post blogs and publish resources.</p>
            <Form className="d-flex flex-column flex-sm-row w-100 gap-2">
              <Form.Label htmlFor="newsletter1" visuallyHidden>
                Email address
              </Form.Label>
              <Form.Control
                id="newsletter1"
                type="email"
                placeholder="Email address"
                className="navFooter"
              />
              <Button className="button2 btn">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <Link to="/legal" className="nav-link p-0">
            <p className="mb-0">
              © 2025 Ron Smithey Financial Services. All rights reserved.
            </p>
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
