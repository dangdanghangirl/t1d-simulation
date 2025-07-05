import React, { Dispatch, SetStateAction } from 'react';
import { GameState } from '../types/GameState';

interface InsulinModalProps {
  state: GameState;
  setState: Dispatch<SetStateAction<GameState>>;
}

const InsulinModal = ({ state, setState }: InsulinModalProps) => {
  if (!state.showInsulinModal) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>인슐린 주입</h3>
          <button className="modal-close" onClick={() => setState((s: any) => ({ ...s, showInsulinModal: false }))}>&times;</button>
        </div>
        <div className="modal-body">
          {/* 인슐린 입력 UI 구현 예정 */}
          <p>인슐린 입력 UI 구현 예정</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn--secondary" onClick={() => setState((s: any) => ({ ...s, showInsulinModal: false }))}>취소</button>
          <button className="btn btn--primary">인슐린 주입</button>
        </div>
      </div>
    </div>
  );
};

export default InsulinModal;
