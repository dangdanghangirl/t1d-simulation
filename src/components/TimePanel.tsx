import React from 'react';
import type { GameState } from '../types/GameState';

interface TimePanelProps {
  state: GameState;
  advanceTime: () => void;
}

const TimePanel: React.FC<TimePanelProps> = ({ state, advanceTime }) => {
  return (
    <div className="time-panel">
      <div className="card">
        <div className="card__body">
          <div>현재 시간: {`${Math.floor(state.currentTime / 60).toString().padStart(2, '0')}:${(state.currentTime % 60).toString().padStart(2, '0')}`}</div>
          <button className="btn btn--secondary" onClick={advanceTime}>30분 진행</button>
        </div>
      </div>
    </div>
  );
};

export default TimePanel;
