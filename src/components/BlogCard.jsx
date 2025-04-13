import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogCard = ({ image, badges, date, title, excerpt, link }) => {
  return (
    <Card className="mb-4 shadow-sm h-100">
      <Card.Img variant="top" src={image} alt={title} className="blog-image" />

      <Card.Body className="d-flex flex-column">
        <div className="mb-1">
          {badges.map((badge, index) => (
            <Badge key={index} bg="primary" className="me-2">
              {badge}
            </Badge>
          ))}
        </div>

        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{date}</Card.Subtitle>

        <Card.Text className="flex-grow-1">{excerpt}</Card.Text>

        <div className="mt-3">
          <Link to={link} className="btn btn-primary w-100">
            Read More
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
