import React from "react";
import { Button } from "react-bootstrap";

function AboutSidebar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="d-flex flex-column gap-3 align-items-center"
      style={{ position: "sticky", top: "100px" }}
    >
      <Button
        variant="secondary"
        style={{ width: "150px" }}
        onClick={() => scrollToSection("our-mission-statement")}
      >
        Our Mission Statement
      </Button>
      <Button
        variant="secondary"
        style={{ width: "150px" }}
        onClick={() => scrollToSection("ron-smitheys-biography")}
      >
        Biography
      </Button>
      <Button
        variant="secondary"
        style={{ width: "150px" }}
        onClick={() => scrollToSection("our-location")}
      >
        Our Location
      </Button>
      <Button variant="secondary" style={{ width: "150px" }} className="mb-5"href="/">
        Go back to Home
      </Button>
    </div>
  );
}

export default AboutSidebar;
