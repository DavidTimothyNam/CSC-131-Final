import React from "react";
import PageNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";
import AboutHero from "../components/AboutHero";
import ResourceSection from "../components/ResourceSection/ResourceSection";
import ServiceSection from "../components/ServicesSection/ServicesSection";
import Footer from "../components/Footer/Footer";
import BlogList from "../components/BlogSection";
import Layout from "../components/Layout";

class Home extends React.Component {
  render() {
    return (
      <>
        <Layout>
          <Container>
            <AboutHero />
          </Container>
          <Container className="mt-4">
            <h2 className="text-center section-title">Read Our Blog</h2>
            <BlogList />
          </Container>
          <Container className="mt-4">
            <h2 className="text-center mb-4">Financial Resources</h2>
            <ResourceSection />
          </Container>
          <Container className="mt-4">
            <h2 className="text-center mb-4">What We Offer</h2>
            <ServiceSection />
          </Container>
        </Layout>
      </>
    );
  }
}

export default Home;
