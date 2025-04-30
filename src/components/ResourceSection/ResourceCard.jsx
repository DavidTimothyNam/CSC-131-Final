import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ResourceCard = ({ image, title, description, link, buttonText }) => {
  return (
    <Card className="h-100 border-0 shadow-sm text-center" id="backgroundLight">
      <Card.Body className="p-4">
        <img src={image} alt={title} className="card-svg mb-3" />
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Link to={link}>
          <Button className="button1 btn">{buttonText}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ResourceCard;
