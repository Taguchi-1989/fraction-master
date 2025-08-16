// 問題プールの品質を検証するスクリプト

import { QUESTION_POOL } from '../lib/questions';
import { validateQuestionPool, printValidationResults } from '../lib/questionValidator';

// 全レベルの問題を検証
function main() {
  console.log('問題プールの品質チェックを開始します...\n');
  
  const allQuestions = [
    ...QUESTION_POOL.easy,
    ...QUESTION_POOL.normal,
    ...QUESTION_POOL.hard,
  ];
  
  const results = validateQuestionPool(allQuestions);
  printValidationResults(results);
  
  // レベル別統計
  console.log('\n=== レベル別統計 ===');
  console.log(`Easy: ${QUESTION_POOL.easy.length}問`);
  console.log(`Normal: ${QUESTION_POOL.normal.length}問`);
  console.log(`Hard: ${QUESTION_POOL.hard.length}問`);
  console.log(`総計: ${allQuestions.length}問`);
}

// エクスポートされた問題プールを取得するためのダミー実装
// （実際の検証は手動で行う）
export {};