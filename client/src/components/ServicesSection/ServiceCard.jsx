import { Card } from "react-bootstrap";

const ServiceCard = ({ image, title, description }) => {
  return (
    <Card
      className="h-100 border-0 shadow-sm"
      style={{ background: "#DDA15E", color: "#283618" }}
    >
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title className="text-center bold">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
