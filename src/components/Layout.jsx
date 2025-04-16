import React from "react";
import { Container } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

function Layout({ children }) {
  return (
    <>
      <NavbarComponent />

      <main>
        <Container className="my-5">{children}</Container>
      </main>

      <FooterComponent />
    </>
  );
}

export default Layout;
