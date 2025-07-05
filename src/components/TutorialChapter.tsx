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

const CharacterAvatar = ({ name }: { name: string }) => (
  <div className="character-avatar">
    <div className="avatar-circle">{name[0]}</div>
    <div style={{ fontSize: 14, marginTop: 4, color: '#b2dfdb', textAlign: 'center' }}>{name}</div>
  </div>
);

const DialogueBox = ({ children }: { children: React.ReactNode }) => (
  <div className="dialogue-box" style={{ background: 'var(--color-background)', borderLeft: '4px solid var(--color-primary)', padding: 16, borderRadius: 8, marginBottom: 8 }}>
    <p style={{ margin: 0 }}>{children}</p>
  </div>
);

const TutorialChapter: React.FC<TutorialChapterProps> = ({ chapterKey, chapter }) => {
  switch (chapterKey) {
    case 'intro': {
      const c = chapter as TutorialIntro;
      return (
        <div className="chapter-card" style={{ padding: 24, borderRadius: 16, background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <CharacterAvatar name="민준" />
            <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--color-primary)' }}>민준</div>
          </div>
          {c.symptoms_progression.map((symptom, i) => (
            <DialogueBox key={i}>{symptom}</DialogueBox>
          ))}
        </div>
      );
    }
    case 'chapter1': {
      const c = chapter as TutorialChapter1;
      return (
        <div className="chapter-card" style={{ padding: 24, borderRadius: 16, background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <CharacterAvatar name="민준" />
            <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--color-primary)' }}>민준</div>
          </div>
          <DialogueBox>{c.story}</DialogueBox>
          <div style={{ marginTop: 16, fontWeight: 500, color: 'var(--color-info)' }}>[의료 검사]</div>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
            {c.medical_tests.map((test, i) => (
              <li key={i}>{test}</li>
            ))}
          </ul>
          <div style={{ marginTop: 12, color: 'var(--color-primary)', fontWeight: 600 }}>진단: {c.diagnosis}</div>
        </div>
      );
    }
    case 'chapter2': {
      const c = chapter as TutorialChapter2;
      return (
        <div className="chapter-card" style={{ padding: 24, borderRadius: 16, background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--color-primary)', marginBottom: 12 }}>1형 당뇨병이란?</div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {c.education_content.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }
    case 'chapter3': {
      const c = chapter as TutorialChapter3;
      return (
        <div className="chapter-card" style={{ padding: 24, borderRadius: 16, background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--color-primary)', marginBottom: 12 }}>혈당 측정 실습</div>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            {c.tutorial_steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      );
    }
    case 'chapter4': {
      const c = chapter as TutorialChapter4;
      return (
        <div className="chapter-card" style={{ padding: 24, borderRadius: 16, background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--color-primary)', marginBottom: 12 }}>인슐린 종류</div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {Object.entries(c.insulin_types).map(([type, desc]) => (
              <li key={type}><b>{type}:</b> {desc}</li>
            ))}
          </ul>
          <div style={{ fontWeight: 600, marginTop: 16, color: 'var(--color-primary)' }}>주사 방법</div>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
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
        <div className="chapter-card" style={{ padding: 24, borderRadius: 16, background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--color-primary)', marginBottom: 12 }}>탄수화물 계산</div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {c.carb_counting.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }
    case 'chapter6': {
      const c = chapter as TutorialChapter6;
      return (
        <div className="chapter-card" style={{ padding: 24, borderRadius: 16, background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--color-primary)', marginBottom: 12 }}>응급상황 대처</div>
          <div style={{ fontWeight: 500, color: 'var(--color-error)', marginBottom: 4 }}>저혈당 증상</div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {c.hypoglycemia.symptoms.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <div style={{ margin: '8px 0 12px 0', color: 'var(--color-error)' }}>치료: {c.hypoglycemia.treatment}</div>
          <div style={{ fontWeight: 500, color: 'var(--color-warning)', marginBottom: 4 }}>고혈당 증상</div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {c.hyperglycemia.symptoms.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <div style={{ margin: '8px 0 0 0', color: 'var(--color-warning)' }}>치료: {c.hyperglycemia.treatment}</div>
        </div>
      );
    }
    default:
      return <div>알 수 없는 챕터</div>;
  }
};

export default TutorialChapter;
