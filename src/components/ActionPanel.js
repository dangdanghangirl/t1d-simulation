import React from 'react';

function ActionPanel({ state, setState }) {
  return (
    <div className="action-panel">
      <div className="card">
        <div className="card__header">
          <h3>행동 선택</h3>
        </div>
        <div className="card__body">
          <div className="action-buttons">
            <button className="btn btn--primary" onClick={() => setState(s => ({ ...s, showMealModal: true }))}>식사하기</button>
            <button className="btn btn--secondary" onClick={() => setState(s => ({ ...s, showInsulinModal: true }))}>인슐린 주입</button>
            <button className="btn btn--outline">운동하기</button>
            <button className="btn btn--outline">시간 진행</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ActionPanel;
