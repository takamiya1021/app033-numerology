/**
 * ライフパスナンバー表示コンポーネント
 */
'use client';

import { motion } from 'framer-motion';

interface LifePathNumberProps {
  number: number;
  name: string;
  isMaster?: boolean;
}

export function LifePathNumber({ number, name, isMaster }: LifePathNumberProps) {
  return (
    <div className="relative py-12">
      {/* キラキラエフェクト */}
      <motion.div
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 bg-gradient-radial from-mystic-gold-500/20 to-transparent blur-2xl"
      />

      {/* メインコンテンツ */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative text-center"
      >
        <h2 className="text-lg text-mystic-purple-300 mb-4">
          🎯 あなたのライフパスナンバー
        </h2>

        {/* 数字 */}
        <div className="text-9xl font-bold font-numbers text-mystic-gold-400 mb-4">
          {number}
        </div>

        {/* 名前 */}
        <p className="text-2xl text-white mb-2">
          {name}
        </p>

        {/* マスターナンバーバッジ */}
        {isMaster && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-2 bg-mystic-gold-500/20 border border-mystic-gold-500 rounded-full"
          >
            <span className="text-mystic-gold-400 text-sm font-semibold">
              ✨ マスターナンバー ✨
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
