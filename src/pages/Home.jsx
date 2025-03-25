import React from "react";
import PageNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";

class Home extends React.Component {
  render() {
    return (
      <>
        <PageNavbar />
        <Container>
          <h1>Home page</h1>
          <p>This is a paragraph.</p>
        </Container>
      </>
    );
  }
}

export default Home;
