'use client';

import { FC } from 'react';
import { WrongAnswer } from '@/types/game';
import { FractionCard } from './FractionCard';
import { ComparisonVisualization } from './ComparisonVisualization';

interface ReviewSectionProps {
  wrongAnswers: WrongAnswer[];
}

export const ReviewSection: FC<ReviewSectionProps> = ({ wrongAnswers }) => {
  if (wrongAnswers.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold text-green-800 mb-2">
          <ruby>完璧<rt>かんぺき</rt></ruby>です！
        </h3>
        <p className="text-green-700">
          すべての<ruby>問題<rt>もんだい</rt></ruby>に<ruby>正解<rt>せいかい</rt></ruby>しました。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-blue-800 mb-4">
        <ruby>間違<rt>まちが</rt></ruby>えた<ruby>問題<rt>もんだい</rt></ruby>を<ruby>振<rt>ふ</rt></ruby>り<ruby>返<rt>かえ</rt></ruby>ろう
      </h3>
      
      <div className="space-y-6">
        {wrongAnswers.map((wrongAnswer, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                <ruby>問題<rt>もんだい</rt></ruby> {index + 1}
              </h4>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-blue-800 font-medium">
                  {wrongAnswer.question.textWithRuby ? (
                    <span dangerouslySetInnerHTML={{ 
                      __html: wrongAnswer.question.textWithRuby 
                    }} />
                  ) : (
                    wrongAnswer.question.text
                  )}
                </p>
              </div>
            </div>

            {/* 全選択肢表示 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {wrongAnswer.question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="text-center">
                  <FractionCard
                    fraction={option.fraction}
                    visualType={option.visualType}
                    onSelect={() => {}}
                    isCorrect={optionIndex === wrongAnswer.correctAnswer}
                    isIncorrect={optionIndex === wrongAnswer.selectedAnswer && !option.isCorrect}
                    showVisual={true}
                  />
                  <div className="mt-2">
                    {optionIndex === wrongAnswer.selectedAnswer && !option.isCorrect && (
                      <p className="text-red-600 font-semibold text-sm">
                        あなたの<ruby>選択<rt>せんたく</rt></ruby>
                      </p>
                    )}
                    {optionIndex === wrongAnswer.correctAnswer && (
                      <p className="text-green-600 font-semibold text-sm">
                        <ruby>正解<rt>せいかい</rt></ruby>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 視覚的比較 - 問題タイプによって切り替え */}
            {wrongAnswer.question.type === 'compare' ? (
              <ComparisonVisualization
                selectedFraction={wrongAnswer.question.options[wrongAnswer.selectedAnswer].fraction}
                correctFraction={wrongAnswer.question.options[wrongAnswer.correctAnswer].fraction}
                visualType={wrongAnswer.question.options[wrongAnswer.selectedAnswer].visualType}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
                <h4 className="text-lg font-bold text-center mb-4 text-blue-900">
                  <ruby>正解<rt>せいかい</rt></ruby>と<ruby>選択<rt>せんたく</rt></ruby>した<ruby>答<rt>こた</rt></ruby>え
                </h4>
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <FractionCard
                      fraction={wrongAnswer.question.options[wrongAnswer.selectedAnswer].fraction}
                      visualType={wrongAnswer.question.options[wrongAnswer.selectedAnswer].visualType}
                      onSelect={() => {}}
                      showVisual={true}
                      isIncorrect={true}
                    />
                    <p className="mt-2 text-red-600 font-semibold">
                      あなたの<ruby>選択<rt>せんたく</rt></ruby>
                    </p>
                    <p className="text-lg font-bold text-red-600">
                      {wrongAnswer.question.options[wrongAnswer.selectedAnswer].fraction.numerator}/
                      {wrongAnswer.question.options[wrongAnswer.selectedAnswer].fraction.denominator}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <FractionCard
                      fraction={wrongAnswer.question.options[wrongAnswer.correctAnswer].fraction}
                      visualType={wrongAnswer.question.options[wrongAnswer.correctAnswer].visualType}
                      onSelect={() => {}}
                      showVisual={true}
                      isCorrect={true}
                    />
                    <p className="mt-2 text-green-600 font-semibold">
                      <ruby>正解<rt>せいかい</rt></ruby>
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {wrongAnswer.question.options[wrongAnswer.correctAnswer].fraction.numerator}/
                      {wrongAnswer.question.options[wrongAnswer.correctAnswer].fraction.denominator}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};