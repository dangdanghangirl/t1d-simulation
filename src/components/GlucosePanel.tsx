import React from 'react';

interface GlucosePanelProps {
  glucose: number;
  status: string;
  statusLabel: string;
  statusColor: string;
  children?: React.ReactNode; // 차트 등 추가 렌더링용
}

const GlucosePanel: React.FC<GlucosePanelProps> = ({ glucose, status, statusLabel, statusColor, children }) => (
  <div className="blood-glucose-panel">
    <div className="card">
      <div className="card__header">
        <h3>혈당 모니터링</h3>
      </div>
      <div className="card__body">
        <div className="glucose-display">
          <div className="glucose-value">
            <span id="glucose-number">{Math.round(glucose)}</span>
            <span className="glucose-unit">mg/dL</span>
          </div>
          <div id="glucose-status" className="status status--success" style={{backgroundColor: statusColor + '20', color: statusColor, borderColor: statusColor}}>
            {statusLabel}
          </div>
        </div>
        <div className="glucose-chart">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default GlucosePanel;
