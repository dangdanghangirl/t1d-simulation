import React from 'react';

interface ResultScreenProps {
  // TODO: 필요한 props 정의 (결과, 통계, 이벤트 로그 등)
}

const ResultScreen: React.FC<ResultScreenProps> = (props) => {
  return (
    <div id="result-screen" className="screen active">
      <div className="card">
        <div className="card__header">
          <h2>일일 혈당 관리 결과</h2>
        </div>
        <div className="card__body">
          {/* 결과, 통계, 피드백, 이벤트 로그 등 구현 예정 */}
          <div>결과 화면</div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
