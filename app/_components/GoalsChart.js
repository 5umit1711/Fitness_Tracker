import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GoalsChart = ({ totalGoals, achievedGoals }) => {
  const notAchievedGoals = totalGoals - achievedGoals;

  const data = {
    labels: ['Achieved Goals', 'Not Achieved Goals'],
    datasets: [
      {
        data: [achievedGoals, notAchievedGoals],
        backgroundColor: ['#81C784', '#EF5350'], // Lighter shades
        hoverBackgroundColor: ['#A5D6A7', '#EF9A9A'], // Lighter hover colors
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.raw + (totalGoals - tooltipItem.raw);
            const percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-5">
      <Pie data={data} options={options} />
    </div>
  );
};

export default GoalsChart;
