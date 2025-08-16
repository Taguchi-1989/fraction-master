'use client';

import { FC } from 'react';
import { Fraction } from '@/types/game';

interface FractionCardProps {
  fraction: Fraction;
  visualType: 'circle' | 'rectangle' | 'liquid';
  isSelected?: boolean;
  onSelect: () => void;
  showHint?: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  showVisual?: boolean;
}

export const FractionCard: FC<FractionCardProps> = ({
  fraction,
  visualType,
  isSelected = false,
  onSelect,
  showHint = false,
  isCorrect = false,
  isIncorrect = false,
  showVisual = false,
}) => {
  const renderVisual = (showFilled: boolean = false) => {
    const fillPercentage = (fraction.numerator / fraction.denominator) * 100;
    
    switch (visualType) {
      case 'circle':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            {/* 塗りつぶし部分（ヒント表示時のみ） */}
            {showFilled && (
              fillPercentage >= 100 ? (
                // 完全な円（3/3, 2/2など）
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="#3b82f6"
                  opacity="0.7"
                />
              ) : fillPercentage > 0 ? (
                // 部分的な塗りつぶし
                <path
                  d={`M 60,60 L 60,10 A 50,50 0 ${fillPercentage > 50 ? 1 : 0},1 ${
                    60 + 50 * Math.sin((fillPercentage / 100) * 2 * Math.PI)
                  },${60 - 50 * Math.cos((fillPercentage / 100) * 2 * Math.PI)} z`}
                  fill="#3b82f6"
                  opacity="0.7"
                />
              ) : null
            )}
            {/* 分割線（常に表示） */}
            {Array.from({ length: fraction.denominator }).map((_, i) => {
              const angle = (i * 360) / fraction.denominator;
              const x2 = 60 + 50 * Math.sin((angle * Math.PI) / 180);
              const y2 = 60 - 50 * Math.cos((angle * Math.PI) / 180);
              return (
                <line
                  key={i}
                  x1="60"
                  y1="60"
                  x2={x2}
                  y2={y2}
                  stroke="#374151"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        );
      
      case 'rectangle':
        return (
          <div className="w-32 h-24 mx-auto border-2 border-gray-400 flex">
            {Array.from({ length: fraction.denominator }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 ${i < fraction.denominator - 1 ? 'border-r border-gray-300' : ''} ${
                  showFilled && i < fraction.numerator ? 'bg-blue-500 opacity-70' : 'bg-gray-100'
                }`}
              />
            ))}
          </div>
        );
      
      case 'liquid':
        return (
          <div className="w-24 h-32 mx-auto relative">
            <div className="absolute inset-0 border-2 border-gray-400 rounded-b-lg overflow-hidden">
              {/* 分母の目盛り線（常に表示） */}
              {Array.from({ length: fraction.denominator - 1 }).map((_, i) => {
                const position = ((i + 1) / fraction.denominator) * 100;
                return (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-t border-gray-300"
                    style={{ bottom: `${position}%` }}
                  />
                );
              })}
              {/* 塗りつぶし部分（ヒント表示時のみ） */}
              {showFilled && (
                <div
                  className="absolute bottom-0 left-0 right-0 bg-blue-400"
                  style={{ height: `${fillPercentage}%` }}
                />
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        relative p-6 rounded-xl cursor-pointer
        ${isSelected ? 'ring-4 ring-blue-500' : ''}
        ${showHint ? 'ring-4 ring-yellow-400' : ''}
        ${isCorrect ? 'bg-green-100 border-4 border-green-500 shadow-lg shadow-green-200' : ''}
        ${isIncorrect ? 'bg-red-100 border-4 border-red-500 shadow-lg shadow-red-200' : ''}
        bg-white shadow-lg hover:shadow-xl transition-all duration-200
        hover:scale-105
      `}
      onClick={onSelect}
    >
      {/* 分数の視覚表現 */}
      {fraction.numerator !== 0 && (
        <div className="mb-4 h-32 flex items-center justify-center">
          {/* 常に枠線と分割線を表示、showVisualがtrueの時のみ塗りつぶしを表示 */}
          {renderVisual(showVisual)}
        </div>
      )}
      
      {/* 分数のテキスト表示 */}
      <div className="text-center">
        {fraction.numerator === 0 ? (
          <div className="text-3xl font-bold text-blue-600 py-8">
            同じ
          </div>
        ) : (
          <div className="inline-flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">
              {fraction.numerator}
            </span>
            <hr className="w-full border-t-2 border-gray-800 my-1" />
            <span className="text-3xl font-bold text-red-600">
              {fraction.denominator}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};