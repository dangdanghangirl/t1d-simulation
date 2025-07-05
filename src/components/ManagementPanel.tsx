import React from 'react';

interface ManagementPanelProps {
  // TODO: 필요한 props 정의 (상태, setState 등)
}

const ManagementPanel: React.FC<ManagementPanelProps> = (props) => {
  return (
    <div className="management-panel">
      <div className="card">
        <div className="card__header">
          <h3>혈당 관리</h3>
        </div>
        <div className="card__body">
          {/* 탭 및 각종 입력/액션 UI 구현 예정 */}
          <div>관리 패널 (인슐린/식사/운동 탭 등)</div>
        </div>
      </div>
    </div>
  );
};

export default ManagementPanel;
