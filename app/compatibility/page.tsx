/**
 * 相性診断ページ
 */
'use client';

import { useState } from 'react';
import { BirthdateInput } from '@/components/BirthdateInput';
import { CompatibilityResult as CompatibilityResultComponent } from '@/components/CompatibilityResult';
import { calculateLifePathNumber, calculateCompatibility } from '@/lib/numerology';
import { CompatibilityResult } from '@/types/numerology';
import Link from 'next/link';

export default function CompatibilityPage() {
  const [birthdate1, setBirthdate1] = useState<Date>(new Date());
  const [birthdate2, setBirthdate2] = useState<Date>(new Date());
  const [result, setResult] = useState<{
    compatibility: CompatibilityResult;
    number1: number;
    number2: number;
  } | null>(null);

  const handleCalculate = () => {
    const number1 = calculateLifePathNumber(birthdate1);
    const number2 = calculateLifePathNumber(birthdate2);
    const compatibility = calculateCompatibility(number1, number2);

    setResult({
      compatibility,
      number1,
      number2,
    });
  };

  return (
    <main className="min-h-screen bg-mystic p-4">
      <div className="container mx-auto max-w-4xl">
        {/* ヘッダー */}
        <div className="text-center mb-12 pt-8">
          <Link
            href="/"
            className="inline-block text-mystic-purple-300 hover:text-mystic-gold-400 mb-4 transition-colors"
          >
            ← 戻る
          </Link>
          <h1 className="text-5xl font-bold text-mystic-gold-400 mb-4">
            💕 相性診断
          </h1>
          <p className="text-mystic-purple-300 text-lg">
            2人の誕生日から相性を占います
          </p>
        </div>

        {/* 入力フォーム */}
        <div className="bg-mystic-purple-900/30 border border-mystic-purple-600 rounded-xl p-6 mb-8">
          <div className="space-y-6">
            {/* 1人目 */}
            <div>
              <h3 className="text-mystic-gold-400 font-semibold mb-3">
                👤 あなたの誕生日
              </h3>
              <BirthdateInput value={birthdate1} onChange={setBirthdate1} />
            </div>

            {/* 2人目 */}
            <div>
              <h3 className="text-mystic-gold-400 font-semibold mb-3">
                👥 相手の誕生日
              </h3>
              <BirthdateInput value={birthdate2} onChange={setBirthdate2} />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full mt-6 px-6 py-4 bg-mystic-gradient text-white font-bold text-lg rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-mystic-gold-500/20"
          >
            ✨ 相性を占う
          </button>
        </div>

        {/* 結果表示 */}
        {result && (
          <CompatibilityResultComponent
            result={result.compatibility}
            number1={result.number1}
            number2={result.number2}
          />
        )}

        {/* フッター */}
        <div className="text-center mt-12 pb-8">
          <p className="text-mystic-purple-400 text-sm">
            ※ この占いはエンターテインメント目的です
          </p>
        </div>
      </div>
    </main>
  );
}
