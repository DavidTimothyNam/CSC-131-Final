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
                    Ronnie’s journey as a Financial Advisor began over 23 years
                    ago. He entered the financial field because he wanted to
                    help individuals and business owners build, protect, and
                    distribute their financial wealth. After all these years in
                    the industry he continues to be passionate about helping his
                    clients navigate their financial journeys from college
                    saving plans, long term care and retirement.
                  </p>
                  <p>
                    Ronnie is well versed in all of the latest trends which
                    enables him to successfully guide his clients through the
                    highs and lows of economic cycles. He considers himself a
                    partner in his clients financial journey, and continuously
                    works towards building the strong foundations of a secure
                    financial future. When he is not advising clients he enjoys
                    spending time with his wife and four children. He is an
                    active member in the local church and he volunteers his free
                    time to his local Little League, having been a baseball
                    coach for over 6 years and serving on the board for three
                    years as the vice president and coaching coordinator.
                  </p>
                  <h4>Career History</h4>
                  <ul>
                    <li>In the financial advising field since 2003</li>
                    <li>
                      Registered Representative with LPL Financial, an
                      independent Broker/Dealer and Registered Investment
                      Advisor (August 2005 – Present)
                    </li>
                    <li>
                      Former Financial Advisor at Trilogy Financial Services
                      Inc., a Registered Investment Advisory firm (August 2002 –
                      July 2005)
                    </li>
                  </ul>

                  <h4>Education</h4>
                  <ul>
                    <li>BA in Economics, University of Redlands</li>
                    <li>Minor in Business, University of Redlands</li>
                  </ul>
                </Col>
              </Row>
            </section>

            <section id="our-location" className="mb-5 scroll-offset">
              <Row className="align-items-center">
                <Col md={4} className="text-center mb-3 mb-md-0">
                  <Image
                    src="/images/office_location.jpg"
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
