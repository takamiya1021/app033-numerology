/**
 * 計算過程アニメーションコンポーネント
 */
'use client';

import { motion } from 'framer-motion';
import { CalculationStep } from '@/types/numerology';

interface CalculationAnimationProps {
  steps: CalculationStep[];
}

export function CalculationAnimation({ steps }: CalculationAnimationProps) {
  return (
    <div className="space-y-4 py-6">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.3, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-mystic-purple-300 mb-1">
            {step.description}
          </p>
          <p className="text-xl font-numbers text-mystic-gold-400 mb-2">
            {step.calculation}
          </p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.3 + 0.3, type: 'spring' }}
            className="text-3xl font-bold font-numbers text-white"
          >
            = {step.result}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}
