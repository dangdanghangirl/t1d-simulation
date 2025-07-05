import React, { useState } from 'react';
import AgeSelection from './components/AgeSelection';
import CharacterPanel from './components/CharacterPanel';
import GlucosePanel from './components/GlucosePanel';
import './App.css';

type AppState = {
  selectedAge: string | null;
  currentTime: number;
  currentGlucose: number;
  activeInsulin: number;
  basalInsulin: number;
  activeEffects: any[];
  gameLog: any[];
  selectedFood: any | null;
  showMealModal: boolean;
  showInsulinModal: boolean;
  glucoseHistory: number[];
  timeLabels: string[];
};

function App() {
  const [state, setState] = useState<AppState>({
    selectedAge: null,
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

  const getStatus = (bg: number) => {
    if (bg <= 50) return { key: 'dangerousLow', label: '위험한 저혈당', color: '#FF0000' };
    if (bg <= 70) return { key: 'low', label: '저혈당', color: '#FF6B47' };
    if (bg <= 180) return { key: 'normal', label: '정상', color: '#4CAF50' };
    if (bg <= 250) return { key: 'high', label: '고혈당', color: '#FF9800' };
    return { key: 'dangerousHigh', label: '위험한 고혈당', color: '#FF0000' };
  };
  const statusObj = getStatus(state.currentGlucose);

  const facial = '😊';
  const message = '안녕하세요! 함께 혈당을 관리해봐요!';

  if (!state.selectedAge) {
    return <AgeSelection onSelect={age => setState(s => ({ ...s, selectedAge: age }))} />;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>1형 당뇨 관리 시뮬레이터</h1>
        <p>실제적인 혈당 관리를 배워보세요</p>
      </header>
      <main className="main-content">
        <CharacterPanel facial={facial} message={message} age={state.selectedAge} status={statusObj.key} />
        <GlucosePanel glucose={state.currentGlucose} status={statusObj.key} statusLabel={statusObj.label} statusColor={statusObj.color}>
          {/* 차트 컴포넌트 또는 캔버스 영역 추가 예정 */}
        </GlucosePanel>
      </main>
    </div>
  );
}

export default App;