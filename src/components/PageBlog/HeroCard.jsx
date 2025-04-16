import React from "react";
import { Card, Button } from "react-bootstrap";

function HeroCard({ image, title, excerpt, link }) {
  return (
    <Card className="text-white">
      <Card.Img src={image} alt={title} />
      <Card.ImgOverlay className="d-flex flex-column justify-content-center text-center bg-dark bg-opacity-50">
        <h1 className="fw-bold">{title}</h1>
        <p className="lead">{excerpt}</p>
        <Button variant="primary" href={link}>
          Read More
        </Button>
      </Card.ImgOverlay>
    </Card>
  );
}

export default HeroCard;
