import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function BlogHeroCard({ image, title, excerpt, link }) {
  return (
    <Card className="text-white mb-5 shadow">
      <Card.Img
        src={image}
        alt={title}
        style={{
          height: "650px",
          objectFit: "cover",
          filter: "brightness(0.6)", // darkens image for contrast
        }}
      />
      <Card.ImgOverlay className="d-flex flex-column justify-content-center text-center">
        <h1 className="fw-bold">{title}</h1>
        <p className="lead">{excerpt}</p>
        <Button as={Link} to={link} variant="primary" style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
          Read More
        </Button>
      </Card.ImgOverlay>
    </Card>
  );
}

export default BlogHeroCard;
