import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialRetirementAge = Number(
    localStorage.getItem('retirementAge') || 100
  );
  const targetRetirementAmt = Number(localStorage.getItem('targetRetAmt') || 0);
  const annualRetirementExp = Number(localStorage.getItem('annualRetExp') || 0);
  const initialCurrentAge = Number(localStorage.getItem('currentAge') || 25);
  const initialCurrentSavings = Number(
    localStorage.getItem('retirementSavings') || 10
  );
  const initialContributions = Number(
    localStorage.getItem('contributions') || 250
  );
  const initialRContributionFreq = Number(
    localStorage.getItem('contributionFreq') || 'Bi-Weekly'
  );
  const initialPreRetROR = Number(localStorage.getItem('preRetROR') || 7);
  const initialPostRetROR = Number(localStorage.getItem('postRetROR') || 7);
  const initialInflation = Number(localStorage.getItem('inflation') || 3);

  const [retirementAge, setRetirementAge] = useState(initialRetirementAge);
  const [targetRetAmt, setTargetRetAmt] = useState(targetRetirementAmt);
  const [annualRetExp, setAnnualRetExp] = useState(annualRetirementExp);
  const [currentAge, setCurrentAge] = useState(initialCurrentAge);
  const [currentSavings, setCurrentSavings] = useState(initialCurrentSavings);
  const [contributions, setContributions] = useState(initialContributions);
  const [contributionFreq, setContributionFreq] = useState(
    initialRContributionFreq
  );
  const [preRetROR, setPreRetROR] = useState(initialPreRetROR);
  const [postRetROR, setPostRetROR] = useState(initialPostRetROR);
  const [inflation, setInflation] = useState(initialInflation);

  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const calcRetirementAge = (updatedTargetRetAmt) => {
    const netPreRetROR = (preRetROR - inflation) / 100;
    let currentBalance = currentSavings;
    const annualContributions =
      contributionFreq === 'Annually' ? contributions : contributions * 12;
    let retAge = currentAge;

    while (currentBalance < updatedTargetRetAmt) {
      currentBalance =
        annualContributions + currentBalance * (1 + netPreRetROR);
      retAge += 1;

      if (retAge > 80) break;
    }

    return retAge;
  };

  useEffect(() => {
    localStorage.setItem('retirementAge', retirementAge);
    localStorage.setItem('targetRetAmt', targetRetAmt);
    localStorage.setItem('annualRetExp', annualRetExp);
    localStorage.setItem('currentAge', currentAge);
    localStorage.setItem('currentSavings', currentSavings);
    localStorage.setItem('contributions', contributions);
    localStorage.setItem('contributionFreq', contributionFreq);
    localStorage.setItem('preRetROR', preRetROR);
    localStorage.setItem('postRetROR', postRetROR);
    localStorage.setItem('inflation', inflation);

    let netPostROR = (postRetROR - inflation) / 100;

    if (netPostROR === 0) netPostROR = 0.00001;

    let updatedTargetRetAmt = annualRetExp / netPostROR;
    setTargetRetAmt(updatedTargetRetAmt);

    const retAge = calcRetirementAge(updatedTargetRetAmt);
    setRetirementAge(retAge);
  }, [
    retirementAge,
    targetRetAmt,
    annualRetExp,
    currentAge,
    currentSavings,
    contributions,
    contributionFreq,
    preRetROR,
    postRetROR,
    inflation,
  ]);

  return (
    <div className="App">
      <h1>Retirement Calculator</h1>
      <h2>You can retire at age {retirementAge}</h2>
      <div>Target Retirement Amount: {formatter.format(targetRetAmt)}</div>
      <form className="fire-calc-form">
        <label>
          {' '}
          Annual Retirement Expenses
          <input
            type="number"
            value={annualRetirementExp}
            onChange={(e) => setAnnualRetExp(parseInt(e.target.value) || 0)}
          />
        </label>
        <label>
          {' '}
          Current Age
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(parseInt(e.target.value) || 0)}
          />
        </label>
        <label>
          {' '}
          Current Savings
          <input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(parseInt(e.target.value) || 0)}
          />
        </label>
        <label>
          {' '}
          Contribution Rate
          <input
            type="number"
            value={contributions}
            onChange={(e) => setContributions(parseInt(e.target.value) || 0)}
          />
        </label>
        <label>
          {' '}
          Contribution Frequency
          <select name="" id="">
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>
        </label>
        <div>
          <h2>Advanced</h2>
          <label htmlFor="">
            Pre-Retirement Rate of Return
            <input
              type="number"
              value={preRetROR}
              onChange={(e) => setPreRetROR(parseInt(e.target.value) || 0)}
            />
          </label>
          <label htmlFor="">
            Post-Retirement Rate of Return
            <input
              type="number"
              value={postRetROR}
              onChange={(e) => setPostRetROR(parseInt(e.target.value) || 0)}
            />
          </label>
          <label htmlFor="">
            Rate of Inflation
            <input
              type="number"
              value={inflation}
              onChange={(e) => setInflation(parseInt(e.target.value) || 0)}
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default App;
