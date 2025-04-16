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

  useEffect(() => {
    resetStates();
  }, [data]);

  const resetStates = () => {
    setInputs({});
    setValues([]);
  }

  const calculationsById = {
    1: (inputs) => [
      calcFunctions.MonthlyPaymentWithMonths(inputs[0], inputs[1], inputs[2]).toFixed(2),
      calcFunctions.loanValueMonths(inputs[0], inputs[1], inputs[2]).toFixed(2)
    ],
    2: (inputs) => [
      calcFunctions.maxMortgageMonthly(inputs[0], inputs[1]).toFixed(2),
      calcFunctions.maxLoanAmountMonths(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4]).toFixed(2)
    ],
    3: (inputs) => [
      calcFunctions.MonthlyPaymentWithMonths(inputs[0], inputs[1], inputs[2]).toFixed(2),
      calcFunctions.totalPaymentClosing(inputs[0], inputs[1], inputs[2], inputs[3]).toFixed(2)
    ],
    4: (inputs) => [
      calcFunctions.mortgageAcceleration(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4], 1),
      calcFunctions.mortgageAcceleration(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4], 2)
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