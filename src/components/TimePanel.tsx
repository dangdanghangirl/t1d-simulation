import React from 'react';

interface TimePanelProps {
  // TODO: 필요한 props 정의 (시간, 일시정지, 배속 등)
}

const TimePanel: React.FC<TimePanelProps> = (props) => {
  return (
    <div className="time-panel">
      <div className="card">
        <div className="card__body">
          {/* 시간 표시, 일시정지/배속 버튼, 응급 알림 등 구현 예정 */}
          <div>시간 및 상태 패널</div>
        </div>
      </div>
    </div>
  );
};

export default TimePanel;
