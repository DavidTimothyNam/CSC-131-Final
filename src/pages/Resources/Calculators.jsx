import React from "react";
import PageNavbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer"
import CalculatorSelector from "../../components/CalculatorComponents/CalculatorSelector";

const Calculators = () => {
  return (
    <>
        <PageNavbar />
        <CalculatorSelector />
        <Footer/>
    </>
  );
};

export default Calculators;
