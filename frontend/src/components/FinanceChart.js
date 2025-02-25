import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinanceChart = ({ finance, properties }) => {
  // Anpassung an zusätzliche Kosten als Objekt:
  const additionalCostsTotal = Object.values(finance.additionalCosts).reduce((sum, cost) => sum + cost, 0);
  // Budget als Summe aus geplanten Ausgaben und Rücklagen:
  const totalBudget = (finance.budget.plannedExpenses || 0) + (finance.budget.reserves || 0);

  const data = {
    labels: ['Eigenkapital', 'Darlehen', 'Nebenkosten', 'Budget', ...properties.map(p => p.name)],
    datasets: [
      {
        label: 'Betrag (€)',
        data: [
          finance.equity,
          finance.loanAmount,
          additionalCostsTotal,
          totalBudget,
          ...properties.map(p => p.price),
        ],
        backgroundColor: [
          '#28a745',
          '#007bff',
          '#dc3545',
          '#ffc107',
          ...properties.map(() => '#6c757d'),
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Finanzübersicht und Budgetvergleich' },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Betrag (€)' } },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FinanceChart;
