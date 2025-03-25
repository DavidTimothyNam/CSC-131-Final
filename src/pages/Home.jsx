import React from "react";
import PageNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";
import AboutHero from "../components/AboutHero";

class Home extends React.Component {
  render() {
    return (
      <>
        <PageNavbar />
        <Container>
          <AboutHero />
        </Container>
      </>
    );
  }
}

export default Home;
