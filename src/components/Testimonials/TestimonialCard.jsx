import React from "react";
import { Card, Image } from "react-bootstrap";
import "./TestimonialCard.css";

function TestimonialCard({ image, testimony, name }) {
  return (
    <Card className="shadow d-flex flex-row align-items-center" id="backgroundLight">
      <Image
        src={image}
        alt={name}
        roundedCircle
        width={64}
        height={64}
        className="me-3 client-img"
      />
      <div>
        <p className="mb-2">"{testimony}"</p>
        <p className="fw-bold mb-0">- {name}</p>
      </div>
    </Card>
  );
}

export default TestimonialCard;
