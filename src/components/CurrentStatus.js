import React from 'react';

function CurrentStatus({ state }) {
  return (
    <div className="game-status">
      <div className="current-time">
        <span className="label">현재 시간:</span>
        <span id="current-time">{state.currentTime ? `${String(Math.floor(state.currentTime/60)).padStart(2,'0')}:${String(state.currentTime%60).padStart(2,'0')}` : '08:00'}</span>
      </div>
      <div className="current-glucose">
        <span className="label">현재 혈당:</span>
        <span id="current-glucose">{Math.round(state.currentGlucose)}</span>
        <span className="unit">mg/dL</span>
      </div>
      <div className="insulin-status">
        <span className="label">활성 인슐린:</span>
        <span id="active-insulin">{state.activeInsulin.toFixed(1)}</span>
        <span className="unit">units</span>
      </div>
    </div>
  );
}

export default CurrentStatus;
