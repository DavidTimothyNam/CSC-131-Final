import { useEffect } from "react";
import CalculatorSelector from "../../components/CalculatorComponents/CalculatorSelector";
import Layout from "../../components/Layout";


const Calculators = ({ initialSelection }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Layout>
      <CalculatorSelector initialSelection={initialSelection} />
    </Layout>
  );
};

export default Calculators;
