import { Question, Fraction } from '@/types/game';

// 分数の大小比較
function compareFractions(f1: Fraction, f2: Fraction): number {
  return (f1.numerator * f2.denominator) - (f2.numerator * f1.denominator);
}

// 分数が同じかどうかを判定
function areFractionsEqual(f1: Fraction, f2: Fraction): boolean {
  return f1.numerator * f2.denominator === f2.numerator * f1.denominator;
}

// ランダムな分数を生成
function generateRandomFraction(level: 'easy' | 'normal' | 'hard'): Fraction {
  let denominators: number[] = [];
  
  switch (level) {
    case 'easy':
      denominators = [2, 3, 4];
      break;
    case 'normal':
      denominators = [2, 3, 4, 5, 6, 8];
      break;
    case 'hard':
      denominators = [2, 3, 4, 5, 6, 8, 10, 12];
      break;
  }
  
  const denominator = denominators[Math.floor(Math.random() * denominators.length)];
  const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
  
  return { numerator, denominator };
}

// 事前定義された問題プール
export const QUESTION_POOL: { [key in 'easy' | 'normal' | 'hard']: Question[] } = {
  easy: [
    // 大小比較問題 (1-7)
    {
      id: 'easy_1',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 1, denominator: 2 }, displayText: '1/2', visualType: 'circle', isCorrect: true },
        { fraction: { numerator: 1, denominator: 3 }, displayText: '1/3', visualType: 'circle', isCorrect: false },
      ],
      difficulty: 1,
      hint: { animationType: 'compare', message: 'ケーキを見比べてみてください。どちらが大きいでしょうか。', messageWithRuby: 'ケーキを<ruby>見比<rt>みくら</rt></ruby>べてみてください。どちらが<ruby>大<rt>おお</rt></ruby>きいでしょうか。' },
    },
    {
      id: 'easy_2',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 1, denominator: 4 }, displayText: '1/4', visualType: 'rectangle', isCorrect: false },
        { fraction: { numerator: 1, denominator: 2 }, displayText: '1/2', visualType: 'rectangle', isCorrect: true },
      ],
      difficulty: 1,
      hint: { animationType: 'compare', message: 'チョコレートを見比べてみてください。', messageWithRuby: 'チョコレートを<ruby>見比<rt>みくら</rt></ruby>べてみてください。' },
    },
    {
      id: 'easy_3',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 2, denominator: 3 }, displayText: '2/3', visualType: 'liquid', isCorrect: true },
        { fraction: { numerator: 1, denominator: 3 }, displayText: '1/3', visualType: 'liquid', isCorrect: false },
      ],
      difficulty: 1,
      hint: { animationType: 'compare', message: 'ジュースの量を見比べてみてください。', messageWithRuby: 'ジュースの<ruby>量<rt>りょう</rt></ruby>を<ruby>見比<rt>みくら</rt></ruby>べてみてください。' },
    },
    {
      id: 'easy_4',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 3, denominator: 4 }, displayText: '3/4', visualType: 'circle', isCorrect: true },
        { fraction: { numerator: 1, denominator: 4 }, displayText: '1/4', visualType: 'circle', isCorrect: false },
      ],
      difficulty: 1,
      hint: { animationType: 'compare', message: 'ピザを見比べてみてください。', messageWithRuby: 'ピザを<ruby>見比<rt>みくら</rt></ruby>べてみてください。' },
    },
    {
      id: 'easy_5',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 1, denominator: 3 }, displayText: '1/3', visualType: 'rectangle', isCorrect: false },
        { fraction: { numerator: 2, denominator: 4 }, displayText: '2/4', visualType: 'rectangle', isCorrect: true },
      ],
      difficulty: 1,
      hint: { animationType: 'compare', message: '半分と3分の1、どちらが大きいでしょう。', messageWithRuby: '<ruby>半分<rt>はんぶん</rt></ruby>と3<ruby>分<rt>ぶん</rt></ruby>の1、どちらが<ruby>大<rt>おお</rt></ruby>きいでしょう。' },
    },
    {
      id: 'easy_6',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 2, denominator: 2 }, displayText: '2/2', visualType: 'liquid', isCorrect: true },
        { fraction: { numerator: 3, denominator: 4 }, displayText: '3/4', visualType: 'liquid', isCorrect: false },
      ],
      difficulty: 1,
      hint: { animationType: 'compare', message: '全部と4分の3、どちらが多いでしょう。', messageWithRuby: '<ruby>全部<rt>ぜんぶ</rt></ruby>と4<ruby>分<rt>ぶん</rt></ruby>の3、どちらが<ruby>多<rt>おお</rt></ruby>いでしょう。' },
    },
    {
      id: 'easy_7',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 1, denominator: 4 }, displayText: '1/4', visualType: 'circle', isCorrect: false },
        { fraction: { numerator: 2, denominator: 3 }, displayText: '2/3', visualType: 'circle', isCorrect: true },
      ],
      difficulty: 1,
      hint: { animationType: 'compare', message: '4分の1と3分の2を比べてみましょう。', messageWithRuby: '4<ruby>分<rt>ぶん</rt></ruby>の1と3<ruby>分<rt>ぶん</rt></ruby>の2を<ruby>比<rt>くら</rt></ruby>べてみましょう。' },
    },
    {
      id: 'easy_8',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 3, denominator: 3 }, displayText: '3/3', visualType: 'circle', isCorrect: true },
        { fraction: { numerator: 2, denominator: 4 }, displayText: '2/4', visualType: 'circle', isCorrect: false },
      ],
      difficulty: 1,
      hint: { animationType: 'compare', message: '全部と半分、どちらが大きいでしょう。', messageWithRuby: '<ruby>全部<rt>ぜんぶ</rt></ruby>と<ruby>半分<rt>はんぶん</rt></ruby>、どちらが<ruby>大<rt>おお</rt></ruby>きいでしょう。' },
    },
    {
      id: 'easy_9',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 1, denominator: 2 }, displayText: '1/2', visualType: 'rectangle', isCorrect: true },
        { fraction: { numerator: 1, denominator: 4 }, displayText: '1/4', visualType: 'rectangle', isCorrect: false },
      ],
      difficulty: 1,
      hint: { animationType: 'compare', message: '半分と4分の1を比べてみましょう。', messageWithRuby: '<ruby>半分<rt>はんぶん</rt></ruby>と4<ruby>分<rt>ぶん</rt></ruby>の1を<ruby>比<rt>くら</rt></ruby>べてみましょう。' },
    },
    {
      id: 'easy_10',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 2, denominator: 3 }, displayText: '2/3', visualType: 'liquid', isCorrect: false },
        { fraction: { numerator: 3, denominator: 4 }, displayText: '3/4', visualType: 'liquid', isCorrect: true },
      ],
      difficulty: 1,
      hint: { animationType: 'compare', message: '3分の2と4分の3を比べてみましょう。', messageWithRuby: '3<ruby>分<rt>ぶん</rt></ruby>の2と4<ruby>分<rt>ぶん</rt></ruby>の3を<ruby>比<rt>くら</rt></ruby>べてみましょう。' },
    },
  ],
  normal: [
    // より複雑な比較・等価問題 (8-14)
    {
      id: 'normal_1',
      type: 'equivalent',
      text: '1/2と同じ大きさはどれですか？',
      textWithRuby: '1/2と<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさはどれですか？',
      options: [
        { fraction: { numerator: 2, denominator: 4 }, displayText: '2/4', visualType: 'rectangle', isCorrect: true },
        { fraction: { numerator: 1, denominator: 3 }, displayText: '1/3', visualType: 'rectangle', isCorrect: false },
      ],
      difficulty: 2,
      hint: { animationType: 'split', message: '同じ大きさでも、切り方が違うことがあります。', messageWithRuby: '<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさでも、<ruby>切<rt>き</rt></ruby>り<ruby>方<rt>かた</rt></ruby>が<ruby>違<rt>ちが</rt></ruby>うことがあります。' },
    },
    {
      id: 'normal_2',
      type: 'equivalent',
      text: '2/3と同じ大きさはどれですか？',
      textWithRuby: '2/3と<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさはどれですか？',
      options: [
        { fraction: { numerator: 4, denominator: 6 }, displayText: '4/6', visualType: 'circle', isCorrect: true },
        { fraction: { numerator: 1, denominator: 2 }, displayText: '1/2', visualType: 'circle', isCorrect: false },
      ],
      difficulty: 2,
      hint: { animationType: 'split', message: '6つに分けても、3つに分けても同じ量になることがあります。', messageWithRuby: '6つに<ruby>分<rt>わ</rt></ruby>けても、3つに<ruby>分<rt>わ</rt></ruby>けても<ruby>同<rt>おな</rt></ruby>じ<ruby>量<rt>りょう</rt></ruby>になることがあります。' },
    },
    {
      id: 'normal_3',
      type: 'oddOneOut',
      text: '仲間はずれはどれですか？',
      textWithRuby: '<ruby>仲間<rt>なかま</rt></ruby>はずれはどれですか？',
      options: [
        { fraction: { numerator: 1, denominator: 2 }, displayText: '1/2', visualType: 'liquid', isCorrect: false },
        { fraction: { numerator: 2, denominator: 4 }, displayText: '2/4', visualType: 'liquid', isCorrect: false },
        { fraction: { numerator: 1, denominator: 3 }, displayText: '1/3', visualType: 'liquid', isCorrect: true },
      ],
      difficulty: 2,
      hint: { animationType: 'compare', message: '2つは同じ量です。1つだけ違います。', messageWithRuby: '2つは<ruby>同<rt>おな</rt></ruby>じ<ruby>量<rt>りょう</rt></ruby>です。1つだけ<ruby>違<rt>ちが</rt></ruby>います。' },
    },
    {
      id: 'normal_4',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 3, denominator: 6 }, displayText: '3/6', visualType: 'rectangle', isCorrect: false },
        { fraction: { numerator: 4, denominator: 6 }, displayText: '4/6', visualType: 'rectangle', isCorrect: true },
      ],
      difficulty: 2,
      hint: { animationType: 'compare', message: '6つに分けた中で、3つと4つを比べてみましょう。', messageWithRuby: '6つに<ruby>分<rt>わ</rt></ruby>けた<ruby>中<rt>なか</rt></ruby>で、3つと4つを<ruby>比<rt>くら</rt></ruby>べてみましょう。' },
    },
    {
      id: 'normal_5',
      type: 'equivalent',
      text: '3/4と同じ大きさはどれですか？',
      textWithRuby: '3/4と<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさはどれですか？',
      options: [
        { fraction: { numerator: 6, denominator: 8 }, displayText: '6/8', visualType: 'circle', isCorrect: true },
        { fraction: { numerator: 2, denominator: 3 }, displayText: '2/3', visualType: 'circle', isCorrect: false },
      ],
      difficulty: 2,
      hint: { animationType: 'split', message: '8つに分けても4つに分けても同じ大きさになります。', messageWithRuby: '8つに<ruby>分<rt>わ</rt></ruby>けても4つに<ruby>分<rt>わ</rt></ruby>けても<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさになります。' },
    },
    {
      id: 'normal_6',
      type: 'oddOneOut',
      text: '仲間はずれはどれですか？',
      textWithRuby: '<ruby>仲間<rt>なかま</rt></ruby>はずれはどれですか？',
      options: [
        { fraction: { numerator: 2, denominator: 3 }, displayText: '2/3', visualType: 'rectangle', isCorrect: false },
        { fraction: { numerator: 4, denominator: 6 }, displayText: '4/6', visualType: 'rectangle', isCorrect: false },
        { fraction: { numerator: 1, denominator: 4 }, displayText: '1/4', visualType: 'rectangle', isCorrect: true },
      ],
      difficulty: 2,
      hint: { animationType: 'compare', message: '3分の2と6分の4は同じ大きさです。', messageWithRuby: '3<ruby>分<rt>ぶん</rt></ruby>の2と6<ruby>分<rt>ぶん</rt></ruby>の4は<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさです。' },
    },
    {
      id: 'normal_7',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 5, denominator: 8 }, displayText: '5/8', visualType: 'liquid', isCorrect: true },
        { fraction: { numerator: 2, denominator: 4 }, displayText: '2/4', visualType: 'liquid', isCorrect: false },
      ],
      difficulty: 2,
      hint: { animationType: 'compare', message: '8分の5と半分、どちらが多いでしょう。', messageWithRuby: '8<ruby>分<rt>ぶん</rt></ruby>の5と<ruby>半分<rt>はんぶん</rt></ruby>、どちらが<ruby>多<rt>おお</rt></ruby>いでしょう。' },
    },
    {
      id: 'normal_8',
      type: 'equivalent',
      text: '1/3と同じ大きさはどれですか？',
      textWithRuby: '1/3と<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさはどれですか？',
      options: [
        { fraction: { numerator: 2, denominator: 6 }, displayText: '2/6', visualType: 'circle', isCorrect: true },
        { fraction: { numerator: 1, denominator: 4 }, displayText: '1/4', visualType: 'circle', isCorrect: false },
      ],
      difficulty: 2,
      hint: { animationType: 'split', message: '6つに分けても3つに分けても同じになります。', messageWithRuby: '6つに<ruby>分<rt>わ</rt></ruby>けても3つに<ruby>分<rt>わ</rt></ruby>けても<ruby>同<rt>おな</rt></ruby>じになります。' },
    },
    {
      id: 'normal_9',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 2, denominator: 5 }, displayText: '2/5', visualType: 'liquid', isCorrect: false },
        { fraction: { numerator: 3, denominator: 7 }, displayText: '3/7', visualType: 'liquid', isCorrect: true },
      ],
      difficulty: 2,
      hint: { animationType: 'compare', message: '5分の2と7分の3、どちらが大きいでしょう。', messageWithRuby: '5<ruby>分<rt>ぶん</rt></ruby>の2と7<ruby>分<rt>ぶん</rt></ruby>の3、どちらが<ruby>大<rt>おお</rt></ruby>きいでしょう。' },
    },
    {
      id: 'normal_10',
      type: 'oddOneOut',
      text: '仲間はずれはどれですか？',
      textWithRuby: '<ruby>仲間<rt>なかま</rt></ruby>はずれはどれですか？',
      options: [
        { fraction: { numerator: 3, denominator: 6 }, displayText: '3/6', visualType: 'circle', isCorrect: false },
        { fraction: { numerator: 1, denominator: 2 }, displayText: '1/2', visualType: 'circle', isCorrect: false },
        { fraction: { numerator: 2, denominator: 5 }, displayText: '2/5', visualType: 'circle', isCorrect: true },
      ],
      difficulty: 2,
      hint: { animationType: 'compare', message: '6分の3と2分の1は同じ大きさです。', messageWithRuby: '6<ruby>分<rt>ぶん</rt></ruby>の3と2<ruby>分<rt>ぶん</rt></ruby>の1は<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさです。' },
    },
  ],
  hard: [
    // 高難度問題 (15-20)
    {
      id: 'hard_1',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 7, denominator: 12 }, displayText: '7/12', visualType: 'circle', isCorrect: true },
        { fraction: { numerator: 4, denominator: 8 }, displayText: '4/8', visualType: 'circle', isCorrect: false },
      ],
      difficulty: 3,
      hint: { animationType: 'compare', message: '12分の7と半分を比べてみましょう。', messageWithRuby: '12<ruby>分<rt>ぶん</rt></ruby>の7と<ruby>半分<rt>はんぶん</rt></ruby>を<ruby>比<rt>くら</rt></ruby>べてみましょう。' },
    },
    {
      id: 'hard_2',
      type: 'equivalent',
      text: '5/10と同じ大きさはどれですか？',
      textWithRuby: '5/10と<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさはどれですか？',
      options: [
        { fraction: { numerator: 1, denominator: 2 }, displayText: '1/2', visualType: 'rectangle', isCorrect: true },
        { fraction: { numerator: 3, denominator: 5 }, displayText: '3/5', visualType: 'rectangle', isCorrect: false },
      ],
      difficulty: 3,
      hint: { animationType: 'split', message: '10個の半分は5個です。', messageWithRuby: '10<ruby>個<rt>こ</rt></ruby>の<ruby>半分<rt>はんぶん</rt></ruby>は5<ruby>個<rt>こ</rt></ruby>です。' },
    },
    {
      id: 'hard_3',
      type: 'oddOneOut',
      text: '仲間はずれはどれですか？',
      textWithRuby: '<ruby>仲間<rt>なかま</rt></ruby>はずれはどれですか？',
      options: [
        { fraction: { numerator: 3, denominator: 4 }, displayText: '3/4', visualType: 'liquid', isCorrect: false },
        { fraction: { numerator: 6, denominator: 8 }, displayText: '6/8', visualType: 'liquid', isCorrect: false },
        { fraction: { numerator: 2, denominator: 5 }, displayText: '2/5', visualType: 'liquid', isCorrect: true },
      ],
      difficulty: 3,
      hint: { animationType: 'compare', message: '4分の3と8分の6は同じ大きさです。', messageWithRuby: '4<ruby>分<rt>ぶん</rt></ruby>の3と8<ruby>分<rt>ぶん</rt></ruby>の6は<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさです。' },
    },
    {
      id: 'hard_4',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 8, denominator: 10 }, displayText: '8/10', visualType: 'rectangle', isCorrect: true },
        { fraction: { numerator: 7, denominator: 9 }, displayText: '7/9', visualType: 'rectangle', isCorrect: false },
      ],
      difficulty: 3,
      hint: { animationType: 'compare', message: '10分の8と9分の7、どちらが大きいでしょう。', messageWithRuby: '10<ruby>分<rt>ぶん</rt></ruby>の8と9<ruby>分<rt>ぶん</rt></ruby>の7、どちらが<ruby>大<rt>おお</rt></ruby>きいでしょう。' },
    },
    {
      id: 'hard_5',
      type: 'equivalent',
      text: '9/12と同じ大きさはどれですか？',
      textWithRuby: '9/12と<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさはどれですか？',
      options: [
        { fraction: { numerator: 3, denominator: 4 }, displayText: '3/4', visualType: 'circle', isCorrect: true },
        { fraction: { numerator: 2, denominator: 3 }, displayText: '2/3', visualType: 'circle', isCorrect: false },
      ],
      difficulty: 3,
      hint: { animationType: 'split', message: '12を4で割ると3、9を3で割ると3です。', messageWithRuby: '12を4で<ruby>割<rt>わ</rt></ruby>ると3、9を3で<ruby>割<rt>わ</rt></ruby>ると3です。' },
    },
    {
      id: 'hard_6',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 11, denominator: 12 }, displayText: '11/12', visualType: 'liquid', isCorrect: true },
        { fraction: { numerator: 9, denominator: 10 }, displayText: '9/10', visualType: 'liquid', isCorrect: false },
      ],
      difficulty: 3,
      hint: { animationType: 'compare', message: 'どちらも全体にとても近い大きさです。', messageWithRuby: 'どちらも<ruby>全体<rt>ぜんたい</rt></ruby>にとても<ruby>近<rt>ちか</rt></ruby>い<ruby>大<rt>おお</rt></ruby>きさです。' },
    },
    {
      id: 'hard_7',
      type: 'oddOneOut',
      text: '仲間はずれはどれですか？',
      textWithRuby: '<ruby>仲間<rt>なかま</rt></ruby>はずれはどれですか？',
      options: [
        { fraction: { numerator: 2, denominator: 3 }, displayText: '2/3', visualType: 'rectangle', isCorrect: false },
        { fraction: { numerator: 8, denominator: 12 }, displayText: '8/12', visualType: 'rectangle', isCorrect: false },
        { fraction: { numerator: 3, denominator: 5 }, displayText: '3/5', visualType: 'rectangle', isCorrect: true },
      ],
      difficulty: 3,
      hint: { animationType: 'compare', message: '3分の2と12分の8は同じ大きさです。', messageWithRuby: '3<ruby>分<rt>ぶん</rt></ruby>の2と12<ruby>分<rt>ぶん</rt></ruby>の8は<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさです。' },
    },
    {
      id: 'hard_8',
      type: 'equivalent',
      text: '7/14と同じ大きさはどれですか？',
      textWithRuby: '7/14と<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさはどれですか？',
      options: [
        { fraction: { numerator: 1, denominator: 2 }, displayText: '1/2', visualType: 'rectangle', isCorrect: true },
        { fraction: { numerator: 3, denominator: 7 }, displayText: '3/7', visualType: 'rectangle', isCorrect: false },
      ],
      difficulty: 3,
      hint: { animationType: 'split', message: '14を2で割ると7、7を1で割ると7です。', messageWithRuby: '14を2で<ruby>割<rt>わ</rt></ruby>ると7、7を1で<ruby>割<rt>わ</rt></ruby>ると7です。' },
    },
    {
      id: 'hard_9',
      type: 'compare',
      text: '大きいほうを選択してください',
      textWithRuby: '<ruby>大<rt>おお</rt></ruby>きいほうを<ruby>選択<rt>せんたく</rt></ruby>してください',
      options: [
        { fraction: { numerator: 4, denominator: 9 }, displayText: '4/9', visualType: 'circle', isCorrect: false },
        { fraction: { numerator: 5, denominator: 11 }, displayText: '5/11', visualType: 'circle', isCorrect: true },
      ],
      difficulty: 3,
      hint: { animationType: 'compare', message: '9分の4と11分の5、どちらが大きいでしょう。', messageWithRuby: '9<ruby>分<rt>ぶん</rt></ruby>の4と11<ruby>分<rt>ぶん</rt></ruby>の5、どちらが<ruby>大<rt>おお</rt></ruby>きいでしょう。' },
    },
    {
      id: 'hard_10',
      type: 'equivalent',
      text: '6/9と同じ大きさはどれですか？',
      textWithRuby: '6/9と<ruby>同<rt>おな</rt></ruby>じ<ruby>大<rt>おお</rt></ruby>きさはどれですか？',
      options: [
        { fraction: { numerator: 2, denominator: 3 }, displayText: '2/3', visualType: 'liquid', isCorrect: true },
        { fraction: { numerator: 3, denominator: 5 }, displayText: '3/5', visualType: 'liquid', isCorrect: false },
      ],
      difficulty: 3,
      hint: { animationType: 'split', message: '9を3で割ると3、6を3で割ると2です。', messageWithRuby: '9を3で<ruby>割<rt>わ</rt></ruby>ると3、6を3で<ruby>割<rt>わ</rt></ruby>ると2です。' },
    },
  ],
};

// ランダムに問題を選択する関数
function getRandomQuestions(level: 'easy' | 'normal' | 'hard', count: number = 5): Question[] {
  const pool = QUESTION_POOL[level];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, pool.length));
}

// 使用済み問題IDを管理する変数
let usedQuestions: Set<string> = new Set();
let currentQuestionPool: Question[] = [];

// ゲーム開始時に問題プールを初期化（10問から5問をランダム選択）
export function initializeQuestionPool(level: 'easy' | 'normal' | 'hard'): void {
  const allQuestions = QUESTION_POOL[level];
  // 10問から5問をランダムに選択
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  currentQuestionPool = shuffled.slice(0, 5);
  usedQuestions.clear();
  console.log(`${level}レベル: ${allQuestions.length}問中${currentQuestionPool.length}問を選択`);
}

// 問題を生成（ランダム選択）
export function generateQuestion(level: 'easy' | 'normal' | 'hard'): Question {
  // プールが空または未初期化の場合は初期化
  if (currentQuestionPool.length === 0) {
    initializeQuestionPool(level);
  }
  
  // 使用済み問題を除いた利用可能な問題を取得
  const availableQuestions = currentQuestionPool.filter(q => !usedQuestions.has(q.id));
  
  // 利用可能な問題がない場合は新しいプールを作成
  if (availableQuestions.length === 0) {
    initializeQuestionPool(level);
    return currentQuestionPool[0];
  }
  
  // ランダムに選択
  const selectedQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  usedQuestions.add(selectedQuestion.id);
  
  return selectedQuestion;
}