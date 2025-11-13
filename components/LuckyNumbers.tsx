/**
 * ラッキーナンバー表示コンポーネント
 */
'use client';

import { motion } from 'framer-motion';

interface LuckyNumbersProps {
  numbers: number[];
}

export function LuckyNumbers({ numbers }: LuckyNumbersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-mystic-purple-900/30 border border-mystic-purple-600 rounded-xl p-6"
    >
      <h3 className="text-xl font-bold text-mystic-gold-400 mb-4">
        🍀 ラッキーナンバー
      </h3>

      <div className="flex justify-center gap-4">
        {numbers.map((number, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
            className="w-16 h-16 rounded-full bg-mystic-gold-500/20 border-2 border-mystic-gold-500 flex items-center justify-center"
          >
            <span className="text-3xl font-bold font-numbers text-mystic-gold-400">
              {number}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
