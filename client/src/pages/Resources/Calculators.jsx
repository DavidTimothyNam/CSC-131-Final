import React from "react";
import PageNavbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import CalculatorSelector from "../../components/CalculatorComponents/CalculatorSelector";
import Layout from "../../components/Layout";

const Calculators = () => {
  return (
    <>
      <Layout>
        <CalculatorSelector />
      </Layout>
    </>
  );
};

export default Calculators;
