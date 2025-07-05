export interface GameState {
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
}
