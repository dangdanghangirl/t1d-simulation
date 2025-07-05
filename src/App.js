import React, { useState } from 'react';
import CurrentStatus from './components/CurrentStatus';
import GlucoseChart from './components/GlucoseChart';
import ActionPanel from './components/ActionPanel';
import MealModal from './components/MealModal';
import InsulinModal from './components/InsulinModal';
import EducationPanel from './components/EducationPanel';
import GameLog from './components/GameLog';
import './App.css';

function App() {
  // 전체 상태를 useState로 관리 (예시)
  const [state, setState] = useState({
    currentTime: 8 * 60,
    currentGlucose: 120,
    activeInsulin: 0,
    basalInsulin: 0,
    activeEffects: [],
    gameLog: [],
    selectedFood: null,
    showMealModal: false,
    showInsulinModal: false,
    glucoseHistory: [120],
    timeLabels: ['08:00']
  });

  // 각종 핸들러와 상태 업데이트 함수는 추후 구현

  return (
    <div className="container">
      <header className="header">
        <h1>1형 당뇨 관리 시뮬레이터</h1>
        <p>실제적인 혈당 관리를 배워보세요</p>
      </header>
      <main className="main-content">
        <CurrentStatus state={state} />
        <GlucoseChart state={state} />
        <ActionPanel state={state} setState={setState} />
        <MealModal state={state} setState={setState} />
        <InsulinModal state={state} setState={setState} />
        <EducationPanel />
        <GameLog state={state} />
      </main>
    </div>
  );
}

export default App;
