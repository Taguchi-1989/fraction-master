# 分数マスター 開発記録

## プロジェクト概要

6歳児向けの分数学習ゲームとして開発された React + Next.js アプリケーション

### 技術スタック

- **フレームワーク**: Next.js 15.4.6 (App Router)
- **UI ライブラリ**: React 19.1.0
- **言語**: TypeScript 5.x
- **スタイリング**: Tailwind CSS 4.x
- **状態管理**: Zustand 5.0.7
- **音響**: Web Audio API + Google Vertex AI
- **AI音声生成**: Vertex AI Text-to-Speech API
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

### 4. AI音響システムの実装
**要件**: アニメーションは避け、AI生成音響効果で体験を向上
**実装**: 
```typescript
// lib/audio.ts
class AudioManager {
  playCorrectSound() // ピンポン音
  playIncorrectSound() // ブザー音  
  playHintSound() // クリック音
  playGameCompleteSound() // ファンファーレ
  playBGM() // Vertex AI生成BGM
  playGoodJobSound() // Vertex AI生成音声「よくできたね」
}
```

**AI音声生成システム**:
- **プラットフォーム**: Google Vertex AI Text-to-Speech API
- **音声素材**: 
  - `speech.wav`: 「よくできたね」音声（30点以上で再生）
  - `music1.wav`: BGM（ゲーム中ループ再生）
- **著作権**: すべてAI生成による著作権フリー素材
- **最適化**: 子供向けに最適化された音質・音量調整

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

### 6. 学習支援機能の強化
**実装**: 
- 改善型2段階ヒントシステムの導入
- 分母の構造（枠線）を常時表示し、数える練習をサポート
- ヒントボタンで分子の量を塗りつぶし表示
- 分数の基本概念理解を促進

### 7. 遊び方説明ページの実装
**課題**: 初回プレイ時の操作理解とルール説明が不足
**解決策**: 
- 専用の遊び方説明ページを作成
- 分数の基本概念（分母・分子）を視覚的に説明
- 3/5の例で5本線と3つ埋まりの直感的な表現
- ゲーム操作方法とスコアシステムの詳細説明
- レベル別難易度の事前説明

### 8. スコアリングシステムの改善
**課題**: 固定10点制では戦略性に欠ける
**解決策**: 
- ヒント未使用正解：10点
- ヒント使用正解：5点
- より戦略的なゲームプレイを促進

### 9. バージョン管理システムの導入
**実装**: 
- package.jsonからバージョン情報を動的取得
- クレジット画面でバージョン表示
- 明確なリリース管理（v1.0.0）

### 10. クレジット機能の追加
**実装**: 
- タイトル画面からアクセス可能なクレジットページ
- 技術情報、無料・広告なしポリシーの明示
- ZEAL BOOT CAMP のブランディング
- バージョン情報の表示

## コードアーキテクチャ

### 状態管理 (Zustand)
```typescript
// store/gameStore.ts
interface GameState {
  currentScreen: 'title' | 'levelSelect' | 'game' | 'result' | 'credits' | 'howToPlay';
  currentQuestion: Question | null;
  score: number;
  wrongAnswers: WrongAnswer[];
  hintButtonEnabled: boolean;
  showVisuals: boolean;
  // ...
}
```

### コンポーネント構成
```
app/
├── page.tsx (メインルーター + 画面管理)
components/
├── game/
│   ├── FractionCard.tsx (改善型分数カード表示)
│   ├── ComparisonVisualization.tsx (比較視覚化)
│   └── ReviewSection.tsx (復習セクション)
├── screens/
│   ├── CreditsScreen.tsx (クレジット画面)
│   └── HowToPlayScreen.tsx (遊び方説明画面)
├── ui/
│   └── Button.tsx (共通ボタンコンポーネント)
lib/
├── audio.ts (音響管理 + BGM機能 + Vertex AI音声)
├── questions.ts (問題生成)
└── questionValidator.ts (問題検証)
store/
└── gameStore.ts (Zustand状態管理)
types/
└── game.ts (TypeScript型定義)
public/
└── audio/
    ├── music1.wav (Vertex AI生成BGM)
    └── speech.wav (Vertex AI生成音声褒賞「よくできたね」)
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

## v1.0.0での実装済み機能

### コア機能
- [x] 改善型2段階ヒントシステム
- [x] 分数の視覚的説明機能
- [x] 遊び方説明ページ
- [x] 戦略的スコアシステム
- [x] BGMと音声フィードバック（Vertex AI生成）
- [x] AI音声合成システム（Google Vertex AI）
- [x] バージョン管理システム
- [x] レスポンシブデザイン
- [x] アクセシビリティ対応（ルビ機能）

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