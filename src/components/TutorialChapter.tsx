import React from 'react';
import { TutorialChapterKey } from './TutorialContainer';
import { TutorialIntro, TutorialChapter1, TutorialChapter2, TutorialChapter3, TutorialChapter4, TutorialChapter5, TutorialChapter6 } from '../data/tutorialData';

interface TutorialChapterProps {
  chapterKey: TutorialChapterKey;
  chapter:
    | TutorialIntro
    | TutorialChapter1
    | TutorialChapter2
    | TutorialChapter3
    | TutorialChapter4
    | TutorialChapter5
    | TutorialChapter6;
}

const TutorialChapter: React.FC<TutorialChapterProps> = ({ chapterKey, chapter }) => {
  switch (chapterKey) {
    case 'intro': {
      const c = chapter as TutorialIntro;
      return (
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: 8 }}>{c.setting}</div>
          <ul>
            {c.symptoms_progression.map((symptom, i) => (
              <li key={i}>{symptom}</li>
            ))}
          </ul>
        </div>
      );
    }
    case 'chapter1': {
      const c = chapter as TutorialChapter1;
      return (
        <div>
          <div>{c.story}</div>
          <ul>
            {c.medical_tests.map((test, i) => (
              <li key={i}>{test}</li>
            ))}
          </ul>
          <div style={{ marginTop: 8, color: '#1976d2' }}>진단: {c.diagnosis}</div>
        </div>
      );
    }
    case 'chapter2': {
      const c = chapter as TutorialChapter2;
      return (
        <ul>
          {c.education_content.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }
    case 'chapter3': {
      const c = chapter as TutorialChapter3;
      return (
        <ol>
          {c.tutorial_steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      );
    }
    case 'chapter4': {
      const c = chapter as TutorialChapter4;
      return (
        <div>
          <div style={{ fontWeight: 'bold' }}>인슐린 종류</div>
          <ul>
            {Object.entries(c.insulin_types).map(([type, desc]) => (
              <li key={type}><b>{type}:</b> {desc}</li>
            ))}
          </ul>
          <div style={{ fontWeight: 'bold', marginTop: 8 }}>주사 방법</div>
          <ol>
            {c.injection_steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      );
    }
    case 'chapter5': {
      const c = chapter as TutorialChapter5;
      return (
        <ul>
          {c.carb_counting.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }
    case 'chapter6': {
      const c = chapter as TutorialChapter6;
      return (
        <div>
          <div style={{ fontWeight: 'bold' }}>저혈당 증상</div>
          <ul>
            {c.hypoglycemia.symptoms.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <div>치료: {c.hypoglycemia.treatment}</div>
          <div style={{ fontWeight: 'bold', marginTop: 8 }}>고혈당 증상</div>
          <ul>
            {c.hyperglycemia.symptoms.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <div>치료: {c.hyperglycemia.treatment}</div>
        </div>
      );
    }
    default:
      return <div>알 수 없는 챕터</div>;
  }
};

export default TutorialChapter;
