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

export function maxLoanAmountMonths(income, obligations, rate, months, downPayment){
    const maxMortgage = (income * .28) - obligations;
    const rateDEC = rate / 1200;
    return ((maxMortgage * minusPowRateMonths(rateDEC, months))/ rateDEC) + downPayment
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
  
    while (balance > 0) {
      const interest = balance * rateDEC;
      let principal = newPayment - interest;
      if (principal > balance) principal = balance;
      balance -= principal;
      totalWithExtraInterest += interest;
      newTerm++;
    }
  
    const originalTotalInterest = (originalPayment * months) - loan;
    const interestSaved = (originalTotalInterest - totalWithExtraInterest).toFixed(2);
    const timeSaved = (months - (payments + newTerm)).toFixed(0); 
  
    if (mode == 1){
        return interestSaved
    }else{
        return timeSaved
    }
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
    return (totalPaid - balance).toFixed(2);
}
  export function leaseMonthlyPayment(leaseAmount, downPayment, leasePeriod, rate) {
    const principal = leaseAmount - downPayment;
    return MonthlyPaymentWithMonths(principal, rate, leasePeriod);
}

  export function leaseTotalInterest(leaseAmount, downPayment, leasePeriod, rate) {
    const monthlyPayment = leaseMonthlyPayment(leaseAmount, downPayment, leasePeriod, rate);
    const totalPaid = monthlyPayment * leasePeriod;
    const principal = leaseAmount - downPayment;
    return (totalPaid - principal).toFixed(2);
}
