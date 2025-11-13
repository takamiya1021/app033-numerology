/**
 * 数秘術関連の型定義
 */

/**
 * 計算ステップ（アニメーション用）
 */
export interface CalculationStep {
  description: string;   // ステップの説明（例: "年: 1985"）
  calculation: string;   // 計算式（例: "1+9+8+5"）
  result: number;        // 計算結果
}

/**
 * 数字の意味データ
 */
export interface NumberMeaning {
  number: number;               // 数字（1-9, 11, 22, 33）
  name: string;                 // 名称（例: "リーダー"）
  keywords: string[];           // キーワード配列
  personality: {
    positive: string[];         // 長所
    negative: string[];         // 短所
    career: string[];           // 向いている職業
  };
  element: string;              // 対応する要素（火・水・土・風）
  color: string;                // 対応する色
  luckyDay: string;             // ラッキーデー
}

/**
 * 数秘術結果
 */
export interface NumerologyResult {
  lifePathNumber: number;          // ライフパスナンバー
  calculationSteps: CalculationStep[]; // 計算過程
  meaning: NumberMeaning;          // 数字の意味
  todaysFortune: string;           // 今日の運勢
  luckyNumbers: number[];          // ラッキーナンバー
}

/**
 * 相性診断結果
 */
export interface CompatibilityResult {
  score: number;           // 相性スコア（0-100）
  level: string;           // 相性レベル（例: "最高の相性！"）
  strengths: string[];     // 相性の良い点
  challenges: string[];    // 注意点
}

/**
 * AI生成コンテンツ
 */
export interface AIContent {
  explanation: string;     // 詳しい解説
  message: string;         // メッセージ
  advice: string;          // 行動指針
  generatedAt: Date;       // 生成日時
}

/**
 * 診断履歴
 */
export interface NumerologyHistory {
  date: string;            // 診断日
  birthdate: string;       // 誕生日
  lifePathNumber: number;  // ライフパスナンバー
  name?: string;           // 名前（オプション）
  viewedAt: Date;          // 閲覧日時
}
