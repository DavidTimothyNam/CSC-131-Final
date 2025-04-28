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
            <h1 id="backgroundLight" style={{ padding: "10px" }}><b>Ron Smithey Financial Services</b></h1>
            <p className="lead mt-4 mb-4" id="backgroundLight">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            </p>
            <div className="d-flex gap-4 justify-content-center mb-4">
              <Button className="btn" as={Link} to="/contact" size="lg">
                Meet With Us
              </Button>
              <Button className="btn" as={Link} to="/about" size="lg">
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
