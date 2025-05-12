import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";

const ServiceSection = () => {
  return (
    <section id="services">
      <Container>
        <Row className="gy-4">
          <Col lg={3} md={6}>
            <ServiceCard
              image="/images/senior_advisor.jpg"
              title="Retirement Planning"
              description="We help you build a personalized roadmap to retirement, focusing on long-term financial security and peace of mind."
            />
          </Col>
          <Col lg={3} md={6}>
            <ServiceCard
              image="/images/student_advisor.jpg"
              title="College Plans"
              description="From 529 plans to custom savings strategies, we make it easier to prepare for your child’s education costs."
            />
          </Col>
          <Col lg={3} md={6}>
            <ServiceCard
              image="/images/couple_advisor.jpg"
              title="Insurance Reviews"
              description="Our team evaluates your current policies to ensure they align with your goals and protect what matters most."
            />
          </Col>
          <Col lg={3} md={6}>
            <ServiceCard
              image="/images/family_advisor.jpg"
              title="Tax Strategies"
              description="We identify smart, legally sound strategies to reduce your tax burden and keep more of your income working for you."
            />
          </Col>
        </Row>
        <div className="text-center mt-4">
          <Link to="/services">
            <Button className="btn buttonDark" size="md">
              More Services
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ServiceSection;
