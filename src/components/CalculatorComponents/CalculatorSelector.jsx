import React, { useState } from "react";
import { Accordion, ButtonGroup, ToggleButton } from "react-bootstrap";
import CalculatorField from "../../components/CalculatorComponents/calculatorField.jsx";
import calculatorData from "../../data/calculatorData.json";

const CalculatorSelector = () => {
  const [selected, setSelected] = useState(1);

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
      id: "cashManage",
      title: "Cash Management",
      calcs: ["Cash Flow Management", "Net Worth", "Lifetime Earnings"],
      keys: [12, 13, 14],
    },
    {
      id: "taxesIRA",
      title: "Taxes & IRAS",
      calcs: [
        "Federal Incom Tax",
        " Tax-Deferred Savings",
        "IRA Eligibility",
        "Roth IRA Conversion",
        "Estate Taxes",
      ],
      keys: [15, 16, 17, 18, 19],
    },
  ];

  return (
    <div className="container">
      <div className="row text-start mb-4">
        <div className="col-3">
          <h1 className="bold text-center" style={{marginTop: '35px'}}>Calculators</h1>
        </div>
        <div className="col-9"></div>
      </div>
      <div className="row">
        <div className="calculator-selection col-3 mb-5">
          <Accordion defaultActiveKey="0">
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
