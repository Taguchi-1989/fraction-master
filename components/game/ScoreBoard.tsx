'use client';

import { FC } from 'react';

interface ScoreBoardProps {
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
}

export const ScoreBoard: FC<ScoreBoardProps> = ({
  score,
  questionsAnswered,
  correctAnswers,
}) => {
  const accuracy = questionsAnswered > 0 
    ? Math.round((correctAnswers / questionsAnswered) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-blue-700 font-semibold">
            <ruby>得点<rt>とくてん</rt></ruby>
          </p>
          <p className="text-2xl font-bold text-blue-900">
            {score}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-blue-700 font-semibold">
            <ruby>正解数<rt>せいかいすう</rt></ruby>
          </p>
          <p className="text-2xl font-bold text-green-600">
            {correctAnswers}/{questionsAnswered}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-blue-700 font-semibold">
            <ruby>正答率<rt>せいとうりつ</rt></ruby>
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {accuracy}%
          </p>
        </div>
      </div>
    </div>
  );
};