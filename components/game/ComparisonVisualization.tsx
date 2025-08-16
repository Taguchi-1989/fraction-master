'use client';

import { FC } from 'react';
import { Fraction } from '@/types/game';

interface ComparisonVisualizationProps {
  selectedFraction: Fraction;
  correctFraction: Fraction;
  visualType: 'circle' | 'rectangle' | 'liquid';
}

export const ComparisonVisualization: FC<ComparisonVisualizationProps> = ({
  selectedFraction,
  correctFraction,
  visualType,
}) => {
  const selectedValue = selectedFraction.numerator / selectedFraction.denominator;
  const correctValue = correctFraction.numerator / correctFraction.denominator;

  const renderCircleComparison = () => {
    return (
      <div className="relative">
        <svg width="240" height="240" viewBox="0 0 240 240" className="mx-auto">
          {/* 外側の円（大きい方の分数） */}
          <circle
            cx="120"
            cy="120"
            r="100"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="3"
          />
          
          {/* 内側の円（小さい方の分数） */}
          <circle
            cx="120"
            cy="120"
            r="70"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="3"
          />

          {/* 大きい方の分数の塗りつぶし */}
          {correctValue >= selectedValue ? (
            <>
              {/* 正解の方が大きい場合 - 外側が緑 */}
              <path
                d={`M 120,120 L 120,20 A 100,100 0 ${correctValue * 100 > 50 ? 1 : 0},1 ${
                  120 + 100 * Math.sin((correctValue) * 2 * Math.PI)
                },${120 - 100 * Math.cos((correctValue) * 2 * Math.PI)} z`}
                fill="#10b981"
                opacity="0.7"
              />
              {/* 選択した分数 - 内側が赤 */}
              <path
                d={`M 120,120 L 120,50 A 70,70 0 ${selectedValue * 100 > 50 ? 1 : 0},1 ${
                  120 + 70 * Math.sin((selectedValue) * 2 * Math.PI)
                },${120 - 70 * Math.cos((selectedValue) * 2 * Math.PI)} z`}
                fill="#ef4444"
                opacity="0.7"
              />
            </>
          ) : (
            <>
              {/* 選択した分数の方が大きい場合 - 外側が赤 */}
              <path
                d={`M 120,120 L 120,20 A 100,100 0 ${selectedValue * 100 > 50 ? 1 : 0},1 ${
                  120 + 100 * Math.sin((selectedValue) * 2 * Math.PI)
                },${120 - 100 * Math.cos((selectedValue) * 2 * Math.PI)} z`}
                fill="#ef4444"
                opacity="0.7"
              />
              {/* 正解 - 内側が緑 */}
              <path
                d={`M 120,120 L 120,50 A 70,70 0 ${correctValue * 100 > 50 ? 1 : 0},1 ${
                  120 + 70 * Math.sin((correctValue) * 2 * Math.PI)
                },${120 - 70 * Math.cos((correctValue) * 2 * Math.PI)} z`}
                fill="#10b981"
                opacity="0.7"
              />
            </>
          )}

          {/* 分割線（外側） */}
          {Array.from({ length: Math.max(selectedFraction.denominator, correctFraction.denominator) }).map((_, i) => {
            const totalDivisions = Math.max(selectedFraction.denominator, correctFraction.denominator);
            const angle = (i * 360) / totalDivisions;
            const x2 = 120 + 100 * Math.sin((angle * Math.PI) / 180);
            const y2 = 120 - 100 * Math.cos((angle * Math.PI) / 180);
            return (
              <line
                key={`outer-${i}`}
                x1="120"
                y1="120"
                x2={x2}
                y2={y2}
                stroke="#374151"
                strokeWidth="2"
              />
            );
          })}

          {/* 分割線（内側） */}
          {Array.from({ length: Math.min(selectedFraction.denominator, correctFraction.denominator) }).map((_, i) => {
            const totalDivisions = Math.min(selectedFraction.denominator, correctFraction.denominator);
            const angle = (i * 360) / totalDivisions;
            const x2 = 120 + 70 * Math.sin((angle * Math.PI) / 180);
            const y2 = 120 - 70 * Math.cos((angle * Math.PI) / 180);
            return (
              <line
                key={`inner-${i}`}
                x1="120"
                y1="120"
                x2={x2}
                y2={y2}
                stroke="#374151"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {/* 円形の場合の説明 */}
        <div className="mt-4 flex justify-center gap-8">
          <div className="text-center">
            <div className="w-4 h-4 bg-green-500 opacity-70 rounded-full mx-auto mb-1"></div>
            <p className="text-sm font-semibold text-green-600">
              <ruby>正解<rt>せいかい</rt></ruby>: {correctFraction.numerator}/{correctFraction.denominator}
            </p>
            <p className="text-xs text-gray-600">
              {correctValue >= selectedValue ? '(外側の円)' : '(内側の円)'}
            </p>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-red-500 opacity-70 rounded-full mx-auto mb-1"></div>
            <p className="text-sm font-semibold text-red-600">
              あなたの<ruby>選択<rt>せんたく</rt></ruby>: {selectedFraction.numerator}/{selectedFraction.denominator}
            </p>
            <p className="text-xs text-gray-600">
              {selectedValue >= correctValue ? '(外側の円)' : '(内側の円)'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderRectangleComparison = () => {
    const maxHeight = 200;
    const selectedHeight = selectedValue * maxHeight;
    const correctHeight = correctValue * maxHeight;

    return (
      <div className="flex justify-center items-end gap-4">
        <div className="text-center">
          <div className="relative bg-gray-200 border-2 border-gray-400" style={{ width: '80px', height: `${maxHeight}px` }}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-red-500 opacity-70 transition-all duration-1000"
              style={{ height: `${selectedHeight}px` }}
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-red-600">
            あなたの<ruby>選択<rt>せんたく</rt></ruby>
          </p>
          <p className="text-lg font-bold text-red-600">
            {selectedFraction.numerator}/{selectedFraction.denominator}
          </p>
        </div>

        <div className="text-center">
          <div className="relative bg-gray-200 border-2 border-gray-400" style={{ width: '80px', height: `${maxHeight}px` }}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-green-500 opacity-70 transition-all duration-1000"
              style={{ height: `${correctHeight}px` }}
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-green-600">
            <ruby>正解<rt>せいかい</rt></ruby>
          </p>
          <p className="text-lg font-bold text-green-600">
            {correctFraction.numerator}/{correctFraction.denominator}
          </p>
        </div>

        {/* 比較矢印 */}
        <div className="flex flex-col items-center justify-center ml-4">
          {selectedValue < correctValue ? (
            <div className="text-4xl text-green-600">↑</div>
          ) : selectedValue > correctValue ? (
            <div className="text-4xl text-red-600">↑</div>
          ) : (
            <div className="text-4xl text-blue-600">=</div>
          )}
        </div>
      </div>
    );
  };

  const renderLiquidComparison = () => {
    const containerHeight = 200;
    const selectedHeight = selectedValue * containerHeight;
    const correctHeight = correctValue * containerHeight;

    return (
      <div className="flex justify-center items-end gap-4">
        <div className="text-center">
          <div className="relative border-2 border-gray-400 rounded-b-lg overflow-hidden bg-gray-100" 
               style={{ width: '80px', height: `${containerHeight}px` }}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-red-400 transition-all duration-1000"
              style={{ height: `${selectedHeight}px` }}
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-red-600">
            あなたの<ruby>選択<rt>せんたく</rt></ruby>
          </p>
          <p className="text-lg font-bold text-red-600">
            {selectedFraction.numerator}/{selectedFraction.denominator}
          </p>
        </div>

        <div className="text-center">
          <div className="relative border-2 border-gray-400 rounded-b-lg overflow-hidden bg-gray-100" 
               style={{ width: '80px', height: `${containerHeight}px` }}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-green-400 transition-all duration-1000"
              style={{ height: `${correctHeight}px` }}
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-green-600">
            <ruby>正解<rt>せいかい</rt></ruby>
          </p>
          <p className="text-lg font-bold text-green-600">
            {correctFraction.numerator}/{correctFraction.denominator}
          </p>
        </div>

        {/* 水位比較線 */}
        <div className="flex flex-col items-center justify-center ml-4">
          {selectedValue < correctValue ? (
            <div className="text-4xl text-green-600">↑</div>
          ) : selectedValue > correctValue ? (
            <div className="text-4xl text-red-600">↑</div>
          ) : (
            <div className="text-4xl text-blue-600">=</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
      <h4 className="text-lg font-bold text-center mb-4 text-blue-900">
        <ruby>視覚的<rt>しかくてき</rt></ruby><ruby>比較<rt>ひかく</rt></ruby>
      </h4>
      
      {visualType === 'circle' && renderCircleComparison()}
      {visualType === 'rectangle' && renderRectangleComparison()}
      {visualType === 'liquid' && renderLiquidComparison()}
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          {selectedValue < correctValue ? (
            <>
              <span className="text-red-600 font-semibold">{selectedFraction.numerator}/{selectedFraction.denominator}</span>
              <span className="mx-2 text-gray-500">&lt;</span>
              <span className="text-green-600 font-semibold">{correctFraction.numerator}/{correctFraction.denominator}</span>
            </>
          ) : selectedValue > correctValue ? (
            <>
              <span className="text-red-600 font-semibold">{selectedFraction.numerator}/{selectedFraction.denominator}</span>
              <span className="mx-2 text-gray-500">&gt;</span>
              <span className="text-green-600 font-semibold">{correctFraction.numerator}/{correctFraction.denominator}</span>
            </>
          ) : (
            <>
              <span className="text-red-600 font-semibold">{selectedFraction.numerator}/{selectedFraction.denominator}</span>
              <span className="mx-2 text-gray-500">=</span>
              <span className="text-green-600 font-semibold">{correctFraction.numerator}/{correctFraction.denominator}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};