import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TimeSpentChart = ({ totalTimeSpent }) => {

  const data = {
    labels: ['Total Time Spent'],
    datasets: [
      {
        label: 'Workout Data',
        data: [totalTimeSpent],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',  
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  
    aspectRatio: 0.5, 
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Goal Statistics',
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0, 
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-5" style={{ width: '250px', height: '400px' }}> {/* Control container size */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default TimeSpentChart;
