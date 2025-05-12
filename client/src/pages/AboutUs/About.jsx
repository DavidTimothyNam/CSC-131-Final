// About.jsx — with smooth scroll-to-section support
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageNavbar from "../../components/Navbar";
import AboutSidebar from "../../components/PageAboutUs/AboutSidebar";
import { Container, Col, Row, Image } from "react-bootstrap";
import Layout from "../../components/Layout";
// import Container from "react-bootstrap";

const About = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash?.substring(1);
    if (hash) {
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          const yOffset = -80;
          const y =
            section.getBoundingClientRect().top + window.pageYOffset - yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <Layout>
      <Container className="px-3 px-md-4">
        <Row>
          <Col md={3}>
            <AboutSidebar />
          </Col>
          <Col md={9} style={{ overflowX: "hidden" }}>
            <section
              id="our-mission-statement"
              className="mb-5 scroll-offset"
              style={{ marginTop: "32px" }}
            >
              <Row className="align-items-center">
                <Col md={4} className="text-center mb-3 mb-md-0">
                  <Image
                    src="/images/Placeholder_MissionStatement.png"
                    alt="Mission Statement"
                    fluid
                    rounded
                    style={{ maxWidth: "100%", height: "auto" }}
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
                    style={{ maxWidth: "100%", height: "auto" }}
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
                    style={{ maxWidth: "100%", height: "auto" }}
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
    </Layout>
  );
};

export default About;
