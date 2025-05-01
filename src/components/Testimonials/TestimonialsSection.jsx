import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TestimonialCard from "./TestimonialCard";

function TestimonialsSection() {
  const testimonials = [
    {
      image: "./images/clientPlaceholders/client1.jpg",
      testimony:
        "Working with Ron Smithey's Financial Services has been a game-changer for my business. Their expert advice helped me reduce expenses and increase my revenue by 20% in just six months!",
      name: "Sarah W.",
    },
    {
      image: "./images/clientPlaceholders/client2.jpg",
      testimony:
        "Ron Smithey’s team is incredibly knowledgeable and patient. They took the time to explain all my options and created a strategy tailored to my goals.",
      name: "Alex B.",
    },
    {
      image: "./images/clientPlaceholders/client3.jpg",
      testimony:
        "I was overwhelmed with managing my retirement funds, but Ron Smithey and his team provided a clear plan that gave me confidence and peace of mind. Now, I know my future is secure.",
      name: "Jessica M.",
    },
  ];

  return (
    <Container className="my-5">
      <Row className="g-4 align-items-center">
        {testimonials.map((t, index) => (
          <Col key={index} md={4}>
            <TestimonialCard
              image={t.image}
              testimony={t.testimony}
              name={t.name}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TestimonialsSection;
