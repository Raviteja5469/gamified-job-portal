import React from 'react'

import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function ReportChart({ type, data, options, title }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="max-w-md mx-auto">
        {type === 'pie' ? (
          <Pie data={data} options={options} />
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </div>
  );
}

export default ReportChart;
