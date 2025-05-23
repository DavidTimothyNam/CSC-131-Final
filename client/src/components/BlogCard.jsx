// === BlogCard.jsx ===
import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogCard = ({ image, badges = [], date, title, excerpt, link }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="mb-4 shadow-sm h-100" style={{ background: "#DDA15E", color: "#283618" }}>
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "225px",
          objectFit: "cover",
          borderTopLeftRadius: "0.375rem",
          borderTopRightRadius: "0.375rem",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="mb-1">
          {badges.map((badge, i) => (
            <Badge key={i} className="badge me-2">
              {badge}
            </Badge>
          ))}
        </div>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{formattedDate}</Card.Subtitle>
        <Card.Text className="flex-grow-1">{excerpt}</Card.Text>
        <div className="mt-3">
          <Link to={link} className="btn w-100">
            Read More
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;