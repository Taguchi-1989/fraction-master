// ゲーム関連の型定義

export interface Fraction {
  numerator: number;      // 分子
  denominator: number;    // 分母
}

export interface Question {
  id: string;
  type: 'compare' | 'equivalent' | 'oddOneOut';
  text: string;
  textWithRuby?: string;  // ふりがな付きテキスト
  options: QuestionOption[];
  difficulty: 1 | 2 | 3;
  hint: HintData;
}

export interface QuestionOption {
  fraction: Fraction;
  displayText: string;
  visualType: 'circle' | 'rectangle' | 'liquid';
  isCorrect: boolean;
}

export interface HintData {
  animationType: 'split' | 'fill' | 'compare';
  message: string;
  messageWithRuby?: string;
  voiceFile?: string;
}

export interface WrongAnswer {
  question: Question;
  selectedAnswer: number;
  correctAnswer: number;
}

export interface GameState {
  currentScreen: 'title' | 'levelSelect' | 'game' | 'result' | 'credits';
  level: 'easy' | 'normal' | 'hard';
  score: number;
  currentQuestion: Question | null;
  questionsAnswered: number;
  correctAnswers: number;
  isHintShown: boolean;
  mistakes: number;
  gameActive: boolean;
  wrongAnswers: WrongAnswer[];
  hintButtonEnabled: boolean;
  questionStartTime: number;
  gameStartTime: number;
  totalGameTime: number;
  maxQuestions: number;
  showVisuals: boolean;
}

export interface DifficultySettings {
  languageLevel: 'grade1' | 'grade2' | 'grade3';
  mathLevel: 'beginner' | 'intermediate' | 'advanced';
  hintFrequency: 'always' | 'sometimes' | 'rarely';
  gameSpeed: 'slow' | 'normal' | 'fast';
}