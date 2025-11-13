/**
 * 相性診断結果表示コンポーネント
 */
'use client';

import { motion } from 'framer-motion';
import { CompatibilityResult as CompatibilityResultType } from '@/types/numerology';

interface CompatibilityResultProps {
  result: CompatibilityResultType;
  number1: number;
  number2: number;
}

export function CompatibilityResult({ result, number1, number2 }: CompatibilityResultProps) {
  // スコアから星の数を計算（1-5）
  const stars = Math.round((result.score / 100) * 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 相性スコア */}
      <div className="text-center bg-mystic-purple-900/30 border border-mystic-purple-600 rounded-xl p-8">
        <h3 className="text-xl text-mystic-purple-300 mb-4">
          {number1} と {number2} の相性
        </h3>

        <div className="text-6xl font-bold font-numbers text-mystic-gold-400 mb-4">
          {result.score}%
        </div>

        <div className="text-3xl mb-2">
          {'⭐'.repeat(stars)}
          {'☆'.repeat(5 - stars)}
        </div>

        <p className="text-xl text-white font-semibold">
          {result.level}
        </p>
      </div>

      {/* 相性の良い点 */}
      <div className="bg-mystic-purple-900/30 border border-mystic-purple-600 rounded-xl p-6">
        <h4 className="text-lg font-bold text-mystic-gold-400 mb-4">
          💖 相性の良い点
        </h4>
        <ul className="space-y-2">
          {result.strengths.map((strength, index) => (
            <li key={index} className="text-white">
              • {strength}
            </li>
          ))}
        </ul>
      </div>

      {/* 注意点 */}
      <div className="bg-mystic-purple-900/30 border border-mystic-purple-600 rounded-xl p-6">
        <h4 className="text-lg font-bold text-mystic-purple-300 mb-4">
          ⚠️ 注意点
        </h4>
        <ul className="space-y-2">
          {result.challenges.map((challenge, index) => (
            <li key={index} className="text-white">
              • {challenge}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
