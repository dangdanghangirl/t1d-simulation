import React from 'react';
import type { GameState } from '../types/GameState';

interface ManagementPanelProps {
  state: GameState;
  openMealModal: () => void;
  openInsulinModal: () => void;
  // 운동 등 추가 이벤트 핸들러 필요시 여기에
}

const ManagementPanel: React.FC<ManagementPanelProps> = ({ state, openMealModal, openInsulinModal }) => {
  return (
    <div className="management-panel">
      <div className="card">
        <div className="card__header">
          <h3>혈당 관리</h3>
        </div>
        <div className="card__body">
          <button className="btn btn--primary" onClick={openMealModal}>식사 입력</button>
          <button className="btn btn--primary" onClick={openInsulinModal}>인슐린 주입</button>
          {/* 운동 등 추가 버튼 */}
        </div>
      </div>
    </div>
  );
};

export default ManagementPanel;
