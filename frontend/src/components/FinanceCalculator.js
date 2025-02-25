import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Result = styled.p`
  font-size: 1.2em;
  color: #007bff;
`;

function FinanceCalculator({ finance, onSave }) {
  const [form, setForm] = useState({
    equity: finance?.equity || 0,
    loanAmount: finance?.loanAmount || 0,
    interestRate: finance?.interestRate || 0,
    term: finance?.term || 0,
    additionalCosts: finance?.additionalCosts || { notary: 0, landTax: 5, brokerFee: 0 }, // Leipzig: 5% Grunderwerbsteuer
    budget: finance?.budget || { plannedExpenses: 0, reserves: 0 },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div>
      <h2>Finanzkalkulator</h2>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Eigenkapital (€)</Label>
          <input
            type="number"
            value={form.equity}
            onChange={(e) => setForm({ ...form, equity: Number(e.target.value) })}
          />
        </InputGroup>
        <InputGroup>
          <Label>Darlehenshöhe (€)</Label>
          <input
            type="number"
            value={form.loanAmount}
            onChange={(e) => setForm({ ...form, loanAmount: Number(e.target.value) })}
          />
        </InputGroup>
        <InputGroup>
          <Label>Zinssatz (%)</Label>
          <input
            type="number"
            step="0.01"
            value={form.interestRate}
            onChange={(e) => setForm({ ...form, interestRate: Number(e.target.value) })}
          />
        </InputGroup>
        <InputGroup>
          <Label>Laufzeit (Jahre)</Label>
          <input
            type="number"
            value={form.term}
            onChange={(e) => setForm({ ...form, term: Number(e.target.value) })}
          />
        </InputGroup>
        <h3>Nebenkosten</h3>
        <InputGroup>
          <Label>Notar (%)</Label>
          <input
            type="number"
            step="0.01"
            value={form.additionalCosts.notary}
            onChange={(e) => setForm({ ...form, additionalCosts: { ...form.additionalCosts, notary: Number(e.target.value) } })}
          />
        </InputGroup>
        <InputGroup>
          <Label>Grunderwerbsteuer (%)</Label>
          <input
            type="number"
            step="0.01"
            value={form.additionalCosts.landTax}
            onChange={(e) => setForm({ ...form, additionalCosts: { ...form.additionalCosts, landTax: Number(e.target.value) } })}
          />
          <small>Für Leipzig: 5%</small>
        </InputGroup>
        <InputGroup>
          <Label>Maklercourtage (%)</Label>
          <input
            type="number"
            step="0.01"
            value={form.additionalCosts.brokerFee}
            onChange={(e) => setForm({ ...form, additionalCosts: { ...form.additionalCosts, brokerFee: Number(e.target.value) } })}
          />
        </InputGroup>
        <h3>Budget</h3>
        <InputGroup>
          <Label>Geplante Ausgaben (€)</Label>
          <input
            type="number"
            value={form.budget.plannedExpenses}
            onChange={(e) => setForm({ ...form, budget: { ...form.budget, plannedExpenses: Number(e.target.value) } })}
          />
        </InputGroup>
        <InputGroup>
          <Label>Rücklagen (€)</Label>
          <input
            type="number"
            value={form.budget.reserves}
            onChange={(e) => setForm({ ...form, budget: { ...form.budget, reserves: Number(e.target.value) } })}
          />
        </InputGroup>
        <button type="submit">Speichern</button>
      </Form>
      {finance?.monthlyRate && <Result>Monatliche Rate: {finance.monthlyRate.toFixed(2)} €</Result>}
    </div>
  );
}

export default FinanceCalculator;