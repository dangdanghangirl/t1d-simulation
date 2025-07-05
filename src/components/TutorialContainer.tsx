import React, { useState } from 'react';
import { tutorialData } from '../data/tutorialData';
import TutorialChapter from './TutorialChapter';

export type TutorialChapterKey = keyof typeof tutorialData;

interface TutorialContainerProps {
  onTutorialComplete: () => void;
}

const chapterOrder: TutorialChapterKey[] = [
  'intro',
  'chapter1',
  'chapter2',
  'chapter3',
  'chapter4',
  'chapter5',
  'chapter6',
];

const TutorialContainer: React.FC<TutorialContainerProps> = ({ onTutorialComplete }) => {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [completed, setCompleted] = useState(false);
  const currentKey = chapterOrder[currentChapterIdx];
  const currentChapter = tutorialData[currentKey];

  const handleNext = () => {
    if (currentChapterIdx < chapterOrder.length - 1) {
      setCurrentChapterIdx(idx => idx + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentChapterIdx > 0) {
      setCurrentChapterIdx(idx => idx - 1);
    }
  };

  if (completed) {
    return (
      <div className="tutorial-container completion-section">
        <div className="completion-card">
          <div className="completion-icon" role="img" aria-label="축하">🎉</div>
          <h2>튜토리얼 완료!</h2>
          <p>이제 시뮬레이션을 시작할 수 있습니다.</p>
          <button className="btn btn--primary" onClick={onTutorialComplete}>시뮬레이션 시작</button>
        </div>
      </div>
    );
  }

  const progress = ((currentChapterIdx + 1) / chapterOrder.length) * 100;

  return (
    <div className="tutorial-container">
      <div className="tutorial-main-card">
        <div className="progress-section">
          <div className="progress-info">
            <span className="progress-text">진행도: {currentChapterIdx + 1} / {chapterOrder.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <h2>{currentChapter.title}</h2>
        <div className="chapter-content">
          <TutorialChapter chapterKey={currentKey} chapter={currentChapter} />
        </div>
        <div className="tutorial-nav-btns">
          <button className="btn btn--secondary" onClick={handlePrev} disabled={currentChapterIdx === 0}>이전</button>
          <button className="btn btn--primary" onClick={handleNext}>
            {currentChapterIdx < chapterOrder.length - 1 ? '다음' : '튜토리얼 완료'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialContainer;
