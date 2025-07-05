import React from 'react';
// 추후 react-chartjs-2로 대체
function GlucoseChart({ state }) {
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
          {/* Chart.js 차트는 추후 구현 */}
          <canvas id="glucose-chart"></canvas>
        </div>
      </div>
    </div>
  );
}
export default GlucoseChart;
