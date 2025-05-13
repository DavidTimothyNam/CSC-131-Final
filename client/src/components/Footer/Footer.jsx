import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-5" id="backgroundFooter">
      <Container>
        <Row>
          <Col lg={3} className="mb-4">
            <h5>
              <b>Quick Links</b>
            </h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/about" className="nav-link p-0 text-body-secondary">
                  About Us
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/faq" className="nav-link p-0 text-body-secondary">
                  FAQs
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/marketplace"
                  className="nav-link p-0 text-body-secondary"
                >
                  Resources
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/services"
                  className="nav-link p-0 text-body-secondary"
                >
                  Services
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/blog" className="nav-link p-0 text-body-secondary">
                  Blog
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/login" className="nav-link p-0 text-body-secondary">
                  Admin Login
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={3} className="mb-4">
            <h5>
              <b>Contact Us</b>
            </h5>
            <p className="fw-bold">Ron Smithey Financial Services</p>
            <p className="small mb-0">
              5101 East La Palma Avenue, Suite #202-D, Anaheim Hills, CA 92807
            </p>
          </Col>

          <Col lg={6} className="mb-4">
            <h5>
              <b>Follow us</b>
            </h5>
            <p>Stay connected through our social media channels.</p>
            <div className="d-flex gap-3 align-items-center">
              <a
                href="https://x.com/RonSmitheyLPL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <i className="bi bi-twitter-x fs-4 text-white"></i>
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook fs-4 text-white"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/ron-smithey/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin fs-4 text-white"></i>
              </a>
              <a
                href="https://www.youtube.com/@RonSmithey"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <i className="bi bi-youtube fs-4 text-white"></i>
              </a>
              {/* Add more icons as needed */}
            </div>
          </Col>
        </Row>

        <div className="border-top pt-3 pb-0">
          {/*
          <Link to="/legal" className="nav-link p-0">
            <p className="mb-0">
              © 2025 Ron Smithey Financial Services. All rights reserved.
            </p>
          </Link>*/}
          <a
            target="_blank"
            href="https://www.lpl.com/content/dam/lpl-www/documents/disclosures/lpl-financial-relationship-summary.pdf"
            className="footerLink"
          >
            <p>LPL Financial Form CRS</p>
          </a>
          <p>
            Securities offered through LPL Financial, Member{" "}
            <a
              href="http://www.finra.org"
              target="_blank"
              aria-label="FINRA opens in a new window"
              className="footerLink"
            >
              FINRA
            </a>
            /
            <a
              href="http://www.sipc.org"
              target="_blank"
              aria-label="SIPC opens in a new window"
              className="footerLink"
            >
              SIPC
            </a>
          </p>
          <p>
            The LPL Financial Registered Representative associated with this
            site may only discuss and/or transact securities business with
            residents of the following states: AR, AZ, CA, FL, HI, ID, LA, NV,
            OH, RI.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
