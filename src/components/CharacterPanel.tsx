import React from 'react';

interface CharacterPanelProps {
  facial: string;
  message: string;
  age: string;
  status: string;
}

const CharacterPanel: React.FC<CharacterPanelProps> = ({ facial, message, age, status }) => (
  <div className="character-section">
    <div className="character-container">
      <div id="character" className={`character ${age} ${status.replace(/([A-Z])/g, '-$1').toLowerCase()}`}> 
        <div className="character-face">{facial}</div>
        <div className="character-body"></div>
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
