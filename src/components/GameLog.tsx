import React from 'react';

interface GameLogProps {
  state: any;
}

const GameLog = ({ state }: GameLogProps) => {
  return (
    <div className="game-log">
      <div className="card">
        <div className="card__header">
          <h3>활동 로그</h3>
        </div>
        <div className="card__body">
          <div id="log-content">
            <p>게임을 시작하세요...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLog;
