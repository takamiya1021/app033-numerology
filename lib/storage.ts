/**
 * ローカルストレージ管理
 */
import { NumerologyHistory } from '@/types/numerology';

const STORAGE_KEYS = {
  API_KEY: 'numerology-app-api-key',
  HISTORY: 'numerology-app-history',
  FAVORITES: 'numerology-app-favorites',
} as const;

/**
 * APIキーを保存
 */
export function saveApiKey(apiKey: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
}

/**
 * APIキーを取得
 */
export function getApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.API_KEY);
}

/**
 * 診断履歴を保存（最新10件）
 */
export function saveHistory(history: NumerologyHistory): void {
  if (typeof window === 'undefined') return;

  const existingHistory = getHistory();
  const newHistory = [history, ...existingHistory].slice(0, 10);

  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
}

/**
 * 診断履歴を取得
 */
export function getHistory(): NumerologyHistory[] {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * 履歴をクリア
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
}

/**
 * お気に入りを保存
 */
export function saveFavorite(history: NumerologyHistory): void {
  if (typeof window === 'undefined') return;

  const favorites = getFavorites();
  const newFavorites = [history, ...favorites];

  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
}

/**
 * お気に入りを取得
 */
export function getFavorites(): NumerologyHistory[] {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * お気に入りを削除
 */
export function removeFavorite(index: number): void {
  if (typeof window === 'undefined') return;

  const favorites = getFavorites();
  favorites.splice(index, 1);

  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
}

/**
 * 全データをクリア
 */
export function clearAllData(): void {
  if (typeof window === 'undefined') return;

  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
