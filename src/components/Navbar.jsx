import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function PageNavbar() {
  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          My Website
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="About Us" id="about-us-dropdown">
              <NavDropdown.Item as={Link} to="/about">
                Our Team
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/testimonials">
                Testimonials
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/faq">
                FAQs
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PageNavbar;
