/**
 * 数秘術計算ロジック
 */
import { CalculationStep, CompatibilityResult } from '@/types/numerology';
import { getNumberMeaning } from './numberMeanings';

/**
 * マスターナンバーかどうか判定
 */
export function isMasterNumber(num: number): boolean {
  return num === 11 || num === 22 || num === 33;
}

/**
 * 各桁を合計
 */
export function sumDigits(num: number): number {
  return num
    .toString()
    .split('')
    .map(Number)
    .reduce((a, b) => a + b, 0);
}

/**
 * 数字を1桁になるまで足す（マスターナンバー考慮）
 */
export function reduceToSingleDigit(num: number): number {
  while (num > 9 && !isMasterNumber(num)) {
    num = sumDigits(num);
  }
  return num;
}

/**
 * 誕生日からライフパスナンバーを計算
 * @param date 誕生日（Date型）
 * @returns ライフパスナンバー（1-9, 11, 22, 33）
 */
export function calculateLifePathNumber(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0始まりなので+1
  const day = date.getDate();

  // ステップ1: 年月日を個別に1桁になるまで足す（マスターナンバーは保持）
  const reducedYear = reduceToSingleDigit(year);
  const reducedMonth = reduceToSingleDigit(month);
  const reducedDay = reduceToSingleDigit(day);

  // ステップ2: 合計を計算
  const total = reducedYear + reducedMonth + reducedDay;

  // ステップ3: マスターナンバーチェック
  if (isMasterNumber(total)) {
    return total;
  }

  // ステップ4: 1桁になるまで足す
  return reduceToSingleDigit(total);
}

/**
 * 計算過程を取得（アニメーション用）
 */
export function getCalculationSteps(date: Date): CalculationStep[] {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const steps: CalculationStep[] = [];

  // ステップ1: 年の計算
  const yearDigits = year.toString().split('').join('+');
  const yearSum = sumDigits(year);
  const reducedYear = reduceToSingleDigit(year);

  if (yearSum !== year) {
    steps.push({
      description: `年: ${year}`,
      calculation: yearDigits,
      result: yearSum
    });

    if (yearSum !== reducedYear && !isMasterNumber(yearSum)) {
      let current = yearSum;
      while (current > 9 && !isMasterNumber(current)) {
        const next = sumDigits(current);
        steps.push({
          description: `年の計算続き`,
          calculation: current.toString().split('').join('+'),
          result: next
        });
        current = next;
      }
    }
  }

  // ステップ2: 月の計算
  if (month > 9 && !isMasterNumber(month)) {
    steps.push({
      description: `月: ${month}`,
      calculation: month.toString().split('').join('+'),
      result: reduceToSingleDigit(month)
    });
  }

  // ステップ3: 日の計算
  if (day > 9 && !isMasterNumber(day)) {
    steps.push({
      description: `日: ${day}`,
      calculation: day.toString().split('').join('+'),
      result: reduceToSingleDigit(day)
    });
  }

  // ステップ4: 合計
  const reducedMonth = reduceToSingleDigit(month);
  const reducedDay = reduceToSingleDigit(day);
  const sum = reducedYear + reducedMonth + reducedDay;

  const parts = [reducedYear, reducedMonth, reducedDay];
  steps.push({
    description: '合計',
    calculation: parts.join('+'),
    result: sum
  });

  // ステップ5: 最終的な1桁化（マスターナンバー考慮）
  if (!isMasterNumber(sum) && sum > 9) {
    let current = sum;
    while (current > 9 && !isMasterNumber(current)) {
      const next = sumDigits(current);
      steps.push({
        description: '最終結果',
        calculation: current.toString().split('').join('+'),
        result: next
      });
      current = next;
    }
  }

  return steps;
}

/**
 * 相性マトリックス
 */
const COMPATIBILITY_MATRIX: Record<string, number> = {
  // 1との相性
  '1-1': 70, '1-2': 85, '1-3': 90, '1-4': 60, '1-5': 95,
  '1-6': 75, '1-7': 65, '1-8': 80, '1-9': 70, '1-11': 88, '1-22': 72, '1-33': 78,

  // 2との相性
  '2-2': 90, '2-3': 75, '2-4': 80, '2-5': 60, '2-6': 95,
  '2-7': 85, '2-8': 70, '2-9': 80, '2-11': 92, '2-22': 88, '2-33': 93,

  // 3との相性
  '3-3': 85, '3-4': 55, '3-5': 92, '3-6': 78, '3-7': 68,
  '3-8': 73, '3-9': 88, '3-11': 90, '3-22': 70, '3-33': 82,

  // 4との相性
  '4-4': 75, '4-5': 50, '4-6': 82, '4-7': 77, '4-8': 85,
  '4-9': 65, '4-11': 62, '4-22': 90, '4-33': 73,

  // 5との相性
  '5-5': 80, '5-6': 65, '5-7': 78, '5-8': 72, '5-9': 83,
  '5-11': 87, '5-22': 68, '5-33': 75,

  // 6との相性
  '6-6': 88, '6-7': 73, '6-8': 78, '6-9': 92, '6-11': 85,
  '6-22': 82, '6-33': 95,

  // 7との相性
  '7-7': 82, '7-8': 75, '7-9': 80, '7-11': 93, '7-22': 77,
  '7-33': 83,

  // 8との相性
  '8-8': 78, '8-9': 70, '8-11': 76, '8-22': 87, '8-33': 72,

  // 9との相性
  '9-9': 85, '9-11': 88, '9-22': 79, '9-33': 90,

  // 11との相性
  '11-11': 91, '11-22': 89, '11-33': 92,

  // 22との相性
  '22-22': 86, '22-33': 88,

  // 33との相性
  '33-33': 94,
};

/**
 * 相性レベルを取得
 */
function getCompatibilityLevel(score: number): string {
  if (score >= 90) return '最高の相性！';
  if (score >= 75) return '相性良好';
  if (score >= 60) return '普通';
  if (score >= 40) return 'やや注意';
  return '努力が必要';
}

/**
 * 相性の良い点を取得
 */
function getCompatibilityStrengths(number1: number, number2: number): string[] {
  const meaning1 = getNumberMeaning(number1);
  const meaning2 = getNumberMeaning(number2);

  const strengths: string[] = [];

  // 同じ要素同士
  if (meaning1.element === meaning2.element) {
    strengths.push(`同じ${meaning1.element}の要素を持ち、価値観が似ています`);
  }

  // 具体的な組み合わせに基づく強み
  if (number1 === number2) {
    strengths.push('同じ数字なので、お互いの気持ちがよく理解できます');
  }

  strengths.push(`${meaning1.name}と${meaning2.name}の組み合わせは互いを高め合えます`);
  strengths.push('お互いの長所を認め合える関係です');

  return strengths;
}

/**
 * 相性の課題を取得
 */
function getCompatibilityChallenges(number1: number, number2: number): string[] {
  const meaning1 = getNumberMeaning(number1);
  const meaning2 = getNumberMeaning(number2);

  const challenges: string[] = [];

  if (number1 === number2) {
    challenges.push('同じ短所も共有するため、バランスを取ることが大切です');
  }

  challenges.push(`${meaning1.name}と${meaning2.name}、異なる視点を尊重しましょう`);
  challenges.push('コミュニケーションを大切にすることで関係がより良くなります');

  return challenges;
}

/**
 * 2人の相性スコアを計算
 * @param number1 1人目のライフパスナンバー
 * @param number2 2人目のライフパスナンバー
 * @returns 相性結果
 */
export function calculateCompatibility(
  number1: number,
  number2: number
): CompatibilityResult {
  // 相性マトリックスのキーを作成（小さい数字-大きい数字）
  const key = `${Math.min(number1, number2)}-${Math.max(number1, number2)}`;
  const score = COMPATIBILITY_MATRIX[key] || 50; // デフォルト50%

  return {
    score,
    level: getCompatibilityLevel(score),
    strengths: getCompatibilityStrengths(number1, number2),
    challenges: getCompatibilityChallenges(number1, number2)
  };
}
