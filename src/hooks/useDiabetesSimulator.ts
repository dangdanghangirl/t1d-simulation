import { useState } from 'react';

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

export interface GameState {
  currentTime: number;
  currentGlucose: number;
  activeInsulin: number;
  basalInsulin: number;
  activeEffects: Effect[];
  gameLog: string[];
  selectedFood: Food | null;
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
    currentTime: 8 * 60,
    currentGlucose: 120,
    activeInsulin: 0,
    basalInsulin: 0,
    activeEffects: [],
    gameLog: [],
    selectedFood: null,
  });

  // TODO: 주요 이벤트 함수, 상태 업데이트, 시뮬레이션 로직 이식

  return {
    gameState,
    setGameState,
    // ...이벤트 함수들 추가 예정
  };
}
