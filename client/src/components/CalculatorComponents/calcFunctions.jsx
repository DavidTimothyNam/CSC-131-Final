import React from 'react';

export function minusPowRateMonths(rateDEC, months){
    return (1 - Math.pow(1 + rateDEC, -months));
}
export function MonthlyPaymentWithMonths(amount, rate, months){
    const rateDEC = rate / 1200;
    return ((amount * rateDEC) / minusPowRateMonths(rateDEC, months));
}

export function MonthlyPaymentWithYears(amount, rate, years){
    const rateDEC = rate / 1200;
    const months = years * 12;
    return ((amount * rateDEC) / minusPowRateMonths(rateDEC, months));
}

export function loanValueMonths(amount, rate, months){
    return (MonthlyPaymentWithMonths(amount, rate, months) * months)
}

export function loanValueYears(amount, rate, years){
    return (MonthlyPaymentWithYears(amount, rate, years) * (years * 12))
}

export function maxMortgageMonthly(income, obligations){
    return (income * .28) - obligations;
}

export function maxLoanAmountMonths(income, obligations, rate, months, downPayment) {
  const maxMortgage = (income * 0.28) - obligations;
  const rateDEC = rate / 1200;

  // More precision for intermediate calculations
  const loanAmount = (maxMortgage * (1 - Math.pow(1 + rateDEC, -months))) / rateDEC;

  // Return total home price with down payment added
  return loanAmount + downPayment;
}

export function totalPaymentClosing(loan, rate, months, closing){
    const total = months * MonthlyPaymentWithMonths(loan, rate, months);
    return total + closing;
}

export function mortgageAcceleration(loan, rate, months, payments, extra, mode) {
  const rateDEC = rate / 1200;
  const originalPayment = MonthlyPaymentWithMonths(loan, rate, months);

  let balance = loan;
  for (let i = 0; i < payments; i++) {
    const interest = balance * rateDEC;
    const principal = originalPayment - interest;
    balance -= principal;
  }

  const newPayment = originalPayment + extra;
  let newTerm = 0;
  let totalWithExtraInterest = 0;

  while (balance > 0.01) {
    const interest = balance * rateDEC;
    let principal = newPayment - interest;

    if (principal > balance) {
      principal = balance;
      totalWithExtraInterest += interest;
      balance = 0;
      newTerm += balance / principal;
      break;
    }

    balance -= principal;
    totalWithExtraInterest += interest;
    newTerm++;
  }

  const originalTotalInterest = (originalPayment * months) - loan;
  const interestSaved = originalTotalInterest - totalWithExtraInterest;
  const timeSaved = months - (payments + newTerm);

  return (mode === 1) ? interestSaved : timeSaved;
}

  export function creditCardDebtTotalMonths(balance, rate, monthlyPayment){
    const monthlyRate = rate/1200;
    let months = 0;
    let currentBalance = balance;

    while (currentBalance > 0 && months < 1000) {
        const interest = currentBalance * monthlyRate;
        currentBalance = currentBalance + interest - monthlyPayment;
        if (currentBalance < 0) currentBalance = 0;
            months ++;
   }
  return months;
 }
  export function creditCardDebtTotalInterest(balance, rate, monthlyPayment) {
    const totalMonths = creditCardDebtTotalMonths(balance, rate, monthlyPayment);
    const totalPaid = monthlyPayment * totalMonths;
    return (totalPaid - balance);
 }

 export function leaseMonthlyPaymentResidual(leaseAmount, downPayment, residualValue, leasePeriod, rate) {
  const capCost = leaseAmount - downPayment;
  const depreciation = (capCost - residualValue) / leasePeriod;
  const monthlyRate = rate / 1200;

  const financeCharge = ((capCost + residualValue) / 2) * monthlyRate;
  return depreciation + financeCharge;
}

export function leaseTotalInterestResidual(leaseAmount, downPayment, residualValue, leasePeriod, rate) {
  const monthlyPayment = leaseMonthlyPaymentResidual(leaseAmount, downPayment, residualValue, leasePeriod, rate);
  const totalPaid = monthlyPayment * leasePeriod;
  const principalUsed = leaseAmount - downPayment - residualValue;

  return totalPaid - principalUsed;
}

  export function carAffordabilityTotal(monthlyPayment, downPayment, rate, months) {
    const rateDEC = rate / 1200;
    const loanAmount = (monthlyPayment * minusPowRateMonths(rateDEC, months)) / rateDEC;
    return (loanAmount + downPayment);
}

  export function carAffordabilityInterest(monthlyPayment, downPayment, rate, months) {
    const rateDEC = rate / 1200;
    const loanAmount = (monthlyPayment * minusPowRateMonths(rateDEC, months)) / rateDEC;

    const totalPaid = monthlyPayment * months;
    return totalPaid - loanAmount;
}

  export function collegeTotalCost(yearsUntilStart, yearsAttending, annualCost, saved) {
    const inflation = 1.05; // 5% annual inflation
    let totalCost = 0;
    
    for(let i = yearsUntilStart; i < yearsUntilStart + yearsAttending; i++) {
        totalCost += annualCost * Math.pow(inflation, i);
    }
    return (totalCost - saved);
}

  export function collegeAnnualSavings(yearsUntilStart, totalCost) {
    const rate = 0.07; // 7% annual return assumption
    return (totalCost / ((Math.pow(1 + rate, yearsUntilStart) - 1) / rate));
}

  export function annualSavingsNeeded(current, goal, years) {
    const rate = 0.07; // 7% annual return assumption
    const futureValue = goal - current * Math.pow(1 + rate, years);
    return (futureValue / ((Math.pow(1 + rate, years) - 1) / rate));
}

export function savingsAccumulated(current, upcoming, years){
  const rate = 0.07;
  const accumulation = current * Math.pow(1 + rate, years) + upcoming * ((Math.pow(1+rate, years) -  1) / rate);
  return accumulation;
}

export function equivalentYield(bracket, bond){
  const taxRate = bracket / 100;
  const bonds = bond / 100;

  if (taxRate >= 1) throw new Error("Tax rate must be less than 100%.");

  const equivalent = bonds / (1 - taxRate);
  return equivalent * 100; // return as percentage
}

export function totalSavings(currentAge, retirementAge, currentSavings, annualContribution) {
  const yearsToRetire = retirementAge - currentAge;
  const r = 0.05;

  const savingsAtRetirement =
    currentSavings * Math.pow(1 + r, yearsToRetire) +
    annualContribution * ((Math.pow(1 + r, yearsToRetire) - 1) / r);

  return savingsAtRetirement;
}

export function yearlySpending(currentAge, retirementAge, currentSavings, annualContribution) {
  const yearsInRetire = 90 - retirementAge;
  const r = 0.05;

  const savingsAtRetirement = totalSavings(currentAge, retirementAge, currentSavings, annualContribution);
  const annuityFactor = (1 - Math.pow(1 + r, -yearsInRetire)) / r;

  return savingsAtRetirement / annuityFactor;
}

export function calculateRMD(currentAge, accountBalance) {
  if (currentAge < 73) return null;
  
  const lifeExpectancyTable = {
    72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9,
    78: 22.0, 79: 21.1, 80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7,
    84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4, 88: 13.7, 89: 12.9,
    90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9,
    96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4, 101: 6.0,
    102: 5.6, 103: 5.2, 104: 4.9, 105: 4.5, 106: 4.2, 107: 3.9,
    108: 3.7, 109: 3.4, 110: 3.1, 111: 2.9, 112: 2.6, 113: 2.4,
    114: 2.1, 115: 1.9, 116: 1.7, 117: 1.5, 118: 1.4, 119: 1.2,
    120: 1.0
  };

  const factor = lifeExpectancyTable[currentAge];
  return accountBalance / factor;
}

export function futureCost(currentCost, time, inflation){
  const inflationRate = inflation / 100;
  return currentCost * Math.pow(1 + inflationRate, time);
}

export function taxesPenalties(tax, withdraw){
  const rate = tax / 100;
  const onAmount = withdraw * rate;
  const penalty = withdraw * .1;

  return onAmount + penalty;
}

export function remainingWithdrawl(tax, withdraw){
  return withdraw - taxesPenalties(tax, withdraw);
}

export function portfolioLifespan(balance, annualReturn, inflation, monthlyWithdrawal){
  const realReturn = (1 + annualReturn / 100) / (1 + inflation / 100) - 1;
  const r = Math.pow(1 + realReturn, 1 / 12) - 1;

  if (monthlyWithdrawal <= balance * r) return Infinity;

  const n = Math.log(monthlyWithdrawal / (monthlyWithdrawal - balance * r)) / Math.log(1 + r);
  return n / 12; // convert months to years
}

export function federalTax(statusDeductions, income, sponsors, deductions){
  const sd = Number(statusDeductions) || 0;
  const inc = Number(income) || 0;
  const sp = Number(sponsors) || 0;
  const ded = Number(deductions) || 0;

  const totalDeductions = Math.max(sd, ded);
  const taxableIncome = Math.max(0, inc - sp - totalDeductions);

  const tax = taxableIncome * 0.2;
  return isFinite(tax) ? tax : 0;
}

export function taxableGrowth(savedAmount, futureAnnualSavings, expectedYears, annualRateOfReturn, taxBracket) {
  const preTaxAnnualRateOfReturn = annualRateOfReturn / 100;
  const taxBracketDecimal = taxBracket / 100;

  if (preTaxAnnualRateOfReturn <= 0 || expectedYears <= 0 || savedAmount < 0 || futureAnnualSavings < 0) {
    return 0; 
  }

  const afterTaxRate = preTaxAnnualRateOfReturn * (1 - taxBracketDecimal);

  if (afterTaxRate <= 0) {
    return savedAmount + futureAnnualSavings * expectedYears;
  }

  let taxableGrowth = savedAmount * Math.pow(1 + afterTaxRate, expectedYears);
  taxableGrowth += futureAnnualSavings * ((Math.pow(1 + afterTaxRate, expectedYears) - 1) / afterTaxRate);

  return taxableGrowth;
}

export function deferredGrowth(savedAmount, futureAnnualSavings, expectedYears, annualRateOfReturn) {
  const preTaxAnnualRateOfReturn = annualRateOfReturn / 100;

  if (preTaxAnnualRateOfReturn <= 0 || expectedYears <= 0 || savedAmount < 0 || futureAnnualSavings < 0) {
    return 0;
  }

  let deferredGrowth = savedAmount * Math.pow(1 + preTaxAnnualRateOfReturn, expectedYears);
  deferredGrowth += futureAnnualSavings * ((Math.pow(1 + preTaxAnnualRateOfReturn, expectedYears) - 1) / preTaxAnnualRateOfReturn);

  return deferredGrowth;
}

export function projectedIRABalance(currentAge, currentIRABalance, preTaxRateOfReturnIRA, workingTaxBracket, expectedWithdrawalAge, expectedPreTaxRateOfReturnWithdrawals) {
  const yearsToWithdrawal = expectedWithdrawalAge - currentAge;

  if (yearsToWithdrawal <= 0 || currentIRABalance < 0 || preTaxRateOfReturnIRA < 0) {
    return 0;
  }

  const projectedBalance = currentIRABalance * Math.pow(1 + preTaxRateOfReturnIRA / 100, yearsToWithdrawal);
  console.log(projectedBalance);
  return projectedBalance;
}

export function iraAfterTaxValue(currentAge, currentIRABalance, preTaxRateOfReturnIRA, workingTaxBracket, expectedWithdrawalAge, expectedPreTaxRateOfReturnWithdrawals) {
  const projectedBalance = projectedIRABalance(currentAge, currentIRABalance, preTaxRateOfReturnIRA, workingTaxBracket, expectedWithdrawalAge, expectedPreTaxRateOfReturnWithdrawals);

  if (projectedBalance <= 0 || workingTaxBracket < 0) {
    return 0;
  }
  const afterTaxValue = projectedBalance * (1 - workingTaxBracket / 100);
  return afterTaxValue;
}

export function rothAfterTax(currentAge, currentIRABalance, preTaxRateOfReturnIRA, workingTaxBracket, expectedWithdrawalAge, expectedPreTaxRateOfReturnWithdrawals) {
  const yearsToWithdrawal = expectedWithdrawalAge - currentAge;

  if (yearsToWithdrawal <= 0 || currentIRABalance < 0 || preTaxRateOfReturnIRA < 0 || expectedPreTaxRateOfReturnWithdrawals < 0) {
    return 0;
  }

  const iraAfterTax = iraAfterTaxValue(currentAge, currentIRABalance, preTaxRateOfReturnIRA, workingTaxBracket, expectedWithdrawalAge, expectedPreTaxRateOfReturnWithdrawals);
  const rothValue = iraAfterTax * Math.pow(1 + expectedPreTaxRateOfReturnWithdrawals / 100, yearsToWithdrawal);

  return rothValue;
}

export function estateTax(grossEstateValue, deductions) {
  const netEstateValue = grossEstateValue - deductions;

  const estateTax = netEstateValue * .4;

  return estateTax;
}