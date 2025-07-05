import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { GameState } from '../types/GameState';

interface ActionPanelProps {
  state: GameState;
  setState: Dispatch<SetStateAction<GameState>>;
}

const ActionPanel = ({ state, setState }: ActionPanelProps) => {
  return (
    <div className="action-panel">
      <div className="card">
        <div className="card__header">
          <h3>행동 선택</h3>
        </div>
        <div className="card__body">
          <div className="action-buttons">
            <button className="btn btn--primary" onClick={() => setState((s: any) => ({ ...s, showMealModal: true }))}>식사하기</button>
            <button className="btn btn--secondary" onClick={() => setState((s: any) => ({ ...s, showInsulinModal: true }))}>인슐린 주입</button>
            <button className="btn btn--outline">운동하기</button>
            <button className="btn btn--outline">시간 진행</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;
