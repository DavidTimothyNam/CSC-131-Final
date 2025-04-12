import React from "react";
import PageNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";
import AboutHero from "../components/AboutHero";
import BlogCard from "../components/BlogCard";
import BlogList from "../components/BlogList";
import BlogCarousel from "../components/BlogCarousel";

import ResourceCard from "../components/ResourceSection/ResourceCard";
import ResourceSection from "../components/ResourceSection/ResourceSection";
import ServiceCard from "../components/ServicesSection/ServiceCard";
import ServiceSection from "../components/ServicesSection/ServicesSection";
import Footer from "../components/Footer/Footer";

class Home extends React.Component {
  render() {
    return (
      <>
        <PageNavbar />
        <Container>
          <AboutHero />
          <BlogList />
          {/* <BlogCard
            image="/images/01.jpg"
            badges={["Finance", "Investing"]}
            date="March 7, 2025"
            title="How to Make Smart Investments"
            excerpt="Learn the secrets to making better financial decisions and growing your wealth."
            link="/blog/smart-investments"
          /> */}
        </Container>
        {/* <BlogCarousel /> */}
        <ResourceSection />
        {/* <ServiceCard
          image="/images/senior_advisor.jpg"
          title="Retirement Planning"
          description="Nullam ultrices risus id accumsan cursus. Maecenas scelerisque mi lacus, nec pellentesque nibh rutrum sit amet. "
        /> */}

        <ServiceSection />
        <Footer />
      </>
    );
  }
}

export default Home;
