import React from "react";
import PageNavbar from "../components/Navbar";

class Home extends React.Component {
  render() {
    return (
      <>
        <PageNavbar />
        <div className="container mt-5">
          <h1>Home page</h1>
          <p>This is a paragraph.</p>
        </div>
      </>
    );
  }
}

export default Home;
