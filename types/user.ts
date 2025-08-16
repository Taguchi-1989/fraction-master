// ユーザー関連の型定義

export interface User {
  id: string;
  email: string;
  username: string;
  isParent: boolean;
  createdAt: Date;
}

export interface GameSession {
  id: string;
  userId: string;
  level: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  hintsUsed: number;
  timePlayed: number;
  playedAt: Date;
}

export interface LearningProgress {
  userId: string;
  fractionType: string;
  masteryLevel: number;
  lastPracticed: Date;
  totalAttempts: number;
  successRate: number;
}