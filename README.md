# 分数マスター (Fraction Master)

6歳の子供向けの分数学習ゲーム。視覚的な分数表現と段階的ヒント機能により、楽しく分数の概念を学べるWebアプリケーションです。

## 🎯 主な機能

### 🎮 ゲーム機能
- **3段階レベル**: 初級・中級・上級の難易度設定
- **5問完結**: 集中力を維持できる適切な問題数
- **ランダム出題**: 各レベル10問からランダム5問選択
- **3種類の問題**: 比較問題、等価問題、仲間はずれ問題

### 🎯 学習支援機能
- **段階的ヒント**: 数字 → 10秒後ヒント有効化 → 視覚表示
- **視覚的表現**: 円形、長方形、液体の3種類
- **間違い復習**: 不正解問題の詳細比較表示
- **即時フィードバック**: 正解・不正解の視覚的表示

### 🔊 音声機能
- **効果音**: クリック音、正解音、不正解音
- **ヒント音**: やわらかいチャイム音
- **完了音**: ゲーム終了時のファンファーレ

### 🎨 UI/UX機能
- **ふりがな対応**: 全ての漢字にふりがな付き
- **レスポンシブ**: PC・タブレット・スマートフォン対応
- **アクセシビリティ**: 子供にも分かりやすいインターフェース

## 🛠️ 技術スタック

- **Frontend**: React 18, Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (軽微)
- **State Management**: Zustand
- **Audio**: Web Audio API
- **Graphics**: SVG
- **Deployment**: Vercel (SSG)

## 🚀 開発・デプロイ

### ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ブラウザで http://localhost:3000 を開く
```

### ビルド

```bash
# 本番ビルド
npm run build

# ビルド結果の確認
npm start
```

### デプロイメント

1. **GitHub連携**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [your-github-repo-url]
   git push -u origin main
   ```

2. **Vercel連携**
   - [Vercel](https://vercel.com)にアクセス
   - GitHub連携でプロジェクトをインポート
   - 自動デプロイ開始

## 📁 プロジェクト構造

```
fraction-master/
├── app/                    # Next.js App Router
├── components/             # React コンポーネント
│   ├── game/              # ゲーム関連コンポーネント
│   ├── screens/           # 画面コンポーネント
│   └── ui/                # UI基本コンポーネント
├── lib/                   # ユーティリティ・ライブラリ
├── store/                 # 状態管理 (Zustand)
├── types/                 # TypeScript型定義
├── docs/                  # ドキュメント
└── public/               # 静的ファイル
```

## 📊 問題品質管理

```bash
# 問題プールの品質チェック
npm run validate-questions
```

## 🎯 運用方針

- **完全無料**: 全機能を無料で提供
- **広告なし**: 学習集中を妨げる広告は一切なし
- **プライバシー保護**: 個人情報の最小限収集
- **教育目的**: 6歳児の認知発達段階に適合した設計

## 📋 今後の実装予定

### 高優先度
- 学習記録・進歩追跡機能
- 音声読み上げ機能
- カスタマイズ機能（文字サイズ、色覚サポート）

### 中優先度
- 保護者向けレポート機能
- 季節イベント問題
- ソーシャル機能

詳細は[要件定義書](./docs/要件定義.md)をご参照ください。

## 🤝 制作者

**ZEAL BOOT CAMP**  
プログラミング教育を通じて、子どもたちの学習を支援しています。

## 📄 ライセンス

このプロジェクトは教育目的で作成されており、学習・研究目的での利用を歓迎します。

---

**最終更新**: 2025年8月16日# Updated for Vercel deployment
