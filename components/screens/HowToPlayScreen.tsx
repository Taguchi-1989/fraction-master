'use client';

import { FC } from 'react';
import { useGameStore } from '@/store/gameStore';

const FractionExplanation: FC<{ numerator: number; denominator: number; title: string; description: string }> = ({
  numerator,
  denominator,
  title,
  description
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-center mb-4 text-blue-800">{title}</h3>
      
      {/* 分数表示 */}
      <div className="text-center mb-4">
        <div className="inline-flex flex-col items-center text-4xl font-bold">
          <span className="text-blue-600">{numerator}</span>
          <hr className="w-full border-t-3 border-gray-800 my-1" />
          <span className="text-red-600">{denominator}</span>
        </div>
      </div>

      {/* 視覚的表現 */}
      <div className="mb-4">
        <div className="flex justify-center items-center space-x-2">
          {Array.from({ length: denominator }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div 
                className={`w-8 h-20 border-2 border-gray-400 ${
                  i < numerator ? 'bg-blue-400' : 'bg-gray-100'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 説明文 */}
      <p className="text-center text-gray-700 text-sm">
        {description}
      </p>

      {/* 分母・分子の説明 */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-red-600 font-bold">{denominator}</span>
          <span className="text-sm text-gray-600">= <ruby>分母<rt>ぶんぼ</rt></ruby>（全部で何個に分けたか）</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-blue-600 font-bold">{numerator}</span>
          <span className="text-sm text-gray-600">= <ruby>分子<rt>ぶんし</rt></ruby>（そのうち何個とったか）</span>
        </div>
      </div>
    </div>
  );
};

export const HowToPlayScreen: FC = () => {
  const { resetGame } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            <ruby>遊<rt>あそ</rt></ruby>び<ruby>方<rt>かた</rt></ruby>
          </h1>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded"></div>
        </div>

        <div className="space-y-8">
          {/* 分数の基本説明 */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
              <ruby>分数<rt>ぶんすう</rt></ruby>って何？
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <FractionExplanation
                numerator={1}
                denominator={2}
                title="2分の1"
                description="2つに分けて、1つとった"
              />
              <FractionExplanation
                numerator={3}
                denominator={5}
                title="5分の3"
                description="5つに分けて、3つとった"
              />
              <FractionExplanation
                numerator={2}
                denominator={3}
                title="3分の2"
                description="3つに分けて、2つとった"
              />
            </div>
          </div>

          {/* ゲームの遊び方 */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">
              ゲームの<ruby>遊<rt>あそ</rt></ruby>び<ruby>方<rt>かた</rt></ruby>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* 基本操作 */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  <ruby>基本<rt>きほん</rt></ruby><ruby>操作<rt>そうさ</rt></ruby>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <span className="text-gray-700">大きい<ruby>分数<rt>ぶんすう</rt></ruby>のカードをタップ</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <span className="text-gray-700">10<ruby>秒<rt>びょう</rt></ruby>後にヒントボタンが使える</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <span className="text-gray-700">5<ruby>問<rt>もん</rt></ruby><ruby>全部<rt>ぜんぶ</rt></ruby>で<ruby>終了<rt>しゅうりょう</rt></ruby></span>
                  </div>
                </div>
              </div>

              {/* 得点システム */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  <ruby>得点<rt>とくてん</rt></ruby>システム
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">ヒントなしで<ruby>正解<rt>せいかい</rt></ruby></span>
                      <span className="text-green-600 font-bold text-xl">10<ruby>点<rt>てん</rt></ruby></span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">ヒントありで<ruby>正解<rt>せいかい</rt></ruby></span>
                      <span className="text-yellow-600 font-bold text-xl">5<ruby>点<rt>てん</rt></ruby></span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-gray-400">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700"><ruby>間違<rt>まちが</rt></ruby>い</span>
                      <span className="text-gray-600 font-bold text-xl">0<ruby>点<rt>てん</rt></ruby></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* レベル説明 */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-orange-800">
              レベル<ruby>選択<rt>せんたく</rt></ruby>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                <div className="text-center">
                  <div className="text-3xl mb-2">🌱</div>
                  <h3 className="text-lg font-bold text-green-700 mb-2">
                    <ruby>初級<rt>しょきゅう</rt></ruby>
                  </h3>
                  <p className="text-sm text-gray-600">
                    2<ruby>分<rt>ぶん</rt></ruby>の1、3<ruby>分<rt>ぶん</rt></ruby>の1など<br/>
                    かんたんな<ruby>分数<rt>ぶんすう</rt></ruby>
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                <div className="text-center">
                  <div className="text-3xl mb-2">🌿</div>
                  <h3 className="text-lg font-bold text-blue-700 mb-2">
                    <ruby>中級<rt>ちゅうきゅう</rt></ruby>
                  </h3>
                  <p className="text-sm text-gray-600">
                    6<ruby>分<rt>ぶん</rt></ruby>の1、8<ruby>分<rt>ぶん</rt></ruby>の1まで<br/>
                    少し<ruby>複雑<rt>ふくざつ</rt></ruby>な<ruby>分数<rt>ぶんすう</rt></ruby>
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                <div className="text-center">
                  <div className="text-3xl mb-2">🌳</div>
                  <h3 className="text-lg font-bold text-purple-700 mb-2">
                    <ruby>上級<rt>じょうきゅう</rt></ruby>
                  </h3>
                  <p className="text-sm text-gray-600">
                    <ruby>複雑<rt>ふくざつ</rt></ruby>な<ruby>分数<rt>ぶんすう</rt></ruby>の<ruby>比較<rt>ひかく</rt></ruby><br/>
                    <ruby>等価<rt>とうか</rt></ruby><ruby>問題<rt>もんだい</rt></ruby>も<ruby>登場<rt>とうじょう</rt></ruby>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ヒント機能の説明 */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-800">
              ヒント<ruby>機能<rt>きのう</rt></ruby>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-800">
                  <ruby>最初<rt>さいしょ</rt></ruby>は<ruby>数字<rt>すうじ</rt></ruby>と<ruby>枠線<rt>わくせん</rt></ruby>だけ
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="inline-flex flex-col items-center text-2xl font-bold">
                      <span className="text-blue-600">3</span>
                      <hr className="w-full border-t-2 border-gray-800 my-1" />
                      <span className="text-red-600">5</span>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-6 h-12 border-2 border-gray-400 bg-gray-100" />
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    <ruby>分母<rt>ぶんぼ</rt></ruby>の<ruby>数<rt>かず</rt></ruby>を<ruby>数<rt>かぞ</rt></ruby>えてみよう
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-800">
                  ヒントボタンを<ruby>押<rt>お</rt></ruby>すと<ruby>塗<rt>ぬ</rt></ruby>りつぶし
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="inline-flex flex-col items-center text-2xl font-bold">
                      <span className="text-blue-600">3</span>
                      <hr className="w-full border-t-2 border-gray-800 my-1" />
                      <span className="text-red-600">5</span>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-6 h-12 border-2 border-gray-400 ${
                        i < 3 ? 'bg-blue-400' : 'bg-gray-100'
                      }`} />
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    <ruby>分子<rt>ぶんし</rt></ruby>の<ruby>分<rt>ぶん</rt></ruby>だけ<ruby>色<rt>いろ</rt></ruby>がつく
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="text-center mt-8">
          <button
            onClick={() => useGameStore.setState({ currentScreen: 'levelSelect' })}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mr-4"
          >
            レベル<ruby>選択<rt>せんたく</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>る
          </button>
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