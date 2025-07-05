import React from 'react';

interface AgeSelectionProps {
  onSelect: (age: string) => void;
}

const ageOptions = [
  { key: 'child', label: '어린이', emoji: '👶', range: '5-12세' },
  { key: 'teenager', label: '청소년', emoji: '👦', range: '13-17세' },
  { key: 'youngAdult', label: '청년', emoji: '👨', range: '18-25세' },
  { key: 'adult', label: '성인', emoji: '👨‍💼', range: '26세 이상' },
];

const AgeSelection: React.FC<AgeSelectionProps> = ({ onSelect }) => (
  <div className="screen active">
    <div className="card">
      <div className="card__body">
        <h2 className="text-center mb-24">연령대를 선택하세요</h2>
        <div className="age-grid">
          {ageOptions.map(opt => (
            <div className="age-option" key={opt.key} onClick={() => onSelect(opt.key)}>
              <div className={`age-character ${opt.key}-character`}>{opt.emoji}</div>
              <h3>{opt.label}</h3>
              <p>{opt.range}</p>
              <button className="btn btn--primary btn--full-width">선택</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AgeSelection;
