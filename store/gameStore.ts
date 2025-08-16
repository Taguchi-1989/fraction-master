import { create } from 'zustand';
import { GameState, Question, WrongAnswer } from '@/types/game';
import { generateQuestion, initializeQuestionPool } from '@/lib/questions';

interface GameStore extends GameState {
  // アクション
  startGame: (level: 'easy' | 'normal' | 'hard') => void;
  answerQuestion: (optionIndex: number) => void;
  showHint: () => void;
  nextQuestion: () => void;
  endGame: () => void;
  resetGame: () => void;
  tickTimer: () => void;
  quitGame: () => void;
  showCredits: () => void;
  // ヒントボタン関連
  hintButtonEnabled: boolean;
  questionStartTime: number;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // 初期状態
  currentScreen: 'title',
  level: 'easy',
  score: 0,
  currentQuestion: null,
  questionsAnswered: 0,
  correctAnswers: 0,
  isHintShown: false,
  mistakes: 0,
  gameActive: false,
  wrongAnswers: [],
  hintButtonEnabled: false,
  questionStartTime: 0,
  gameStartTime: 0,
  totalGameTime: 0,
  maxQuestions: 5,
  showVisuals: false,

  // ゲーム開始
  startGame: (level) => {
    const now = Date.now();
    // 問題プールを初期化
    initializeQuestionPool(level);
    set({
      currentScreen: 'game',
      level,
      score: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      currentQuestion: generateQuestion(level),
      gameActive: true,
      mistakes: 0,
      isHintShown: false,
      wrongAnswers: [],
      hintButtonEnabled: false,
      questionStartTime: now,
      gameStartTime: now,
      totalGameTime: 0,
      maxQuestions: 5,
      showVisuals: false,
    });
  },

  // 問題に回答
  answerQuestion: (optionIndex) => {
    const { currentQuestion, isHintShown } = get();
    if (!currentQuestion) return;

    const isCorrect = currentQuestion.options[optionIndex].isCorrect;
    
    if (isCorrect) {
      // 正解時の処理 - 10点固定
      set((state) => ({
        score: state.score + 10,
        correctAnswers: state.correctAnswers + 1,
        questionsAnswered: state.questionsAnswered + 1,
        isHintShown: false,
        mistakes: 0,
      }));
      
      // 1.5秒後に次の問題または終了判定
      setTimeout(() => {
        if (get().questionsAnswered >= get().maxQuestions) {
          get().endGame();
        } else {
          get().nextQuestion();
        }
      }, 1500);
    } else {
      // 不正解時の処理
      const correctAnswerIndex = currentQuestion.options.findIndex(option => option.isCorrect);
      
      set((state) => ({
        mistakes: state.mistakes + 1,
        questionsAnswered: state.questionsAnswered + 1,
        wrongAnswers: [
          ...state.wrongAnswers,
          {
            question: currentQuestion,
            selectedAnswer: optionIndex,
            correctAnswer: correctAnswerIndex,
          }
        ],
      }));
      
      // 間違いの場合も1.5秒後に次の問題または終了判定
      setTimeout(() => {
        if (get().questionsAnswered >= get().maxQuestions) {
          get().endGame();
        } else {
          get().nextQuestion();
        }
      }, 1500);
    }
  },

  // ヒント表示
  showHint: () => {
    set({ 
      isHintShown: true,
      showVisuals: true,
    });
  },

  // 次の問題へ
  nextQuestion: () => {
    const { level } = get();
    set({
      currentQuestion: generateQuestion(level),
      mistakes: 0,
      isHintShown: false,
      hintButtonEnabled: false,
      questionStartTime: Date.now(),
      showVisuals: false,
    });
  },

  // ゲーム終了
  endGame: () => {
    const { gameStartTime } = get();
    const totalTime = Math.round((Date.now() - gameStartTime) / 1000); // 秒単位
    set({
      currentScreen: 'result',
      gameActive: false,
      totalGameTime: totalTime,
    });
  },

  // ゲーム終了（途中退出）
  quitGame: () => {
    const { gameStartTime } = get();
    const totalTime = Math.round((Date.now() - gameStartTime) / 1000); // 秒単位
    set({
      currentScreen: 'result',
      gameActive: false,
      totalGameTime: totalTime,
    });
  },

  // ゲームリセット
  resetGame: () => {
    set({
      currentScreen: 'title',
      score: 0,
      currentQuestion: null,
      questionsAnswered: 0,
      correctAnswers: 0,
      isHintShown: false,
      mistakes: 0,
      gameActive: false,
      wrongAnswers: [],
      hintButtonEnabled: false,
      questionStartTime: 0,
      gameStartTime: 0,
      totalGameTime: 0,
      maxQuestions: 5,
      showVisuals: false,
    });
  },

  // ヒントボタン有効化タイマー
  tickTimer: () => {
    const { gameActive, questionStartTime, hintButtonEnabled } = get();
    if (gameActive) {
      // 10秒経ったらヒントボタンを有効化
      if (!hintButtonEnabled && Date.now() - questionStartTime >= 10000) {
        set({ hintButtonEnabled: true });
      }
    }
  },

  // クレジットページ表示
  showCredits: () => {
    set({ currentScreen: 'credits' });
  },
}));