import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section id="about">
      <Container>
        <Row className="align-items-center">
          {/* Text Section */}
          <Col lg={6}>
            <h1 id="backgroundLight" style={{padding: "10px"}}><b>Ron Smithey Financial Services</b></h1>
            <p className="lead mt-4 mb-4" id="backgroundLight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              fringilla gravida turpis at egestas. Sed et libero vel ipsum
              maximus porta. Integer sodales accumsan eros a finibus. Phasellus
              volutpat sapien a quam tempor, at consequat enim rhoncus.
            </p>
            <div className="d-flex gap-4 justify-content-center mb-4">
              <Button className="button1 btn" as={Link} to="/contact" size="lg">
                Meet With Us
              </Button>
              <Button className="button1 btn" as={Link} to="/about" size="lg">
                Our Team
              </Button>
            </div>
          </Col>

          {/* Image Section */}
          <Col lg={6} className="rect-img-container">
            <img
              src="/images/person1.jpg"
              alt="Profile Photo"
              className="rect-img"
              id="imgShape"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
