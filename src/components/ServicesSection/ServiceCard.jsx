import { Card } from "react-bootstrap";
import "./ServiceCard.css"; // for any custom styles

const ServiceCard = ({ image, title, description }) => {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title className="text-center">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
