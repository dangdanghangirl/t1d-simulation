import React from "react";

interface PracticeFeedbackCardProps {
  status: "success" | "error" | "info";
  message: string;
  onNext?: () => void;
}

const PracticeFeedbackCard: React.FC<PracticeFeedbackCardProps> = ({ status, message, onNext }) => {
  return (
    <div className={`card status--${status}`} style={{ maxWidth: 340, margin: "0 auto" }}>
      <div className="card__body text-center">
        <div className={`status status--${status} mb-8`}>
          {status === "success" && "✅"}
          {status === "error" && "⚠️"}
          {status === "info" && "ℹ️"}
          <span style={{ marginLeft: 8 }}>{message}</span>
        </div>
        {onNext && (
          <button className="btn btn--primary mt-8" onClick={onNext}>
            다음
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticeFeedbackCard;
