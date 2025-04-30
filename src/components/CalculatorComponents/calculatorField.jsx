import React, { useState, useEffect } from 'react';
import * as calcFunctions from './calcFunctions.jsx';

const CalculatorField= ({data}) => {
  const [inputs, setInputs] = useState({});
  const [outputs, setValues] = useState([]);

  const handleInputChange = (e, key) => {
    setInputs((prev) => ({
      ...prev,
      [key]: parseFloat(e.target.value) || 0, // fallback to 0 for non-numeric
    }));
  };

  const formatPrices = (n) =>
    Number(n).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  useEffect(() => {
    resetStates();
  }, [data]);

  const resetStates = () => {
    setInputs({});
    setValues([]);
  }

  const calculationsById = {
    1: (inputs) => [
      formatPrices(calcFunctions.MonthlyPaymentWithMonths(inputs[0], inputs[1], inputs[2])),
      formatPrices(calcFunctions.loanValueMonths(inputs[0], inputs[1], inputs[2]))
    ],
    2: (inputs) => [
      formatPrices(calcFunctions.maxMortgageMonthly(inputs[0], inputs[1])),
      formatPrices(calcFunctions.maxLoanAmountMonths(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4]))
    ],
    3: (inputs) => [
      formatPrices(calcFunctions.MonthlyPaymentWithMonths(inputs[0], inputs[1], inputs[2])),
      formatPrices(calcFunctions.totalPaymentClosing(inputs[0], inputs[1], inputs[2], inputs[3]))
    ],
    4: (inputs) => [
      formatPrices(calcFunctions.mortgageAcceleration(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4], 1)),
      formatPrices(calcFunctions.mortgageAcceleration(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4], 2))
    ],
    5: (inputs) => [
      formatPrices(calcFunctions.creditCardDebtTotalMonths(inputs[0], inputs[1], inputs[2])),
      formatPrices(calcFunctions.creditCardDebtTotalInterest(inputs[0], inputs[1], inputs[2]))
    ],
    6: (inputs) => [
      formatPrices(calcFunctions.leaseMonthlyPaymentResidual(inputs[0], inputs[1], inputs[2], inputs[3], inputs [4])),
      formatPrices(calcFunctions.leaseTotalInterestResidual(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4]))
    ],
    7: (inputs) => [
      formatPrices(calcFunctions.carAffordabilityTotal(inputs[0], inputs[1], inputs[2], inputs[3])),
      formatPrices(calcFunctions.carAffordabilityInterest(inputs[0], inputs[1], inputs[2], inputs[3]))
    ],
    8: (inputs) => [
      formatPrices(calcFunctions.collegeTotalCost(inputs[0], inputs[1], inputs[2], inputs[3])),
      formatPrices(calcFunctions.collegeAnnualSavings(inputs[0], 
        calcFunctions.collegeTotalCost(inputs[0], inputs[1], inputs[2], inputs[3])))
    ],
    9: (inputs) => [
      formatPrices(calcFunctions.annualSavingsNeeded(inputs[0], inputs[1], inputs[2]))
    ]
  };
  
  const calculate = () => {
    const fn = calculationsById[data.id];
    const valueArray = fn ? fn(inputs) : [];
    setValues(valueArray);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <ul>
        {data.inputTitles.map((inputLabel, index) => (
          <>
            {inputLabel}
            <input
              type="number"
              className="form-control"
              value={inputs[index] || ''}
              onChange={(e) => handleInputChange(e, index)}
            />
          </>
        ))}
          <button className="calculate" onClick={calculate} disabled={!data.inputTitles.every((_, index) => inputs[index] !== undefined && inputs[index] !== '')}>
            Calculate
          </button>
      </ul>
      <div>
   {outputs.map((value, index) => (
    <h5 key={index}>
      {data.outputTitles?.[index] || `Output ${index + 1}`}: {value}
    </h5>
    ))}
</div>
    </div>
  );
};

export default CalculatorField;
