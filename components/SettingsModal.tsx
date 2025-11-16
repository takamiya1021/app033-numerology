/**
 * 設定モーダルコンポーネント
 */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiKey, saveApiKey } from '@/lib/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [currentApiKey, setCurrentApiKey] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // モーダルが開かれた時に現在のAPIキーを取得
  useEffect(() => {
    if (isOpen) {
      const key = getApiKey();
      setCurrentApiKey(key);
      setApiKey('');
      setIsSaved(false);
    }
  }, [isOpen]);

  // APIキー保存
  const handleSave = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      setCurrentApiKey(apiKey.trim());
      setApiKey('');
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  // APIキー削除
  const handleDelete = () => {
    if (confirm('APIキーを削除しますか？')) {
      saveApiKey('');
      setCurrentApiKey(null);
      setApiKey('');
    }
  };

  // APIキーをマスク表示
  const maskApiKey = (key: string): string => {
    if (key.length <= 8) return '****';
    return key.slice(0, 4) + '...' + key.slice(-4);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            {/* モーダル */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-mystic-purple-900 border-2 border-mystic-purple-600 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-mystic-gold-400">
                  ⚙️ 設定
                </h2>
                <button
                  onClick={onClose}
                  className="text-mystic-purple-300 hover:text-white transition-colors text-2xl"
                  aria-label="閉じる"
                >
                  ✕
                </button>
              </div>

              {/* 現在のAPIキー表示 */}
              {currentApiKey && (
                <div className="mb-6 p-4 bg-mystic-purple-800/50 border border-mystic-purple-600 rounded-lg">
                  <p className="text-sm text-mystic-purple-300 mb-1">
                    現在のAPIキー
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-white font-mono">
                      {maskApiKey(currentApiKey)}
                    </p>
                    <button
                      onClick={handleDelete}
                      className="text-red-400 hover:text-red-300 text-sm font-bold transition-colors"
                    >
                      削除
                    </button>
                  </div>
                </div>
              )}

              {/* 説明 */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-mystic-purple-200 mb-2">
                  🤖 AI機能について
                </h3>
                <p className="text-sm text-mystic-purple-300 leading-relaxed mb-3">
                  Google AI Studio（Gemini API）のAPIキーを設定すると、AI生成による詳細な解説が利用できます。
                </p>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mystic-gold-400 hover:text-mystic-gold-300 underline"
                >
                  APIキーを取得する →
                </a>
              </div>

              {/* APIキー入力フォーム */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-mystic-purple-200 mb-2">
                    APIキー
                  </label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIza..."
                    className="w-full px-4 py-3 bg-mystic-purple-800/50 border border-mystic-purple-600 rounded-lg text-white placeholder-mystic-purple-400 focus:outline-none focus:border-mystic-gold-400 transition-colors font-mono text-sm"
                  />
                </div>

                {/* 保存完了メッセージ */}
                {isSaved && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm text-center"
                  >
                    ✓ APIキーを保存しました
                  </motion.div>
                )}

                {/* ボタン */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={!apiKey.trim()}
                    className="flex-1 px-6 py-3 bg-mystic-gradient text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    保存
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-mystic-purple-700/50 text-mystic-purple-200 font-bold rounded-lg hover:bg-mystic-purple-600/50 transition-colors"
                  >
                    閉じる
                  </button>
                </div>
              </div>

              {/* 注意事項 */}
              <div className="mt-6 p-4 bg-mystic-purple-800/30 border border-mystic-purple-700 rounded-lg">
                <p className="text-xs text-mystic-purple-300 leading-relaxed">
                  ⚠️ APIキーはブラウザのローカルストレージに保存されます。
                  他人と共有しないでください。
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
