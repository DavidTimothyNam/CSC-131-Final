import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
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
          <Nav className="me-auto">
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
            <NavDropdown title="Resources" id="resources-dropdown">
              <NavDropdown.Item as={Link} to="/services">
                Services
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/calendar">
                Calendar
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/marketplace">
                Marketplace
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/calculators">
                Calculators
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/blog">
                Blog
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search..."
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PageNavbar;
