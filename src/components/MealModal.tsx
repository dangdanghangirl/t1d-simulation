import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { GameState } from '../types/GameState';
import { foodData } from '../hooks/useDiabetesSimulator';

interface MealModalProps {
  state: GameState;
  setState: Dispatch<SetStateAction<GameState>>;
  handleMealWithInsulin: (food: typeof foodData[0], insulinUnits: number) => void;
}

const MealModal = ({ state, setState, handleMealWithInsulin }: MealModalProps) => {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [insulin, setInsulin] = React.useState<number | null>(null);
  if (!state.showMealModal) return null;
  const selectedFood = selected !== null ? foodData[selected] : null;
  // 인슐린 권장량(예: 1U/15g 탄수화물)
  const recommendedInsulin = selectedFood ? Math.round(selectedFood.carbs / 15) : null;
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>식사 선택</h3>
          <button className="modal-close" onClick={() => setState((s: any) => ({ ...s, showMealModal: false }))}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="flex flex-col gap-8">
            {foodData.map((food, idx) => (
              <button
                key={food.name}
                className={`btn btn--secondary${selected === idx ? ' btn--primary' : ''}`}
                style={{ justifyContent: 'flex-start' }}
                onClick={() => {
                  setSelected(idx);
                  setInsulin(null); // 음식 바꿀 때 인슐린 입력 초기화
                }}
              >
                <span>{food.name} <span className="text-secondary">({food.carbs}g 탄수화물)</span></span>
              </button>
            ))}
          </div>
          {selectedFood && (
            <div className="card mt-8">
              <div className="card__body">
                <div><b>탄수화물:</b> {selectedFood.carbs}g</div>
                <div><b>단백질:</b> {selectedFood.protein}g</div>
                <div><b>지방:</b> {selectedFood.fat}g</div>
                <div className="mt-8"><b>권장 인슐린:</b> {recommendedInsulin}U (1U/15g 기준)</div>
                {/* 인슐린 입력 UI */}
                <div className="mt-8">
                  <label className="form-label" htmlFor="insulin-input">인슐린 입력 (단위)</label>
                  <input
                    id="insulin-input"
                    type="number"
                    className="form-control"
                    min={0}
                    max={30}
                    value={insulin ?? ''}
                    placeholder={recommendedInsulin?.toString()}
                    onChange={e => setInsulin(Number(e.target.value))}
                  />
                  <button
                    className="btn btn--primary mt-8"
                    style={{ width: '100%' }}
                    disabled={selected === null || insulin === null || isNaN(insulin)}
                    onClick={() => {
                      if (selected !== null && insulin !== null && !isNaN(insulin)) {
                        handleMealWithInsulin(foodData[selected], insulin);
                      }
                    }}
                  >
                    {insulin ?? recommendedInsulin} 단위 주사 및 식사 확정
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn--secondary" onClick={() => setState((s: any) => ({ ...s, showMealModal: false }))}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default MealModal;
