import React from "react";
import PageNavbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import './marketplace.css'

const Marketplace = () => {
  return (
    <>
      <Layout>
        <div className="container card-grid-holder">
          <h1>Marketplace</h1>
          <div className="row">
            {Array(6)
              .fill()
              .map((_, i) => (
                <div className="card col-lg-4 resource-card" key={i}>
                  <p className="card-title">
                    <a href="./index.html">Article Name</a>
                  </p>
                  <p className="card-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus eget arcu at ipsum imperdiet eleifend. Sed non
                    aliquet est. Cras congue purus et mollis vestibulum.
                  </p>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Marketplace;
