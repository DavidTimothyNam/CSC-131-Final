import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import profileImg from "../../../server/server-data/blog-images/10.jpg";

const AboutHero = () => {
  return (
    <section id="about">
      <Container>
        <Row className="align-items-center">
          {/* Text Section */}
          <Col lg={6}>
            <h1
              id="backgroundLight"
              className="shadow"
              style={{ padding: "10px" }}
            >
              <b>Ron Smithey Financial</b>
            </h1>
            <p className="lead mt-4 mb-4 shadow" id="backgroundLight">
              At Ron Smithey Financial, we specialize in retirement planning,
              college planning, tax strategies, and estate planning. We help
              individuals and business owners with life insurance, health
              insurance, long-term care insurance, and disability insurance. Our
              investment services include stocks, bonds, mutual funds, IRAs, and
              401(k) plans. We also assist with retirement plan rollovers and
              alternative investment options. Our goal is to provide clear,
              reliable guidance to help you protect what matters and plan for
              the future.
            </p>
            <div className="d-flex gap-4 justify-content-center mb-4">
              <Button className="btn shadow" as={Link} to="/contact" size="lg">
                Meet With Us
              </Button>
              <Button className="btn shadow" as={Link} to="/about" size="lg">
                Our Team
              </Button>
            </div>
          </Col>

          {/* Image Section */}
          <Col lg={6} className="rect-img-container">
            <img
              src={profileImg}
              alt="Profile Photo"
              className="rect-img p-5"
              id="imgShape"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutHero;
