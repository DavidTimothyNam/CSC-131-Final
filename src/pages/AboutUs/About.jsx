import React from "react";
import PageNavbar from "../../components/Navbar";
import AboutSidebar from "../../components/PageAboutUs/AboutSidebar";
import { Col, Container, Row, Image } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import "./About.css";

const About = () => {
  return (
    <>
      <PageNavbar />
      <Container>
        <Row>
          <Col md={3}>
            <AboutSidebar />
          </Col>
          <Col md={9}>
            <section id="our-mission-statement" className="mb-5 scroll-offset">
              <Row className="align-items-center">
                <Col md={4} className="text-center mb-3 mb-md-0">
                  <Image
                    src="/images/Placeholder_MissionStatement.png"
                    alt="Mission Statement"
                    fluid
                    rounded
                  />
                </Col>
                <Col md={8}>
                  <h2>Our Mission Statement</h2>
                  <p>
                    Our mission is to empower individuals with financial
                    confidence, enabling them to live life fully, with control
                    and clear purpose. We work to ease stress and uncertainty by
                    guiding our clients through a thoughtful, deliberate process
                    that answers three key questions.
                  </p>
                </Col>
              </Row>
            </section>
            <section id="ron-smitheys-biography" className="mb-5 scroll-offset">
              <Row className="align-items-center">
                <Col md={4} className="text-center mb-3 mb-md-0">
                  <Image
                    src="/images/Placeholder_Biography.png"
                    alt="Ron Smithey"
                    fluid
                    rounded
                  />
                </Col>
                <Col md={8}>
                  <h2>Ron Smithey's Biography</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fusce lorem nibh, sagittis eu leo et, gravida rhoncus quam.
                    Mauris imperdiet odio pharetra, mollis enim at, imperdiet
                    erat. Duis tristique luctus pretium. Phasellus justo justo,
                    suscipit id quam vel, placerat pretium mauris. Duis in
                    posuere eros. Vivamus a tellus tempus, hendrerit est
                    consequat, sodales ligula. Nulla euismod libero turpis, eu
                    mattis ex ornare sed
                  </p>
                  <p>
                    Etiam in tellus fermentum, euismod diam sit amet, hendrerit
                    justo. Ut id hendrerit odio, nec hendrerit purus. Donec odio
                    risus, facilisis vitae fermentum ut, condimentum eget justo.
                    Nulla porta hendrerit est a sodales. Nam consectetur, sapien
                    ac tristique finibus, turpis nunc lacinia lacus, eget
                    vehicula tortor libero ac mauris. Pellentesque pellentesque
                    egestas nibh non pellentesque. Quisque dolor est, semper
                    vitae interdum tincidunt, aliquam eu arcu. Pellentesque non
                    libero a est vehicula congue. Phasellus orci metus,
                    malesuada non dui ac, commodo pharetra tortor. Suspendisse
                    quis condimentum velit. Nulla facilisi. Aenean commodo sit
                    amet massa eget interdum. Aliquam erat volutpat.
                  </p>
                </Col>
              </Row>
            </section>
            <section id="our-location" className="mb-5 scroll-offset">
              <Row className="align-items-center">
                <Col md={4} className="text-center mb-3 mb-md-0">
                  <Image
                    src="/images/Placeholder_Location.jpg"
                    alt="Office Location"
                    fluid
                    rounded
                  />
                </Col>
                <Col md={8}>
                  <h2>Our Location</h2>
                  <b>Office Address:</b>
                  <p>5101 East La Palma Avenue, Suite #202-D</p>
                  <p>Anaheim Hills, CA 92807</p>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default About;
