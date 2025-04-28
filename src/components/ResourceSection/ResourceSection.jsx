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
              description="Etiam faucibus, diam eget dictum facilisis, dolor ante posuere massa, a convallis justo tortor tincidunt nulla."
              link="#"
              buttonText="See Flipbooks"
            />
          </Col>
          <Col lg={3} md={6}>
            <ResourceCard
              image="/images/svgs/icon-park-outline--calculator-one.svg"
              title="Calculators"
              description="Mauris finibus purus sit amet velit euismod, ac eleifend tellus pretium."
              link="#"
              buttonText="Use Calculators"
            />
          </Col>
          <Col lg={3} md={6}>
            <ResourceCard
              image="/images/svgs/akar-icons--video.svg"
              title="Videos"
              description="Proin dignissim at lorem in convallis. Sed vitae risus eget sapien finibus ultricies. "
              link="#"
              buttonText="Watch Videos"
            />
          </Col>
          <Col lg={3} md={6}>
            <ResourceCard
              image="/images/svgs/iconoir--graph-up.svg"
              title="Newsletter"
              description="In leo quam, vestibulum a dignissim non, ullamcorper interdum tortor."
              link="#"
              buttonText="Read Newsletter"
            />
          </Col>
        </Row>
        <div className="text-center mt-4">
          <Link to="/marketplace">
            <Button className="button1 button3 btn" size="md">
              All Resources
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ResourceSection;
