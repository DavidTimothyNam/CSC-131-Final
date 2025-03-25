import React from "react";
import PageNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";
import AboutHero from "../components/AboutHero";
import BlogCard from "../components/BlogCard";

class Home extends React.Component {
  render() {
    return (
      <>
        <PageNavbar />
        <Container>
          <AboutHero />
          <BlogCard
            image="/images/blog1.jpg"
            badges={["Finance", "Investing"]}
            date="March 7, 2025"
            title="How to Make Smart Investments"
            excerpt="Learn the secrets to making better financial decisions and growing your wealth."
            link="/blog/smart-investments"
          />
        </Container>
      </>
    );
  }
}

export default Home;
