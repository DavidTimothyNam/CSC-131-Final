import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ResourceCard from "./ResourceCard";

const ResourceSection = () => {
  return (
    <section id="resources">
      <Container>
        <Row className="gy-4">
          <Col lg={3} md={6}>
            <ResourceCard
              image="/images/svgs/akar-icons--book.svg"
              title="Flipbooks"
              description="Browse our interactive flipbooks for quick, easy-to-read financial insights."
              link="/marketplace#flipbooks"
              buttonText="See Flipbooks"
            />
          </Col>
          <Col lg={3} md={6}>
            <ResourceCard
              image="/images/svgs/icon-park-outline--calculator-one.svg"
              title="Calculators"
              description="Use our calculators to explore savings, retirement, and investment scenarios."
              link="/calculators"
              buttonText="Use Calculators"
            />
          </Col>
          <Col lg={3} md={6}>
            <ResourceCard
              image="/images/svgs/akar-icons--video.svg"
              title="Videos"
              description="Watch short videos that explain key financial concepts and planning strategies."
              link="/marketplace#videos"
              buttonText="Watch Videos"
            />
          </Col>
          <Col lg={3} md={6}>
            <ResourceCard
              image="/images/svgs/iconoir--graph-up.svg"
              title="Newsletter"
              description="Stay informed with our monthly newsletter featuring tips, updates, and market news."
              link="/marketplace#newsletter"
              buttonText="Read Newsletter"
            />
          </Col>
        </Row>
        <div className="text-center mt-4">
          <Link to="/marketplace">
            <Button className="buttonDark btn" size="md">
              All Resources
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ResourceSection;
