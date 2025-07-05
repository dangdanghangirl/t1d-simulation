import React, { useState } from 'react';

interface GlucoseTestCardProps {
  onComplete: (result: number) => void;
}

const steps = [
  '혈당 측정기와 시험지, 채혈침을 준비해요.',
  '손을 깨끗하게 씻고 알코올로 소독해요.',
  '채혈침으로 손가락 끝을 살짝 찔러요.',
  '나온 혈액 한 방울을 시험지에 묻혀요.',
  '5초 후 결과를 확인해요.',
];

const GlucoseTestCard: React.FC<GlucoseTestCardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      // 예시: 랜덤 혈당값 생성
      const simulated = Math.floor(Math.random() * 120) + 70;
      setResult(simulated);
    }
  };

  return (
    <div className="chapter-card" style={{ padding: 28, borderRadius: 16, background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', maxWidth: 420, margin: '0 auto' }}>
      <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--color-primary)', marginBottom: 12 }}>혈당 측정 시뮬레이션</div>
      {result === null ? (
        <>
          <div className="dialogue-box" style={{ marginBottom: 16 }}>
            <b>Step {step + 1}:</b> {steps[step]}
          </div>
          <button className="btn btn--primary" style={{ marginTop: 12 }} onClick={handleNext}>
            {step < steps.length - 1 ? '다음' : '결과 확인'}
          </button>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: 20, marginBottom: 8 }}>측정 결과</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#4CAF50', marginBottom: 8 }}>{result} mg/dL</div>
          <button className="btn btn--primary" onClick={() => onComplete(result)}>완료</button>
        </div>
      )}
    </div>
  );
};

export default GlucoseTestCard;
