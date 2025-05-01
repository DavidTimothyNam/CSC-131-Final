import React from "react";
import { Accordion } from "react-bootstrap";
import Layout from "../../components/Layout";

const FAQ = () => {
  return (
    <Layout>
      <h1 className="mb-4 bold text-center">Frequently Asked Questions</h1>
      <Accordion flush className="m-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What does a financial planner do?</Accordion.Header>
          <Accordion.Body>
            A financial planner helps you set and achieve your financial goals
            through budgeting, saving, investing, retirement planning, and risk
            management.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Do I need a financial advisor if I'm young or don't have a lot of
            money?
          </Accordion.Header>
          <Accordion.Body>
            Yes! Financial advice is beneficial at any stage. Getting started
            early can set you up for long-term success and help avoid costly
            mistakes.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>What is wealth management?</Accordion.Header>
          <Accordion.Body>
            Wealth management is a comprehensive service that includes
            investment advice, estate planning, tax services, and more—tailored
            to grow and protect your wealth.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            Is there a minimum investment required to work with you?
          </Accordion.Header>
          <Accordion.Body>
            It depends on the service package. We offer flexible solutions for
            individuals at various wealth levels.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            What financial services do you provide for businesses?
          </Accordion.Header>
          <Accordion.Body>
            We offer forecasting, capital management, financial strategy
            consulting, and more to help businesses thrive and scale.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            Can you help me reduce my tax liability?
          </Accordion.Header>
          <Accordion.Body>
            Absolutely. We focus on strategic tax planning to help you maximize
            deductions and stay compliant.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            Do you offer insurance advice or sell insurance products?
          </Accordion.Header>
          <Accordion.Body>
            We provide insurance planning and can guide you in selecting the
            best coverage, though we do not directly sell insurance.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>
            Do you offer financial education for beginners?
          </Accordion.Header>
          <Accordion.Body>
            Yes, we have articles, webinars, and workshops designed for all
            experience levels—from financial literacy to market strategy.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header>
            Is my financial information secure?
          </Accordion.Header>
          <Accordion.Body>
            100%. We use industry-standard encryption and secure platforms to
            protect all client data.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>How are you compensated?</Accordion.Header>
          <Accordion.Body>
            Our compensation structure varies by service and may include flat
            fees, hourly rates, or a percentage of assets managed. Full
            transparency is a top priority.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="10">
          <Accordion.Header>How do I get started?</Accordion.Header>
          <Accordion.Body>
            Just contact us to schedule a free consultation. We'll walk you
            through your options and the best path forward.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Layout>
  );
};

export default FAQ;
