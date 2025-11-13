'use client';

import { useState } from 'react';
import { useNumerology } from '@/hooks/useNumerology';
import { BirthdateInput } from '@/components/BirthdateInput';
import { CalculationAnimation } from '@/components/CalculationAnimation';
import { LifePathNumber } from '@/components/LifePathNumber';
import { PersonalityProfile } from '@/components/PersonalityProfile';
import { TodaysFortune } from '@/components/TodaysFortune';
import { LuckyNumbers } from '@/components/LuckyNumbers';
import { AIContentSection } from '@/components/AIContentSection';
import { isMasterNumber } from '@/lib/numerology';
import Link from 'next/link';

export default function Home() {
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [name, setName] = useState<string>('');
  const { result, calculate } = useNumerology();

  const handleCalculate = () => {
    calculate(birthdate);
  };

  return (
    <main className="min-h-screen bg-mystic p-4">
      <div className="container mx-auto max-w-4xl">
        {/* ヘッダー */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold text-mystic-gold-400 mb-4">
            🔮 数秘術風占い
          </h1>
          <p className="text-mystic-purple-300 text-lg mb-6">
            誕生日から運命の数字を占います
          </p>

          {/* ナビゲーション */}
          <div className="flex justify-center gap-4">
            <Link
              href="/compatibility"
              className="px-6 py-2 bg-mystic-purple-700/50 text-mystic-purple-200 rounded-lg hover:bg-mystic-purple-600/50 transition-colors"
            >
              💕 相性診断
            </Link>
          </div>
        </div>

        {/* 入力フォーム */}
        <div className="bg-mystic-purple-900/30 border border-mystic-purple-600 rounded-xl p-6 mb-8">
          <BirthdateInput
            value={birthdate}
            onChange={setBirthdate}
            name={name}
            onNameChange={setName}
          />

          <button
            onClick={handleCalculate}
            className="w-full mt-6 px-6 py-4 bg-mystic-gradient text-white font-bold text-lg rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-mystic-gold-500/20"
          >
            ✨ 占う
          </button>
        </div>

        {/* 結果表示 */}
        {result && (
          <div className="space-y-8">
            {/* 計算過程 */}
            {result.calculationSteps.length > 0 && (
              <div className="bg-mystic-purple-900/20 border border-mystic-purple-700 rounded-xl p-6">
                <h3 className="text-lg text-mystic-purple-300 mb-4 text-center">
                  計算過程
                </h3>
                <CalculationAnimation steps={result.calculationSteps} />
              </div>
            )}

            {/* ライフパスナンバー */}
            <LifePathNumber
              number={result.lifePathNumber}
              name={result.meaning.name}
              isMaster={isMasterNumber(result.lifePathNumber)}
            />

            {/* 性格診断 */}
            <PersonalityProfile meaning={result.meaning} />

            {/* 今日の運勢 */}
            <TodaysFortune
              fortune={result.todaysFortune}
              color={result.meaning.color}
              luckyDay={result.meaning.luckyDay}
            />

            {/* ラッキーナンバー */}
            <LuckyNumbers numbers={result.luckyNumbers} />

            {/* AI生成コンテンツ */}
            <AIContentSection lifePathNumber={result.lifePathNumber} />
          </div>
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
