/**
 * AI生成コンテンツ表示コンポーネント
 */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateAIContent } from '@/lib/aiService';
import { getApiKey } from '@/lib/storage';

interface AIContentSectionProps {
  lifePathNumber: number;
}

export function AIContentSection({ lifePathNumber }: AIContentSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState<{
    explanation: string;
    message: string;
    advice: string;
  } | null>(null);

  const apiKey = getApiKey();
  const hasApiKey = !!apiKey;

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const [explanation, message, advice] = await Promise.all([
        generateAIContent(apiKey || '', lifePathNumber, 'explanation'),
        generateAIContent(apiKey || '', lifePathNumber, 'message'),
        generateAIContent(apiKey || '', lifePathNumber, 'advice'),
      ]);

      setContent({
        explanation,
        message,
        advice,
      });
    } catch (error) {
      console.error('AI生成エラー:', error);
      alert('AI生成に失敗しました。APIキーが正しいか確認してください。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 生成ボタン */}
      {!content && (
        <div className="space-y-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full px-6 py-4 bg-gradient-to-r from-mystic-purple-600 to-mystic-purple-500 text-white font-bold text-lg rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isGenerating ? '✨ 生成中...' : '🤖 AI詳細解説を生成'}
          </button>
          {!hasApiKey && (
            <p className="text-red-400 text-sm text-center">
              ⚠️ APIキーが未設定です（デフォルトメッセージを表示します）
            </p>
          )}
        </div>
      )}

      {/* 生成コンテンツ */}
      {content && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* 詳しい解説 */}
          <div className="bg-mystic-purple-900/30 border border-mystic-purple-600 rounded-xl p-6">
            <h3 className="text-lg font-bold text-mystic-gold-400 mb-3">
              💡 詳しい解説
            </h3>
            <p className="text-white leading-relaxed">{content.explanation}</p>
          </div>

          {/* あなたへのメッセージ */}
          <div className="bg-mystic-purple-900/30 border border-mystic-purple-600 rounded-xl p-6">
            <h3 className="text-lg font-bold text-mystic-gold-400 mb-3">
              💌 あなたへのメッセージ
            </h3>
            <p className="text-white leading-relaxed">{content.message}</p>
          </div>

          {/* 行動指針 */}
          <div className="bg-mystic-purple-900/30 border border-mystic-purple-600 rounded-xl p-6">
            <h3 className="text-lg font-bold text-mystic-gold-400 mb-3">
              🎯 行動指針
            </h3>
            <p className="text-white leading-relaxed">{content.advice}</p>
          </div>

          {/* 再生成ボタン */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full px-4 py-2 bg-mystic-purple-700/50 text-mystic-purple-200 rounded-lg hover:bg-mystic-purple-600/50 transition-colors disabled:opacity-50"
          >
            {isGenerating ? '生成中...' : '🔄 再生成'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
