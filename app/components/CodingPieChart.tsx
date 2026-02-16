'use client'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

interface CodingPieChartProps {
  languageData: ProcessedLanguageData[];
}

const CodingPieChart = ({ languageData }: CodingPieChartProps) => {
  const chartData = {
    labels: languageData.map(lang => lang.name),
    datasets: [
      {
        data: languageData.map(lang => lang.totalLines),
        backgroundColor: languageData.map(lang => lang.color || '#CCCCCC'),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      title: {
        display: true,
        text: 'Languages Used (by lines of code)',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${context.raw.toLocaleString()} lines (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-80">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default CodingPieChart;