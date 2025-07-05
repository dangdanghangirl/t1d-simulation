import React, { useState } from "react";

interface InsulinCardProps {
  maxDose: number;
  onInject: (dose: number) => void;
  onClose?: () => void;
}

const InsulinCard: React.FC<InsulinCardProps> = ({ maxDose, onInject, onClose }) => {
  const [dose, setDose] = useState(1);
  return (
    <div className="card" style={{ maxWidth: 340, margin: "0 auto" }}>
      <div className="card__header">
        <h3>인슐린 주사</h3>
      </div>
      <div className="card__body">
        <label className="form-label" htmlFor="insulin-dose">주사량 (단위)</label>
        <input
          id="insulin-dose"
          type="number"
          className="form-control"
          min={1}
          max={maxDose}
          value={dose}
          onChange={e => setDose(Number(e.target.value))}
        />
        <button
          className="btn btn--primary mt-8"
          style={{ width: "100%" }}
          onClick={() => onInject(dose)}
        >
          {dose} 단위 주사하기
        </button>
      </div>
      {onClose && (
        <div className="card__footer">
          <button className="btn btn--outline btn--sm" onClick={onClose}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default InsulinCard;
