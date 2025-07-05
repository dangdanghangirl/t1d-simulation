export interface GameState {
  selectedAge: string | null;
  characterName: string; // 캐릭터 이름
  icr: number; // 인슐린:탄수화물 비율
  isf: number; // 인슐린 민감도
  currentTime: number;
  currentGlucose: number;
  activeInsulin: number;
  basalInsulin: number;
  activeEffects: any[];
  gameLog: any[];
  selectedFood: any | null;
  selectedInsulin: number | null; // 식사와 함께 입력된 인슐린
  showMealModal: boolean;
  showInsulinModal: boolean;
  glucoseHistory: number[];
  timeLabels: string[];
}
