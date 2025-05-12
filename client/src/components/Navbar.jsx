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
import SearchBar from "./searchBar";

function PageNavbar() {
  return (
    <Navbar className="navbar-custom" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/rs_financial_logo1.png"
            alt="Logo"
            height="30"
            className="me-2"
          />
          Ron Smithey Financial
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
          {/*Search Bar */}
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PageNavbar;
