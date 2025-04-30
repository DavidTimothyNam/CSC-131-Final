import React from "react";
import { Card, Image } from "react-bootstrap";

function TestimonialCard({ image, testimony, name }) {
  return (
    <Card className="p-3 shadow d-flex flex-row align-items-center">
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
