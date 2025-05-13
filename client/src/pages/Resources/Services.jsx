import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import Layout from "../../components/Layout";

const Services = () => {
  return (
    <Layout>
      <h1 className="pt-2 bold text-center" style={{ marginTop: '75px' }}>Services</h1>
      <Row>
        <Col lg={7}>
          <Accordion flush className="m-5">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Financial Planning & Advisory</Accordion.Header>
              <Accordion.Body>
                Detail personalized planning services including retirement
                strategies, estate planning, and risk management.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Wealth Management</Accordion.Header>
              <Accordion.Body>
                Explain how you assist clients in growing and preserving wealth
                through diversified investment strategies and ongoing portfolio
                management.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Corporate Financial Solutions</Accordion.Header>
              <Accordion.Body>
                Offer services designed for businesses, including financial
                forecasting, capital management, and corporate finance advisory.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Tax and Insurance Planning</Accordion.Header>
              <Accordion.Body>
                Describe specialized services for tax efficiency and comprehensive
                insurance planning to protect assets.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Educational Resources</Accordion.Header>
              <Accordion.Body>
                Provide workshops, articles, and webinars that empower clients with
                financial literacy and market insights.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col className="rect-img-container">
          <img
            src="/images/office_location.jpg"
            alt="Profile Photo"
            className="rect-img p-5"
            id="imgShape"
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Services;
