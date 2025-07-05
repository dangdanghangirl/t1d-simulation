import React from 'react';

interface GlucoseChartProps {
  state: {
    glucoseHistory: number[];
    timeLabels: string[];
  };
}

const GlucoseChart = ({ state }: GlucoseChartProps) => {
  return (
    <div className="card">
      <div className="card__header">
        <h3>혈당 추이</h3>
        <div className="glucose-range-info">
          <span className="range-optimal">목표: 80-180 mg/dL</span>
          <span className="range-ideal">이상: 100-140 mg/dL</span>
        </div>
      </div>
      <div className="card__body">
        <div className="chart-container">
          {/* Chart.js 차트는 추후 react-chartjs-2로 대체 */}
          <canvas id="glucose-chart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default GlucoseChart;
