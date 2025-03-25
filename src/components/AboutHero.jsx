import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import person1 from "../assets/images/person1.jpg";

const AboutUs = () => {
  return (
    <section id="about">
      <Container>
        <Row className="align-items-center">
          {/* Text Section */}
          <Col lg={6}>
            <h1>Ron Smithey Financial Services</h1>
            <p className="lead mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              fringilla gravida turpis at egestas. Sed et libero vel ipsum
              maximus porta. Integer sodales accumsan eros a finibus. Phasellus
              volutpat sapien a quam tempor, at consequat enim rhoncus.
            </p>
            <div className="d-flex gap-3">
              <Button href="#contact" variant="primary" size="lg">
                Meet With Us
              </Button>
              <Button href="./about.html" variant="outline-dark" size="lg">
                Our Team
              </Button>
            </div>
          </Col>

          {/* Image Section */}
          <Col lg={6} className="text-center">
            <img
              src={person1}
              alt="Profile Photo"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
