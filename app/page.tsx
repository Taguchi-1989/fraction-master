'use client';

import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/ui/Button';
import { FractionCard } from '@/components/game/FractionCard';
import { Timer } from '@/components/game/Timer';
import { ReviewSection } from '@/components/game/ReviewSection';
import { CreditsScreen } from '@/components/screens/CreditsScreen';
import { audioManager } from '@/lib/audio';
import { useEffect, useState } from 'react';

export default function Home() {
  const { currentScreen } = useGameStore();

  if (currentScreen === 'title') {
    return <TitleScreen />;
  } else if (currentScreen === 'levelSelect') {
    return <LevelSelectScreen />;
  } else if (currentScreen === 'game') {
    return <GameScreen />;
  } else if (currentScreen === 'result') {
    return <ResultScreen />;
  } else if (currentScreen === 'credits') {
    return <CreditsScreen />;
  }

  return <TitleScreen />;
}

function TitleScreen() {
  const { showCredits } = useGameStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center bg-white p-12 rounded-2xl shadow-2xl max-w-2xl animate-fade-in">
      
        <h1 className="text-6xl font-bold mb-8 text-blue-900">
          <ruby>分数<rt>ぶんすう</rt></ruby>マスター
        </h1>
        
        <p className="text-xl text-blue-800 mb-12">
          <ruby>数<rt>かず</rt></ruby>の<ruby>世界<rt>せかい</rt></ruby>を
          <ruby>探検<rt>たんけん</rt></ruby>しよう
        </p>

        <div className="space-y-4">
          <Button
            variant="primary"
            size="large"
            onClick={() => useGameStore.setState({ currentScreen: 'levelSelect' })}
          >
            ゲームを<ruby>開始<rt>かいし</rt></ruby>
          </Button>
          
          <div>
            <Button
              variant="secondary"
              onClick={showCredits}
              className="text-sm"
            >
              <ruby>制作者<rt>せいさくしゃ</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LevelSelectScreen() {
  const startGame = useGameStore((state) => state.startGame);

  const levels = [
    {
      id: 'easy' as const,
      title: '初級',
      ruby: 'しょきゅう',
      description: '2分の1、3分の1など',
      color: 'bg-green-500',
      icon: '🌱',
    },
    {
      id: 'normal' as const,
      title: '中級',
      ruby: 'ちゅうきゅう',
      description: '6分の1、8分の1まで',
      color: 'bg-blue-500',
      icon: '🌿',
    },
    {
      id: 'hard' as const,
      title: '上級',
      ruby: 'じょうきゅう',
      description: '複雑な分数の比較と等価問題',
      color: 'bg-purple-500',
      icon: '🌳',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div
        className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-2xl animate-fade-in"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          レベルを<ruby>選択<rt>せんたく</rt></ruby>してください
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            <div
              key={level.id}
              className={`${level.color} rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => startGame(level.id)}
            >
              <div className="text-5xl text-center mb-4">{level.icon}</div>
              <h3 className="text-2xl font-bold text-center mb-2">
                <ruby>{level.title}<rt>{level.ruby}</rt></ruby>
              </h3>
              <p className="text-center text-white/90">{level.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="secondary"
            onClick={() => useGameStore.setState({ currentScreen: 'title' })}
          >
            <ruby>戻<rt>もど</rt></ruby>る
          </Button>
        </div>
      </div>
    </div>
  );
}

function GameScreen() {
  const {
    currentQuestion,
    score,
    questionsAnswered,
    correctAnswers,
    maxQuestions,
    isHintShown,
    hintButtonEnabled,
    showVisuals,
    answerQuestion,
    showHint,
    tickTimer,
    quitGame,
  } = useGameStore();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedbackState, setFeedbackState] = useState<'correct' | 'incorrect' | null>(null);
  const [hintCountdown, setHintCountdown] = useState(10);
  const [bgmStarted, setBgmStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(tickTimer, 1000);
    return () => clearInterval(timer);
  }, [tickTimer]);

  // BGM再生開始（ゲーム開始時に一度だけ）
  useEffect(() => {
    if (!bgmStarted) {
      // ユーザー操作後にBGMを開始（ブラウザの自動再生ポリシー対応）
      const startBGM = () => {
        audioManager.playBGM();
        setBgmStarted(true);
        // イベントリスナーを削除
        document.removeEventListener('click', startBGM);
        document.removeEventListener('keydown', startBGM);
      };
      
      document.addEventListener('click', startBGM);
      document.addEventListener('keydown', startBGM);
      
      return () => {
        document.removeEventListener('click', startBGM);
        document.removeEventListener('keydown', startBGM);
      };
    }
  }, [bgmStarted]);

  // ゲーム終了時にBGM停止
  useEffect(() => {
    return () => {
      audioManager.stopBGM();
    };
  }, []);

  // ヒントカウントダウンの更新
  useEffect(() => {
    if (!hintButtonEnabled) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - useGameStore.getState().questionStartTime) / 1000);
        const remaining = Math.max(0, 10 - elapsed);
        setHintCountdown(remaining);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setHintCountdown(0);
    }
  }, [hintButtonEnabled, currentQuestion]);

  const handleCardSelect = (index: number) => {
    if (feedbackState) return; // フィードバック中は選択不可
    
    setSelectedIndex(index);
    const isCorrect = currentQuestion?.options[index].isCorrect;
    
    // 効果音再生
    audioManager.playClickSound();
    
    if (isCorrect) {
      setFeedbackState('correct');
      audioManager.playCorrectSound();
    } else {
      setFeedbackState('incorrect');
      audioManager.playIncorrectSound();
    }
    
    answerQuestion(index);
    
    // フィードバック表示後リセット
    setTimeout(() => {
      setSelectedIndex(null);
      setFeedbackState(null);
    }, 1500);
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-blue-700 text-sm font-semibold mb-1">
                  <ruby>得点<rt>とくてん</rt></ruby>
                </p>
                <p className="text-2xl font-bold text-blue-600">{score}</p>
              </div>
              
              <div className="text-center">
                <p className="text-blue-700 text-sm font-semibold mb-1">
                  <ruby>問題<rt>もんだい</rt></ruby>
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {questionsAnswered} / {maxQuestions}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-blue-700 text-sm font-semibold mb-1">
                  <ruby>正解<rt>せいかい</rt></ruby>
                </p>
                <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 問題文 */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white px-8 py-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-blue-900">
              {currentQuestion.textWithRuby ? (
                <span dangerouslySetInnerHTML={{ __html: currentQuestion.textWithRuby }} />
              ) : (
                currentQuestion.text
              )}
            </h2>
          </div>
        </div>

        {/* 分数カード */}
        <div className="flex justify-center gap-8 mb-8">
          {currentQuestion.options.map((option, index) => (
            <FractionCard
              key={index}
              fraction={option.fraction}
              visualType={option.visualType}
              isSelected={selectedIndex === index}
              onSelect={() => handleCardSelect(index)}
              showHint={isHintShown}
              isCorrect={feedbackState === 'correct' && option.isCorrect}
              isIncorrect={feedbackState === 'incorrect' && selectedIndex === index}
              showVisual={showVisuals}
            />
          ))}
        </div>

        {/* 下部コントロール */}
        <div className="flex justify-center gap-4">
          <Button
            variant="hint"
            onClick={() => {
              audioManager.playHintSound();
              showHint();
            }}
            disabled={!hintButtonEnabled || isHintShown}
          >
            {hintButtonEnabled ? (
              <>ヒントを<ruby>表示<rt>ひょうじ</rt></ruby></>
            ) : (
              <>ヒント（{hintCountdown}秒後）</>
            )}
          </Button>
          
          <Button
            variant="secondary"
            onClick={quitGame}
          >
            ゲーム<ruby>終了<rt>しゅうりょう</rt></ruby>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ResultScreen() {
  const {
    score,
    questionsAnswered,
    correctAnswers,
    wrongAnswers,
    totalGameTime,
    resetGame,
  } = useGameStore();

  const accuracy = questionsAnswered > 0
    ? Math.round((correctAnswers / questionsAnswered) * 100)
    : 0;

  // ゲーム完了音と音声再生（一度だけ）
  useEffect(() => {
    audioManager.playGameCompleteSound();
    
    // 30点以上の場合は「よくできたね」音声を再生
    if (score >= 30) {
      // ファンファーレの後に音声を再生
      setTimeout(() => {
        audioManager.playGoodJobSound();
      }, 1500); // 1.5秒後に再生
    }
  }, [score]);

  const getMessage = () => {
    if (accuracy >= 90) return '素晴らしい成績です！';
    if (accuracy >= 70) return 'よくできました！';
    if (accuracy >= 50) return 'がんばりました！';
    return 'もう一度挑戦してみよう！';
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div
          className="bg-white rounded-2xl shadow-2xl p-12 text-center animate-fade-in"
        >
          <h2 className="text-4xl font-bold mb-8 text-blue-900">
            ゲーム<ruby>終了<rt>しゅうりょう</rt></ruby>
          </h2>

          <div className="space-y-6 mb-8">
            <div>
              <p className="text-blue-700 mb-2 text-lg font-semibold">
                <ruby>最終<rt>さいしゅう</rt></ruby><ruby>得点<rt>とくてん</rt></ruby>
              </p>
              <p className="text-5xl font-bold text-blue-600">{score}</p>
            </div>

            <div>
              <p className="text-blue-700 mb-2 text-lg font-semibold">
                <ruby>正解数<rt>せいかいすう</rt></ruby>
              </p>
              <p className="text-3xl font-bold text-green-600">
                {correctAnswers} / {questionsAnswered}
              </p>
            </div>

            <div>
              <p className="text-blue-700 mb-2 text-lg font-semibold">
                <ruby>正答率<rt>せいとうりつ</rt></ruby>
              </p>
              <p className="text-3xl font-bold text-purple-600">{accuracy}%</p>
            </div>

            <div>
              <p className="text-blue-700 mb-2 text-lg font-semibold">
                <ruby>総<rt>そう</rt></ruby><ruby>時間<rt>じかん</rt></ruby>
              </p>
              <p className="text-3xl font-bold text-orange-600">{totalGameTime}秒</p>
            </div>
          </div>

          <p className="text-2xl font-bold text-blue-800 mb-8">
            {getMessage()}
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              variant="primary"
              size="large"
              onClick={() => useGameStore.setState({ currentScreen: 'levelSelect' })}
            >
              もう<ruby>一回<rt>いっかい</rt></ruby>
            </Button>
            
            <Button
              variant="secondary"
              size="large"
              onClick={resetGame}
            >
              タイトルへ
            </Button>
          </div>
        </div>

        {/* 間違えた問題の振り返り */}
        <ReviewSection wrongAnswers={wrongAnswers} />
      </div>
    </div>
  );
}