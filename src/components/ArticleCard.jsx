import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ slug, title, description }) => {
  return (
    <div className="card col-lg-4 resource-card">
      <p className="card-title">
        <Link to={`/article/${slug}`}>{title}</Link>
      </p>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default ArticleCard;
