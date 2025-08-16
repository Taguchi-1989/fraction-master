// 問題の品質を検証するためのユーティリティ

import { Question, Fraction } from '@/types/game';

// 分数の値を計算
function getFractionValue(fraction: Fraction): number {
  return fraction.numerator / fraction.denominator;
}

// 分数が等価かどうかを判定
function areFractionsEqual(f1: Fraction, f2: Fraction): boolean {
  return f1.numerator * f2.denominator === f2.numerator * f1.denominator;
}

// 問題の品質チェック結果
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// 比較問題の検証
function validateCompareQuestion(question: Question): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };
  
  if (question.options.length !== 2) {
    result.errors.push('比較問題は2つの選択肢が必要です');
    result.isValid = false;
  }
  
  const correctOptions = question.options.filter(opt => opt.isCorrect);
  if (correctOptions.length !== 1) {
    result.errors.push('比較問題は正解が1つである必要があります');
    result.isValid = false;
  }
  
  // 同じ値の分数がないかチェック
  const [option1, option2] = question.options;
  if (areFractionsEqual(option1.fraction, option2.fraction)) {
    result.errors.push('比較問題で同じ値の分数があります');
    result.isValid = false;
  }
  
  return result;
}

// 等価問題の検証
function validateEquivalentQuestion(question: Question): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };
  
  const correctOptions = question.options.filter(opt => opt.isCorrect);
  if (correctOptions.length !== 1) {
    result.errors.push('等価問題は正解が1つである必要があります');
    result.isValid = false;
  }
  
  // 正解以外で等価な分数がないかチェック
  const correctOption = correctOptions[0];
  const incorrectOptions = question.options.filter(opt => !opt.isCorrect);
  
  for (const incorrectOption of incorrectOptions) {
    if (areFractionsEqual(correctOption.fraction, incorrectOption.fraction)) {
      result.errors.push('等価問題で複数の正解があります');
      result.isValid = false;
    }
  }
  
  return result;
}

// 仲間はずれ問題の検証
function validateOddOneOutQuestion(question: Question): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };
  
  if (question.options.length !== 3) {
    result.errors.push('仲間はずれ問題は3つの選択肢が必要です');
    result.isValid = false;
  }
  
  const correctOptions = question.options.filter(opt => opt.isCorrect);
  if (correctOptions.length !== 1) {
    result.errors.push('仲間はずれ問題は正解が1つである必要があります');
    result.isValid = false;
  }
  
  // 正解以外の2つが等価かチェック
  const incorrectOptions = question.options.filter(opt => !opt.isCorrect);
  if (incorrectOptions.length === 2) {
    const [opt1, opt2] = incorrectOptions;
    if (!areFractionsEqual(opt1.fraction, opt2.fraction)) {
      result.errors.push('仲間はずれ問題で仲間になるべき2つが等価ではありません');
      result.isValid = false;
    }
  }
  
  return result;
}

// 単一問題の検証
export function validateQuestion(question: Question): ValidationResult {
  let result: ValidationResult;
  
  switch (question.type) {
    case 'compare':
      result = validateCompareQuestion(question);
      break;
    case 'equivalent':
      result = validateEquivalentQuestion(question);
      break;
    case 'oddOneOut':
      result = validateOddOneOutQuestion(question);
      break;
    default:
      result = { isValid: false, errors: ['不明な問題タイプです'], warnings: [] };
  }
  
  return result;
}

// 問題プール全体の検証
export function validateQuestionPool(questions: Question[]): { [questionId: string]: ValidationResult } {
  const results: { [questionId: string]: ValidationResult } = {};
  
  for (const question of questions) {
    results[question.id] = validateQuestion(question);
  }
  
  return results;
}

// 検証結果をコンソールに出力
export function printValidationResults(results: { [questionId: string]: ValidationResult }): void {
  console.log('=== 問題品質チェック結果 ===');
  
  let totalQuestions = 0;
  let validQuestions = 0;
  let totalErrors = 0;
  let totalWarnings = 0;
  
  for (const [questionId, result] of Object.entries(results)) {
    totalQuestions++;
    if (result.isValid) {
      validQuestions++;
    }
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
    
    if (!result.isValid || result.warnings.length > 0) {
      console.log(`\n問題 ${questionId}:`);
      if (result.errors.length > 0) {
        console.log('  ❌ エラー:');
        result.errors.forEach(error => console.log(`    - ${error}`));
      }
      if (result.warnings.length > 0) {
        console.log('  ⚠️  警告:');
        result.warnings.forEach(warning => console.log(`    - ${warning}`));
      }
    }
  }
  
  console.log(`\n=== サマリー ===`);
  console.log(`総問題数: ${totalQuestions}`);
  console.log(`有効な問題: ${validQuestions}`);
  console.log(`無効な問題: ${totalQuestions - validQuestions}`);
  console.log(`総エラー数: ${totalErrors}`);
  console.log(`総警告数: ${totalWarnings}`);
  
  if (totalErrors === 0) {
    console.log('✅ すべての問題が有効です！');
  } else {
    console.log('❌ 修正が必要な問題があります。');
  }
}