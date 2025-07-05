import React from 'react';

interface CharacterPanelProps {
  facial: string;
  message: string;
  age: string;
  status: string;
}

const getBodyColor = (age: string) => {
  switch (age) {
    case 'child': return '#FFD966';
    case 'teenager': return '#A4C2F4';
    case 'youngAdult': return '#B6D7A8';
    case 'adult': return '#C27BA0';
    default: return '#B4A7D6';
  }
};

const CharacterPanel: React.FC<CharacterPanelProps> = ({ facial, message, age, status }) => (
  <div className="character-section">
    <div className="character-container">
      <div id="character" className={`character ${age} ${status.replace(/([A-Z])/g, '-$1').toLowerCase()}`}> 
        <div className="character-face" style={{fontSize: '5rem'}}>{facial}</div>
        {/* SVG 바디 */}
        <svg className="character-svg-body" width="80" height="120" viewBox="0 0 80 120" style={{marginBottom: 16}}>
          <ellipse cx="40" cy="70" rx="32" ry="45" fill={getBodyColor(age)} stroke="#888" strokeWidth="2" />
          {/* 팔 */}
          <ellipse cx="10" cy="70" rx="10" ry="25" fill={getBodyColor(age)} opacity="0.7" />
          <ellipse cx="70" cy="70" rx="10" ry="25" fill={getBodyColor(age)} opacity="0.7" />
          {/* 다리 */}
          <rect x="25" y="110" width="10" height="20" rx="5" fill="#888" />
          <rect x="45" y="110" width="10" height="20" rx="5" fill="#888" />
        </svg>
      </div>
      <div className="character-speech">
        <div id="character-message" className="speech-bubble">
          {message}
        </div>
      </div>
    </div>
  </div>
);

export default CharacterPanel;
