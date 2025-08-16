'use client';

import { FC, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  timeRemaining: number;
  maxTime?: number;
  onTick?: () => void;
}

export const Timer: FC<TimerProps> = ({ 
  timeRemaining, 
  maxTime = 60,
  onTick 
}) => {
  const percentage = (timeRemaining / maxTime) * 100;
  const isWarning = timeRemaining <= 10;

  useEffect(() => {
    if (onTick && timeRemaining > 0) {
      const timer = setTimeout(onTick, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, onTick]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-blue-700">
          <ruby>残<rt>のこ</rt></ruby>り<ruby>時間<rt>じかん</rt></ruby>
        </span>
        <span className={`text-2xl font-bold ${isWarning ? 'text-red-600 animate-pulse' : 'text-blue-900'}`}>
          {timeRemaining}<ruby>秒<rt>びょう</rt></ruby>
        </span>
      </div>
      
      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${
            isWarning ? 'bg-red-500' : percentage > 50 ? 'bg-green-500' : 'bg-yellow-500'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};