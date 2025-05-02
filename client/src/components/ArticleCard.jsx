import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ArticleCard = ({ slug, title, description }) => {
  return (
    <div className="card col-lg-4 resource-card">
      <Button className="titleLink marketplaceBody" as={Link} to={`/article/${slug}`}>
        <p className="card-title">{title}</p>
        <p className="card-description"> {description}</p>
      </Button>
    </div>
  );
};

export default ArticleCard;