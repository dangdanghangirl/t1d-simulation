import React from "react";

interface MealCardProps {
  meals: { name: string; carbs: number; icon?: string }[];
  onSelect: (meal: { name: string; carbs: number }) => void;
  onClose?: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meals, onSelect, onClose }) => {
  return (
    <div className="card" style={{ maxWidth: 340, margin: "0 auto" }}>
      <div className="card__header">
        <h3>식사 선택</h3>
      </div>
      <div className="card__body">
        <div className="flex flex-col gap-8">
          {meals.map((meal) => (
            <button
              key={meal.name}
              className="btn btn--secondary"
              onClick={() => onSelect(meal)}
              style={{ justifyContent: "flex-start" }}
            >
              {meal.icon && <span style={{ fontSize: 24, marginRight: 8 }}>{meal.icon}</span>}
              <span>{meal.name} <span className="text-secondary">({meal.carbs}g)</span></span>
            </button>
          ))}
        </div>
      </div>
      {onClose && (
        <div className="card__footer">
          <button className="btn btn--outline btn--sm" onClick={onClose}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default MealCard;
