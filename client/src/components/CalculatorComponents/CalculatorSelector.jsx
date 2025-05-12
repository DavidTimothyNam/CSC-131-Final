import React, { useState } from "react";
import { Accordion, ButtonGroup, ToggleButton } from "react-bootstrap";
import CalculatorField from "../../components/CalculatorComponents/calculatorField.jsx";
import calculatorData from "../../data/calculatorData.json";
import { useLocation } from "react-router-dom";

const CalculatorSelector = () => {
  const calculators = [
    {
      id: "loanCredit",
      title: "Loan & Credit Cards",
      calcs: [
        "Loan Payoff",
        "Home Affordability",
        "Mortage Refinancing",
        "Mortage Acceleration",
        "Credit Card Debt",
        "Lease Payment",
        "Car Affordability",
      ],
      keys: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      id: "saveInvest",
      title: "Saving & Investing",
      calcs: [
        "College Funding",
        "Saving Goals",
        "Savings Accumulation",
        "Taxable Equivalent Yield",
      ],
      keys: [8, 9, 10, 11],
    },
    {
      id: "retireInflation",
      title: "Retirement & Inflation",
      calcs: [
        "Cost of Retirement",
        "Required Minimum Distributions",
        "Impact of Inflation",
        "Retirement Plan Early Distribution",
        "Retirement Portfolio Lifespan"
      ],
      keys: [12, 13, 14, 15, 16],
    },
    {
      id: "taxesIRA",
      title: "Taxes & IRAS",
      calcs: [
        "Federal Income Tax",
        "Tax-Deferred Savings",
        "Roth IRA Conversion",
        "Estate Taxes",
      ],
      keys: [17, 18, 19, 20],
    },
  ];

  const location = useLocation();
  const initialSelection = location.state?.initialSelection ?? 1;
  const [selected, setSelected] = useState(initialSelection);
  const [activeKey, setActiveKey] = useState(
    calculators.findIndex((calc) => calc.keys.includes(selected)).toString()
  );

  const handleAccordionChange = (key) => {
    setActiveKey(key); // Update the active Accordion section when it's changed by the user
  };

  return (
    <div className="container">
      <div className="row text-start mb-4">
        <div className="col-3">
          <h1 className="bold text-center" style={{ marginTop: '35px' }}>Calculators</h1>
        </div>
        <div className="col-9"></div>
      </div>
      <div className="row">
        <div className="calculator-selection col-3 mb-5">
          <Accordion
            activeKey={activeKey}
            onSelect={handleAccordionChange}>
            {calculators.map((calc, listNum) => (
              <Accordion.Item eventKey={listNum.toString()} key={calc.id}>
                <Accordion.Header>{calc.title}</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex justify-content-center">
                    <ButtonGroup vertical>
                      {calc.calcs.map((calc2, index) => (
                        <ToggleButton
                          key={calc.keys[index]}
                          id={calc2}
                          type="radio"
                          name="btnradio"
                          value={calc2}
                          checked={selected === calc.keys[index]}
                          onChange={() => setSelected(calc.keys[index])}
                          variant="none"
                          className="calcButton"
                        >
                          {calc2}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <div className="col-2"></div>
        <div className="col-6">
          <CalculatorField data={calculatorData[selected - 1]} />
        </div>
      </div>
    </div>
  );
};

export default CalculatorSelector;
