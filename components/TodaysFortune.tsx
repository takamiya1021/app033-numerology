/**
 * 今日の運勢表示コンポーネント
 */
'use client';

import { motion } from 'framer-motion';

interface TodaysFortuneProps {
  fortune: string;
  color: string;
  luckyDay: string;
}

export function TodaysFortune({ fortune, color, luckyDay }: TodaysFortuneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-mystic-purple-900/30 border border-mystic-purple-600 rounded-xl p-6"
    >
      <h3 className="text-xl font-bold text-mystic-gold-400 mb-4">
        🌟 今日の運勢
      </h3>

      <p className="text-white mb-4">
        {fortune}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-mystic-purple-300 mb-1">ラッキーカラー</p>
          <p className="text-white font-semibold">{color}</p>
        </div>
        <div>
          <p className="text-sm text-mystic-purple-300 mb-1">ラッキーデー</p>
          <p className="text-white font-semibold">{luckyDay}</p>
        </div>
      </div>
    </motion.div>
  );
}
