import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialRetirementAge = Number(
    localStorage.getItem('retirementAge') || 100
  );
  const targetRetirementAmt = Number(
    localStorage.getItem('targetRetAmt') || 100
  );
  const annualRetirementExp = Number(
    localStorage.getItem('annualRetExp') || 100
  );
  const initialCurrentAge = Number(localStorage.getItem('currentAge') || 100);
  const initialCurrentSavings = Number(
    localStorage.getItem('retirementSavings') || 100
  );
  const initialContributions = Number(
    localStorage.getItem('contributions') || 100
  );
  const initialRContributionFreq = Number(
    localStorage.getItem('contributionFreq') || 100
  );
  const initialPreRetROR = Number(localStorage.getItem('preRetROR') || 100);
  const initialPostRetROR = Number(localStorage.getItem('postRetROR') || 100);
  const initialInflation = Number(localStorage.getItem('inflation') || 100);

  return (
    <div className="App">
      <h1>Retirement Calculator</h1>
      <h2>You can retire at age </h2>
      <div>Target Retirement Amount: </div>
      <form className="fire-calc-form">
        <label>
          {' '}
          Annual Retirement Expenses
          <input type="number" />
        </label>
        <label>
          {' '}
          Current Age
          <input type="number" />
        </label>
        <label>
          {' '}
          Current Savings
          <input type="number" />
        </label>
        <label>
          {' '}
          Contribution Rate
          <input type="number" />
        </label>
        <label>
          {' '}
          Contribution Frequency
          <select name="" id="">
            <option value="Weekly">Weekly</option>
            <option value="Bi-Weekly">Bi-Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>
        </label>
        <div>
          <h2>Advanced</h2>
          <label htmlFor="">
            Pre-Retirement Rate of Return
            <input type="number" />
          </label>
          <label htmlFor="">
            Post-Retirement Rate of Return
            <input type="number" />
          </label>
          <label htmlFor="">
            Rate of Inflation
            <input type="number" />
          </label>
        </div>
      </form>
    </div>
  );
}

export default App;
