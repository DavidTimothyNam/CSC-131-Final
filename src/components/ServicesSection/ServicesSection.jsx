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
              description="Nullam ultrices risus id accumsan cursus. Maecenas scelerisque mi lacus, nec pellentesque nibh rutrum sit amet."
            />
          </Col>
          <Col lg={3} md={6}>
            <ServiceCard
              image="/images/student_advisor.jpg"
              title="College Plans"
              description="Duis vitae quam vitae orci condimentum rhoncus. Sed at justo risus. Etiam porttitor orci sit amet metus tincidunt egestas et non velit."
            />
          </Col>
          <Col lg={3} md={6}>
            <ServiceCard
              image="/images/couple_advisor.jpg"
              title="Insurance Reviews"
              description="Aenean velit turpis, viverra et lacinia quis, cursus non leo. Donec pulvinar nisi vitae arcu viverra maximus."
            />
          </Col>
          <Col lg={3} md={6}>
            <ServiceCard
              image="/images/family_advisor.jpg"
              title="Tax Strategies"
              description="Vivamus et rhoncus massa, efficitur dapibus quam. Proin sed tellus dolor. Fusce dui lacus, vestibulum vitae condimentum tincidunt, tincidunt ut magna."
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
