import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer/Footer";
import PageNavbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <PageNavbar />

      <main>
        <Container className="my-5">{children}</Container>
      </main>

      <Footer />
    </>
  );
}

export default Layout;
