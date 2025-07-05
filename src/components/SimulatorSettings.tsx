import React, { useState } from 'react';
import { useDiabetesSimulator } from '../hooks/useDiabetesSimulator';

const SimulatorSettings: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { gameState, setCharacterName, setICR, setISF, explainICR, explainISF } = useDiabetesSimulator();
  const [name, setName] = useState(gameState.characterName || '');
  const [icr, setIcr] = useState(gameState.icr || 15);
  const [isf, setIsf] = useState(gameState.isf || 50);

  return (
    <div className="card" style={{ maxWidth: 400, margin: '40px auto' }}>
      <div className="card__header">
        <h3>시뮬레이터 설정</h3>
      </div>
      <div className="card__body">
        <div className="form-group">
          <label className="form-label">캐릭터 이름</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="이름을 입력하세요" />
        </div>
        <div className="form-group">
          <label className="form-label">인슐린:탄수화물 비율 (ICR)</label>
          <input className="form-control" type="number" min={5} max={30} value={icr} onChange={e => setIcr(Number(e.target.value))} />
          <div className="text-secondary" style={{ fontSize: 13 }}>{explainICR}</div>
        </div>
        <div className="form-group">
          <label className="form-label">인슐린 민감도 (ISF)</label>
          <input className="form-control" type="number" min={10} max={100} value={isf} onChange={e => setIsf(Number(e.target.value))} />
          <div className="text-secondary" style={{ fontSize: 13 }}>{explainISF}</div>
        </div>
      </div>
      <div className="card__footer">
        <button className="btn btn--primary" style={{ width: '100%' }}
          disabled={!name || !icr || !isf}
          onClick={() => {
            setCharacterName(name);
            setICR(icr);
            setISF(isf);
            onComplete();
          }}>
          설정 완료
        </button>
      </div>
    </div>
  );
};

export default SimulatorSettings;
