import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const ExerciseChart = ({ exerciseData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (!chartInstance.current) {
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Aerobic', 'Cardio', 'Resistance'],
            datasets: [
              {
                data: [
                  exerciseData.filter((exercise) => exercise.type === 'aerobic').length,
                  exerciseData.filter((exercise) => exercise.type === 'cardio').length,
                  exerciseData.filter((exercise) => exercise.type === 'resistance').length,
                ],
                backgroundColor: ['#53777a', '#c02942', '#d95b43'],
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                suggestedMax: 10, // Set a fixed maximum value for the y-axis (adjust as needed)
              },
            },
            title: {
              display: true,
              text: 'Number of Exercises by Type',
            },
          },
        });
      } else {
        chartInstance.current.data.datasets[0].data = [
          exerciseData.filter((exercise) => exercise.type === 'aerobic').length,
          exerciseData.filter((exercise) => exercise.type === 'cardio').length,
          exerciseData.filter((exercise) => exercise.type === 'resistance').length,
        ];
        chartInstance.current.update();
      }
    }
  }, [exerciseData]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ExerciseChart;
