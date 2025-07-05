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
import GlucoseTestCard from './components/GlucoseTestCard';
import { useDiabetesSimulator } from './hooks/useDiabetesSimulator';
import TutorialContainer from './components/TutorialContainer';
import MealCard from './components/MealCard';
import InsulinCard from './components/InsulinCard';
import PracticeFeedbackCard from './components/PracticeFeedbackCard';
import './App.css';

function App() {
  const [tutorialDone, setTutorialDone] = useState(false);
  const [showGlucoseTest, setShowGlucoseTest] = useState(false);
  const [lastGlucose, setLastGlucose] = useState<number | null>(null);
  // 실습 단계 상태: null | 'meal' | 'insulin' | 'feedback'
  const [practiceStep, setPracticeStep] = useState<null | 'meal' | 'insulin' | 'feedback'>(null);
  const [practiceMeal, setPracticeMeal] = useState<any>(null);
  const [practiceInsulin, setPracticeInsulin] = useState<number | null>(null);
  const [practiceFeedback, setPracticeFeedback] = useState<{ status: 'success' | 'error' | 'info'; message: string } | null>(null);

  const {
    gameState,
    setGameState,
    advanceTime,
    openMealModal,
    closeMealModal,
    openInsulinModal,
    closeInsulinModal,
    logEvent,
    foodData
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

  if (showGlucoseTest) {
    return (
      <div className="tutorial-container" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <GlucoseTestCard onComplete={result => {
          setLastGlucose(result);
          setShowGlucoseTest(false);
          setGameState(s => ({ ...s, currentGlucose: result }));
        }} />
      </div>
    );
  }

  if (!gameState.selectedAge) {
    return <AgeSelection onSelect={age => setGameState(s => ({ ...s, selectedAge: age }))} />;
  }

  // 실습 카드 흐름 렌더링
  if (practiceStep === 'meal') {
    return (
      <MealCard
        meals={foodData.map(f => ({ name: f.name, carbs: f.carbs }))}
        onSelect={meal => {
          setPracticeMeal(meal);
          setPracticeStep('insulin');
        }}
        onClose={() => setPracticeStep(null)}
      />
    );
  }
  if (practiceStep === 'insulin') {
    return (
      <InsulinCard
        maxDose={20}
        onInject={dose => {
          setPracticeInsulin(dose);
          // 간단 피드백 예시: 탄수화물 대비 적정 인슐린(예: 1U/15g)
          const expected = Math.round(practiceMeal.carbs / 15);
          let status: 'success' | 'error' | 'info' = 'info';
          let msg = '';
          if (dose === expected) {
            status = 'success';
            msg = `적정량(${expected}U)를 정확히 주사했어요!`;
          } else if (dose < expected) {
            status = 'error';
            msg = `인슐린이 부족해요. 권장량: ${expected}U`;
          } else {
            status = 'error';
            msg = `인슐린이 너무 많아요. 권장량: ${expected}U`;
          }
          setPracticeFeedback({ status, message: msg });
          setPracticeStep('feedback');
        }}
        onClose={() => setPracticeStep(null)}
      />
    );
  }
  if (practiceStep === 'feedback' && practiceFeedback) {
    return (
      <PracticeFeedbackCard
        status={practiceFeedback.status}
        message={practiceFeedback.message}
        onNext={() => {
          // 실습 종료 후 일반 시뮬레이션으로 복귀
          setPracticeStep(null);
          setPracticeMeal(null);
          setPracticeInsulin(null);
          setPracticeFeedback(null);
        }}
      />
    );
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
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button className="btn btn--primary" onClick={() => setShowGlucoseTest(true)}>
            혈당 측정 시뮬레이션
          </button>
          <button className="btn btn--secondary ml-8" onClick={() => setPracticeStep('meal')}>
            식사-인슐린 실습
          </button>
          {lastGlucose !== null && (
            <div style={{ marginTop: 12, color: 'var(--color-primary)' }}>
              최근 측정값: <b>{lastGlucose} mg/dL</b>
            </div>
          )}
        </div>
        {/* 결과 화면은 조건부 렌더링 예시 */}
        {false && <ResultScreen /* 추후 props 연결 */ />}
      </main>
    </div>
  );
}

export default App;