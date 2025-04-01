import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogCard = ({ image, badges, date, title, excerpt, link }) => {
  return (
    <Card className="mb-4 shadow-sm">
      {/* Blog Image */}
      <Card.Img variant="top" src={image} alt={title} className="blog-image" />

      <Card.Body>
        <div className="mb-1">
          {badges.map((badge, index) => (
            <Badge key={index} bg="primary" className="me-2">
              {badge}
            </Badge>
          ))}
        </div>

        <Card.Title>{title}</Card.Title>

        <Card.Subtitle className="text-muted mb-2">{date}</Card.Subtitle>

        <Card.Text>{excerpt}</Card.Text>

        <Link to={link} className="btn btn-primary">
          Read More
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
