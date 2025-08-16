'use client';

import { FC } from 'react';
import { useGameStore } from '@/store/gameStore';
import packageJson from '@/package.json';

export const CreditsScreen: FC = () => {
  const { resetGame } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            <ruby>制作者<rt>せいさくしゃ</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>
          </h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto rounded"></div>
        </div>

        {/* メインコンテンツ */}
        <div className="space-y-8">
          {/* 制作者クレジット */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">
              <ruby>制作<rt>せいさく</rt></ruby>・<ruby>開発<rt>かいはつ</rt></ruby>
            </h2>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700 mb-2">
                ZEAL BOOT CAMP
              </div>
              <p className="text-gray-600">
                プログラミング<ruby>教育<rt>きょういく</rt></ruby>を通じて、子どもたちの<ruby>学習<rt>がくしゅう</rt></ruby>を<ruby>支援<rt>しえん</rt></ruby>しています
              </p>
            </div>
          </div>

          {/* 技術情報 */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
              <ruby>技術<rt>ぎじゅつ</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  <ruby>使用<rt>しよう</rt></ruby><ruby>技術<rt>ぎじゅつ</rt></ruby>
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    React 18 (JavaScript<ruby>框架<rt>フレームワーク</rt></ruby>)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Next.js 14 (Web<ruby>框架<rt>フレームワーク</rt></ruby>)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    TypeScript (<ruby>型<rt>かた</rt></ruby><ruby>安全<rt>あんぜん</rt></ruby>)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    Tailwind CSS (スタイリング)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Zustand (<ruby>状態<rt>じょうたい</rt></ruby><ruby>管理<rt>かんり</rt></ruby>)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  <ruby>実装<rt>じっそう</rt></ruby><ruby>機能<rt>きのう</rt></ruby>
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    SVG<ruby>分数<rt>ぶんすう</rt></ruby><ruby>視覚化<rt>しかくか</rt></ruby>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    <ruby>段階的<rt>だんかいてき</rt></ruby>ヒント<ruby>機能<rt>きのう</rt></ruby>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <ruby>間違<rt>まちが</rt></ruby>い<ruby>復習<rt>ふくしゅう</rt></ruby><ruby>機能<rt>きのう</rt></ruby>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    レスポンシブ<ruby>対応<rt>たいおう</rt></ruby>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                    <ruby>問題<rt>もんだい</rt></ruby>プール<ruby>管理<rt>かんり</rt></ruby>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 運用方針 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-center text-orange-800 mb-4">
              <ruby>運用<rt>うんよう</rt></ruby><ruby>方針<rt>ほうしん</rt></ruby>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">💝</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  <ruby>完全<rt>かんぜん</rt></ruby><ruby>無料<rt>むりょう</rt></ruby>
                </h3>
                <p className="text-gray-600 text-sm">
                  すべての<ruby>機能<rt>きのう</rt></ruby>を<ruby>無料<rt>むりょう</rt></ruby>で<ruby>提供<rt>ていきょう</rt></ruby>しています
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🚫</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  <ruby>広告<rt>こうこく</rt></ruby>なし
                </h3>
                <p className="text-gray-600 text-sm">
                  <ruby>学習<rt>がくしゅう</rt></ruby>に<ruby>集中<rt>しゅうちゅう</rt></ruby>できるよう<ruby>広告<rt>こうこく</rt></ruby>は<ruby>一切<rt>いっさい</rt></ruby><ruby>表示<rt>ひょうじ</rt></ruby>しません
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                <p className="text-gray-700">
                  <strong><ruby>目的<rt>もくてき</rt></ruby>:</strong> 子どもたちが<ruby>楽<rt>たの</rt></ruby>しく<ruby>分数<rt>ぶんすう</rt></ruby>を<ruby>学<rt>まな</rt></ruby>べる<ruby>環境<rt>かんきょう</rt></ruby>を<ruby>提供<rt>ていきょう</rt></ruby>すること
                </p>
              </div>
            </div>
          </div>

          {/* デプロイメント情報 */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              <ruby>配信<rt>はいしん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>
            </h2>
            <div className="text-center">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Version {packageJson.version}
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                Vercel <ruby>静的<rt>せいてき</rt></ruby>サイト<ruby>生成<rt>せいせい</rt></ruby> (SSG) による<ruby>高速<rt>こうそく</rt></ruby><ruby>配信<rt>はいしん</rt></ruby>
              </p>
              <p className="text-sm text-gray-500">
                <ruby>世界中<rt>せかいじゅう</rt></ruby>どこからでも<ruby>高速<rt>こうそく</rt></ruby>アクセス<ruby>可能<rt>かのう</rt></ruby>
              </p>
            </div>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="text-center mt-8">
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            タイトル<ruby>画面<rt>がめん</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>る
          </button>
        </div>
      </div>
    </div>
  );
};