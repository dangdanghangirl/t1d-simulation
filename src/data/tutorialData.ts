// 1형 당뇨병 시뮬레이션 튜토리얼 데이터 (TypeScript)

export type TutorialIntro = {
  title: string;
  setting: string;
  symptoms_progression: string[];
};

export type TutorialChapter1 = {
  title: string;
  story: string;
  medical_tests: string[];
  diagnosis: string;
};

export type TutorialChapter2 = {
  title: string;
  education_content: string[];
};

export type TutorialChapter3 = {
  title: string;
  tutorial_steps: string[];
};

export type TutorialChapter4 = {
  title: string;
  insulin_types: Record<string, string>;
  injection_steps: string[];
};

export type TutorialChapter5 = {
  title: string;
  carb_counting: string[];
};

export type TutorialChapter6 = {
  title: string;
  hypoglycemia: {
    symptoms: string[];
    treatment: string;
  };
  hyperglycemia: {
    symptoms: string[];
    treatment: string;
  };
};

export type TutorialData = {
  intro: TutorialIntro;
  chapter1: TutorialChapter1;
  chapter2: TutorialChapter2;
  chapter3: TutorialChapter3;
  chapter4: TutorialChapter4;
  chapter5: TutorialChapter5;
  chapter6: TutorialChapter6;
};

export const tutorialData: TutorialData = {
  intro: {
    title: "갑작스런 변화",
    setting: "평범한 고등학생 민준이의 일상",
    symptoms_progression: [
      "최근 들어 이상하게 목이 자주 마르고",
      "밤에 화장실에 자주 가게 되고",
      "음식을 많이 먹어도 체중이 빠지고",
      "항상 피곤하고 집중이 안 되기 시작했다"
    ]
  },
  chapter1: {
    title: "병원 방문과 진단",
    story: "부모님과 함께 병원을 찾은 민준이",
    medical_tests: [
      "혈당 측정 (420 mg/dL - 매우 높음)",
      "당화혈색소 검사 (9.2% - 높음)",
      "케톤체 검사 (양성)",
      "자가항체 검사 (GAD 항체 양성)"
    ],
    diagnosis: "제1형 당뇨병"
  },
  chapter2: {
    title: "1형 당뇨병이란?",
    education_content: [
      "췌장의 베타세포가 파괴되어 인슐린을 만들지 못함",
      "자가면역 질환으로 평생 관리가 필요",
      "인슐린 주사를 통한 치료가 필수",
      "혈당 관리를 통해 정상적인 생활 가능"
    ]
  },
  chapter3: {
    title: "첫 번째 혈당 측정",
    tutorial_steps: [
      "혈당 측정기 사용법 배우기",
      "손가락 채혈 방법",
      "혈당 수치 읽는 법",
      "목표 혈당 범위 (80-180 mg/dL) 이해"
    ]
  },
  chapter4: {
    title: "인슐린 주사 교육",
    insulin_types: {
      "지속형": "24시간 일정하게 작용, 하루 1회",
      "초속효성": "식사 직전, 15분 내 작용 시작"
    },
    injection_steps: [
      "주사 부위 선택 (복부, 팔, 허벅지)",
      "펜형 인슐린 사용법",
      "적절한 용량 설정",
      "주사 후 10초 대기"
    ]
  },
  chapter5: {
    title: "식사와 탄수화물 계산",
    carb_counting: [
      "1교환단위 = 15g 탄수화물",
      "음식별 탄수화물 함량 파악",
      "인슐린 대 탄수화물 비율 계산",
      "식사 타이밍 맞추기"
    ]
  },
  chapter6: {
    title: "저혈당과 고혈당 대처",
    hypoglycemia: {
      symptoms: ["떨림", "식은땀", "어지러움", "불안감"],
      treatment: "15g 탄수화물 섭취 후 15분 대기"
    },
    hyperglycemia: {
      symptoms: ["갈증", "피로", "시야 흐림"],
      treatment: "추가 인슐린 주사 고려"
    }
  }
};
