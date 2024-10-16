import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkoutChart = ({ totalCalories }) => {

  const data = {
    labels: ['Calories Burned'],
    datasets: [
      {
        label: 'Workout Data',
        data: [totalCalories],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Calories Burned
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Allow control over the aspect ratio
    aspectRatio: 0.5,  // Make it more vertical (smaller width)
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Workout Statistics',
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0, // Prevent x-axis label rotation
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

export default WorkoutChart;
