# 分数マスター 開発記録

## プロジェクト概要

6歳児向けの分数学習ゲームとして開発された React + Next.js アプリケーション

### 技術スタック

- **フレームワーク**: Next.js 15.4.6 (App Router)
- **UI ライブラリ**: React 19.1.0
- **言語**: TypeScript 5.x
- **スタイリング**: Tailwind CSS 4.x
- **状態管理**: Zustand 5.0.7
- **音響**: Web Audio API
- **デプロイ**: Vercel
- **バージョン管理**: Git / GitHub

## 開発経緯と実装ポイント

### 1. 基本設計の改善
**課題**: 元の設計では時間制限があり、6歳の子供には負担が大きかった
**解決策**: 
- 時間制限を削除
- 5問制に変更し、達成感を重視
- 2段階ヒントシステムの実装（10秒後にヒントボタン有効化）

### 2. 視覚的表現の強化
**課題**: 3/3のような分数（1以上）が視覚的に表現されていなかった
**解決策**: 
```typescript
// FractionCard.tsx:42-46
{fillPercentage >= 100 ? (
  <circle cx="60" cy="60" r="100" fill="#3b82f6" opacity="0.7" />
) : fillPercentage > 0 ? (
  <path d={...} fill="#3b82f6" opacity="0.7" />
) : null}
```

### 3. 比較視覚化システムの開発
**課題**: 間違えた問題の復習で、分数の大小関係が分かりづらい
**解決策**: 
- 3種類の視覚化（circle, rectangle, liquid）を実装
- 外側/内側の円による比較表現
- 混乱を避けるため文字による説明を最小化
- 不要な矢印を削除し、視覚的要素のみで比較

### 4. 音響システムの実装
**要件**: アニメーションは避け、音響効果のみで体験を向上
**実装**: 
```typescript
// lib/audio.ts
class AudioManager {
  playCorrectSound() // ピンポン音
  playIncorrectSound() // ブザー音  
  playHintSound() // クリック音
  playGameCompleteSound() // ファンファーレ
}
```

### 5. デプロイメント課題の解決
**問題1**: Framer Motion の TypeScript 互換性エラー
**解決**: 
- motion.div → 通常のdiv + CSS transitions に置換
- アニメーション効果を維持しつつ、依存関係を削減

**問題2**: Vercel 設定エラー
**解決**: 
```json
// vercel.json 簡素化
{
  "framework": "nextjs",
  "alias": ["fraction-master.vercel.app"]
}
```

### 6. クレジット機能の追加
**実装**: 
- タイトル画面からアクセス可能なクレジットページ
- 技術情報、無料・広告なしポリシーの明示
- ZEAL BOOT CAMP のブランディング

## コードアーキテクチャ

### 状態管理 (Zustand)
```typescript
// store/gameStore.ts
interface GameState {
  currentScreen: 'title' | 'levelSelect' | 'game' | 'result' | 'credits';
  currentQuestion: Question | null;
  score: number;
  wrongAnswers: WrongAnswer[];
  // ...
}
```

### コンポーネント構成
```
app/
├── page.tsx (メインルーター)
components/
├── game/
│   ├── FractionCard.tsx (分数カード表示)
│   ├── Timer.tsx (削除されたコンポーネント)
│   ├── ComparisonVisualization.tsx (比較視覚化)
│   └── ReviewSection.tsx (復習セクション)
├── screens/
│   └── CreditsScreen.tsx (クレジット画面)
└── ui/
    └── Button.tsx (共通ボタン)
```

### データ構造
```typescript
interface Question {
  id: string;
  text: string;
  textWithRuby?: string;
  options: QuestionOption[];
  level: 'easy' | 'normal' | 'hard';
}

interface Fraction {
  numerator: number;
  denominator: number;
}
```

## 今後の開発予定

### Phase 1: ユーザー機能
- [ ] ログイン機能の実装
- [ ] 個人の学習進捗記録
- [ ] カスタマイズ可能なアバター機能
- [ ] 親向けの進捗レポート機能

### Phase 2: ゲーム拡張
- [ ] より多様な分数問題（足し算、引き算）
- [ ] 小数との関連付け学習
- [ ] マルチプレイヤーモード
- [ ] 達成バッジシステム

### Phase 3: 技術向上
- [ ] PWA対応（オフライン利用）
- [ ] アクセシビリティ強化
- [ ] パフォーマンス最適化
- [ ] 多言語対応

### Phase 4: データ分析
- [ ] 学習分析ダッシュボード
- [ ] AI による個別学習推奨
- [ ] 困難度の自動調整機能

## セキュリティとプライバシー
- 個人情報の最小収集
- GDPR準拠のデータ処理
- 子供向けサービスとしての安全性確保

## パフォーマンス目標
- First Contentful Paint: < 1.5秒
- Largest Contentful Paint: < 2.5秒
- モバイル端末対応: 100%

---

**開発者**: ZEAL BOOT CAMP  
**最終更新**: 2025年8月16日  
**バージョン**: 1.0.0