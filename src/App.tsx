import React, { useState } from 'react';
import AgeSelection from './components/AgeSelection';
import CharacterPanel from './components/CharacterPanel';
import GlucosePanel from './components/GlucosePanel';
import ManagementPanel from './components/ManagementPanel';
import TimePanel from './components/TimePanel';
import ResultScreen from './components/ResultScreen';
import GameLog from './components/GameLog';
import MealModal from './components/MealModal';
import InsulinModal from './components/InsulinModal';
import { useDiabetesSimulator } from './hooks/useDiabetesSimulator';
import TutorialContainer from './components/TutorialContainer';
import './App.css';

function App() {
  const [tutorialDone, setTutorialDone] = useState(false);
  const {
    gameState,
    setGameState,
    advanceTime,
    openMealModal,
    closeMealModal,
    openInsulinModal,
    closeInsulinModal,
    logEvent
  } = useDiabetesSimulator();

  const getStatus = (bg: number) => {
    if (bg <= 50) return { key: 'dangerousLow', label: '위험한 저혈당', color: '#FF0000' };
    if (bg <= 70) return { key: 'low', label: '저혈당', color: '#FF6B47' };
    if (bg <= 180) return { key: 'normal', label: '정상', color: '#4CAF50' };
    if (bg <= 250) return { key: 'high', label: '고혈당', color: '#FF9800' };
    return { key: 'dangerousHigh', label: '위험한 고혈당', color: '#FF0000' };
  };
  const statusObj = getStatus(gameState.currentGlucose);

  const facial = '😊';
  const message = '안녕하세요! 함께 혈당을 관리해봐요!';

  if (!tutorialDone) {
    return <TutorialContainer onTutorialComplete={() => setTutorialDone(true)} />;
  }

  if (!gameState.selectedAge) {
    return <AgeSelection onSelect={age => setGameState(s => ({ ...s, selectedAge: age }))} />;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>1형 당뇨 관리 시뮬레이터</h1>
        <p>실제적인 혈당 관리를 배워보세요</p>
      </header>
      <main className="main-content">
        <div className="main-panels">
          <CharacterPanel facial={facial} message={message} age={gameState.selectedAge} status={statusObj.key} />
          <GlucosePanel glucose={gameState.currentGlucose} status={statusObj.key} statusLabel={statusObj.label} statusColor={statusObj.color}>
            {/* 차트 컴포넌트 또는 캔버스 영역 추가 예정 */}
          </GlucosePanel>
          <ManagementPanel state={gameState} openMealModal={openMealModal} openInsulinModal={openInsulinModal} />
          <TimePanel state={gameState} advanceTime={advanceTime} />
        </div>
        <GameLog state={gameState} />
        <MealModal state={gameState} setState={setGameState} />
        <InsulinModal state={gameState} setState={setGameState} />
        {/* 결과 화면은 조건부 렌더링 예시 */}
        {false && <ResultScreen /* 추후 props 연결 */ />}
      </main>
    </div>
  );
}

export default App;