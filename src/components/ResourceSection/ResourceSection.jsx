import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ResourceCard from "./ResourceCard";

const ResourceSection = () => {
  return (
    <section className="py-5" id="resources">
      <Container>
        <h2 className="text-center mb-4">Financial Resources</h2>
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
      </Container>
    </section>
  );
};

export default ResourceSection;
