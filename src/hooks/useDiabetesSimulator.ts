import { useState } from 'react';
import type { GameState } from '../types/GameState';

// 타입 명세
export interface Food {
  name: string;
  carbs: number;
  protein: number;
  fat: number;
}

export interface Macronutrient {
  glucose_conversion: number;
  onset_time: number;
  peak_time: number;
  effect_duration: number;
  calories_per_gram: number;
  gastric_delay?: boolean;
}

export interface InsulinType {
  onset: number;
  peak: number;
  duration: number;
  effectiveness_curve: number[];
}

export interface Effect {
  type: 'macronutrient' | 'insulin' | 'extended_bolus';
  macroType?: keyof typeof macronutrientData;
  insulinType?: keyof typeof insulinData;
  amount?: number;
  units?: number;
  duration?: number;
  startTime: number;
  onsetTime?: number;
  peakTime?: number;
  endTime: number;
  conversion?: number;
  effectiveness?: number[];
  unitsPerMinute?: number;
}

// 데이터 (실제 구현에서는 useMemo 등으로 분리 가능)
export const insulinData = {
  rapid_acting: {
    onset: 15,
    peak: 60,
    duration: 240,
    effectiveness_curve: [0, 20, 80, 100, 80, 60, 40, 20, 10, 0],
  },
  long_acting: {
    onset: 120,
    peak: 0,
    duration: 1440,
    effectiveness_curve: [0, 0, 0, 0, 10, 40, 70, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 75, 70, 60, 50, 40, 30, 20, 10, 0],
  },
};

export const foodData: Food[] = [
  { name: '백미밥 (200g)', carbs: 72, protein: 6, fat: 0.6 },
  { name: '김치찌개 (1인분)', carbs: 8, protein: 15, fat: 12 },
  { name: '불고기 (150g)', carbs: 8, protein: 35, fat: 15 },
  { name: '삼겹살 구이 (200g)', carbs: 0, protein: 34, fat: 58 },
  { name: '치킨 (순살 200g)', carbs: 15, protein: 40, fat: 25 },
  { name: '피자 (2조각)', carbs: 45, protein: 20, fat: 18 },
  { name: '된장찌개 (1인분)', carbs: 6, protein: 8, fat: 3 },
  { name: '잡곡밥 (200g)', carbs: 60, protein: 8, fat: 2 },
];

export const macronutrientData = {
  carbohydrate: {
    glucose_conversion: 100,
    onset_time: 30,
    peak_time: 90,
    effect_duration: 180,
    calories_per_gram: 4,
  },
  protein: {
    glucose_conversion: 50,
    onset_time: 180,
    peak_time: 300,
    effect_duration: 360,
    calories_per_gram: 4,
  },
  fat: {
    glucose_conversion: 10,
    onset_time: 120,
    peak_time: 240,
    effect_duration: 300,
    calories_per_gram: 9,
    gastric_delay: true,
  },
};

export function useDiabetesSimulator() {
  // 초기 상태
  const [gameState, setGameState] = useState<GameState>({
    selectedAge: null,
    characterName: '', // 캐릭터 이름
    icr: 15, // 인슐린:탄수화물 비율 (1U/15g)
    isf: 50, // 인슐린 민감도 (1U당 혈당 감소 mg/dL)
    currentTime: 8 * 60,
    currentGlucose: 120,
    activeInsulin: 0,
    basalInsulin: 0,
    activeEffects: [],
    gameLog: [],
    selectedFood: null,
    selectedInsulin: null,
    showMealModal: false,
    showInsulinModal: false,
    glucoseHistory: [120],
    timeLabels: ['08:00']
  });

  // 설명 텍스트
  const explainICR = '인슐린:탄수화물 비율(ICR)은 1단위 인슐린이 몇 g의 탄수화물을 처리할 수 있는지 나타냅니다. 예: 1U/15g';
  const explainISF = '인슐린 민감도(ISF)는 1단위 인슐린이 혈당을 얼마나 낮추는지(mg/dL) 나타냅니다. 예: 1U당 50mg/dL 감소';

  // 설정 함수
  function setCharacterName(name: string) {
    setGameState(prev => ({ ...prev, characterName: name }));
  }
  function setICR(value: number) {
    setGameState(prev => ({ ...prev, icr: value }));
  }
  function setISF(value: number) {
    setGameState(prev => ({ ...prev, isf: value }));
  }

  // 시뮬레이션 주요 이벤트 함수 예시 (식사, 인슐린, 운동, 시간 진행)
  function logEvent(message: string) {
    setGameState(prev => ({
      ...prev,
      gameLog: [...prev.gameLog, `[${formatTime(prev.currentTime)}] ${message}`]
    }));
  }

  function formatTime(minutes: number) {
    const hours = Math.floor(minutes / 60) % 24;
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  function advanceTime() {
    setGameState(prev => {
      const timeStep = 30;
      let newTime = prev.currentTime + timeStep;
      if (newTime >= 24 * 60) newTime = 0;
      // 혈당 변화 계산
      let glucose = prev.currentGlucose;
      let effects = prev.activeEffects.filter(e => e.endTime > newTime);
      // 식사 효과(탄수화물)
      effects.forEach(e => {
        if (e.type === 'macronutrient' && e.macroType === 'carbohydrate' && e.amount) {
          // onset/peak 고려 간단화: 효과 시간 내면 일정량씩 증가
          if (newTime >= e.startTime + (e.onsetTime || 0) && newTime <= e.endTime) {
            glucose += (e.amount * (e.conversion || 100) / 100) / ((e.endTime - e.startTime) / timeStep);
          }
        }
        // 인슐린 효과
        if (e.type === 'insulin' && e.units && e.effectiveness) {
          // onset/peak 고려 간단화: 효과 시간 내면 일정량씩 감소
          if (newTime >= e.startTime + (e.onsetTime || 0) && newTime <= e.endTime) {
            // ISF(민감도) 반영: 1U당 isf만큼 혈당 감소
            glucose -= (e.units * prev.isf) / ((e.endTime - e.startTime) / timeStep);
          }
        }
      });
      return {
        ...prev,
        currentTime: newTime,
        currentGlucose: Math.round(glucose),
        activeEffects: effects,
        timeLabels: [...prev.timeLabels, formatTime(newTime)].slice(-20),
        glucoseHistory: [...prev.glucoseHistory, Math.round(glucose)].slice(-20)
      };
    });
    logEvent('시간이 경과했습니다.');
  }

  function openMealModal() {
    setGameState(prev => ({ ...prev, showMealModal: true }));
  }
  function closeMealModal() {
    setGameState(prev => ({ ...prev, showMealModal: false, selectedFood: null }));
  }
  function openInsulinModal() {
    setGameState(prev => ({ ...prev, showInsulinModal: true }));
  }
  function closeInsulinModal() {
    setGameState(prev => ({ ...prev, showInsulinModal: false }));
  }

  // 식사+인슐린 입력 처리 (혈당/인슐린 효과 반영)
  function handleMealWithInsulin(food: Food, insulinUnits: number) {
    setGameState(prev => {
      // 인슐린 효과(rapid_acting) 추가
      const insulinEffect: Effect = {
        type: 'insulin',
        insulinType: 'rapid_acting',
        units: insulinUnits,
        startTime: prev.currentTime,
        onsetTime: insulinData.rapid_acting.onset,
        peakTime: insulinData.rapid_acting.peak,
        endTime: prev.currentTime + insulinData.rapid_acting.duration,
        effectiveness: insulinData.rapid_acting.effectiveness_curve,
      };
      // 식사 효과(탄수화물만 단순 반영)
      const mealEffect: Effect = {
        type: 'macronutrient',
        macroType: 'carbohydrate',
        amount: food.carbs,
        startTime: prev.currentTime,
        onsetTime: macronutrientData.carbohydrate.onset_time,
        peakTime: macronutrientData.carbohydrate.peak_time,
        endTime: prev.currentTime + macronutrientData.carbohydrate.effect_duration,
        conversion: macronutrientData.carbohydrate.glucose_conversion,
      };
      return {
        ...prev,
        activeEffects: [...prev.activeEffects, insulinEffect, mealEffect],
        activeInsulin: prev.activeInsulin + insulinUnits,
        selectedFood: food,
        selectedInsulin: insulinUnits,
        showMealModal: false,
      };
    });
    logEvent(`${food.name} 식사 및 인슐린 ${insulinUnits}U 주사`);
  }

  // ...기타 이벤트 함수 및 시뮬레이션 로직 추가 예정...

  return {
    gameState,
    setGameState,
    advanceTime,
    openMealModal,
    closeMealModal,
    openInsulinModal,
    closeInsulinModal,
    logEvent,
    foodData,
    handleMealWithInsulin,
    setCharacterName,
    setICR,
    setISF,
    explainICR,
    explainISF,
    // ...이벤트 함수들 추가 예정
  };
}
