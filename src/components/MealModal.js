import React from 'react';

function MealModal({ state, setState }) {
  if (!state.showMealModal) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>식사 선택</h3>
          <button className="modal-close" onClick={() => setState(s => ({ ...s, showMealModal: false }))}>&times;</button>
        </div>
        <div className="modal-body">
          {/* 음식 선택, 영양소 정보, 인슐린 계산 등 추후 구현 */}
          <p>음식 선택 UI 구현 예정</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn--secondary" onClick={() => setState(s => ({ ...s, showMealModal: false }))}>취소</button>
          <button className="btn btn--primary">식사 확정</button>
        </div>
      </div>
    </div>
  );
}
export default MealModal;
