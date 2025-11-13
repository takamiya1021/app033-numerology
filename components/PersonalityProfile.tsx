/**
 * 性格診断表示コンポーネント
 */
'use client';

import { motion } from 'framer-motion';
import { NumberMeaning } from '@/types/numerology';

interface PersonalityProfileProps {
  meaning: NumberMeaning;
}

export function PersonalityProfile({ meaning }: PersonalityProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-mystic-purple-900/30 border border-mystic-purple-600 rounded-xl p-6"
    >
      <h3 className="text-xl font-bold text-mystic-gold-400 mb-4">
        📊 性格診断
      </h3>

      {/* キーワード */}
      <div className="mb-4">
        <h4 className="text-sm text-mystic-purple-300 mb-2">キーワード</h4>
        <div className="flex flex-wrap gap-2">
          {meaning.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-mystic-purple-700/50 text-mystic-purple-200 rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* 長所 */}
      <div className="mb-4">
        <h4 className="text-sm text-mystic-purple-300 mb-2">✨ 長所</h4>
        <ul className="space-y-1">
          {meaning.personality.positive.map((trait, index) => (
            <li key={index} className="text-white text-sm">
              • {trait}
            </li>
          ))}
        </ul>
      </div>

      {/* 短所 */}
      <div className="mb-4">
        <h4 className="text-sm text-mystic-purple-300 mb-2">⚠️ 注意点</h4>
        <ul className="space-y-1">
          {meaning.personality.negative.map((trait, index) => (
            <li key={index} className="text-white text-sm">
              • {trait}
            </li>
          ))}
        </ul>
      </div>

      {/* 向いている職業 */}
      <div>
        <h4 className="text-sm text-mystic-purple-300 mb-2">💼 向いている職業</h4>
        <div className="flex flex-wrap gap-2">
          {meaning.personality.career.map((career, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-mystic-gold-500/20 text-mystic-gold-300 rounded-full text-sm"
            >
              {career}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
