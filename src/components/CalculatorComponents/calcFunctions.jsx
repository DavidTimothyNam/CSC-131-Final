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
