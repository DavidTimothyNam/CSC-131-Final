import React from "react";
import PageNavbar from "../../components/Navbar";
import Layout from "../../components/Layout";

const Marketplace = () => {
  return (
    <>
      <Layout>
        <style>{`
        .card-grid-holder {
        background-color: rgba(123, 216, 111, 0.637);
        padding: 25px 100px 25px 100px;
      }

        .resource-card {
        background-color: rgb(50, 199, 87);
        border: 5px solid rgba(0, 0, 0, 0.1);
        /* text-align: center; */
        /* height: 150px; */
        /* width: 480px; */
      }

        .card-grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
        gap: 50px;
        padding: 50px;
      }
      `}</style>
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
