/**
 * 数秘術計算カスタムフック
 */
import { useState, useCallback } from 'react';
import { NumerologyResult } from '@/types/numerology';
import {
  calculateLifePathNumber,
  getCalculationSteps,
} from '@/lib/numerology';
import { getNumberMeaning } from '@/lib/numberMeanings';

/**
 * 今日の運勢を生成
 */
function generateTodaysFortune(lifePathNumber: number): string {
  const fortunes = [
    '今日は新しいチャンスに恵まれる日です',
    '直感を信じて行動すると良い結果につながります',
    '周りの人との調和を大切にしましょう',
    '自分の内なる声に耳を傾ける時です',
    '積極的に行動することで道が開けます',
  ];

  // 数字に応じてランダムな運勢を返す
  const index = (lifePathNumber + new Date().getDate()) % fortunes.length;
  return fortunes[index];
}

/**
 * ラッキーナンバーを生成
 */
function generateLuckyNumbers(lifePathNumber: number): number[] {
  const today = new Date().getDate();
  const luckyNumbers: number[] = [lifePathNumber];

  // 2つ目のラッキーナンバー
  const second = ((lifePathNumber + today) % 9) + 1;
  if (second !== lifePathNumber) {
    luckyNumbers.push(second);
  }

  // 3つ目のラッキーナンバー
  const third = ((lifePathNumber * today) % 9) + 1;
  if (third !== lifePathNumber && third !== second) {
    luckyNumbers.push(third);
  }

  return luckyNumbers;
}

export function useNumerology() {
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = useCallback((date: Date) => {
    setIsCalculating(true);

    try {
      const lifePathNumber = calculateLifePathNumber(date);
      const calculationSteps = getCalculationSteps(date);
      const meaning = getNumberMeaning(lifePathNumber);
      const todaysFortune = generateTodaysFortune(lifePathNumber);
      const luckyNumbers = generateLuckyNumbers(lifePathNumber);

      const numerologyResult: NumerologyResult = {
        lifePathNumber,
        calculationSteps,
        meaning,
        todaysFortune,
        luckyNumbers,
      };

      setResult(numerologyResult);
    } catch (error) {
      console.error('数秘術計算エラー:', error);
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
  }, []);

  return {
    result,
    isCalculating,
    calculate,
    reset,
  };
}
