/**
 * 数秘術計算ロジックのテスト
 */
import {
  calculateLifePathNumber,
  getCalculationSteps,
  calculateCompatibility,
} from '@/lib/numerology';

describe('calculateLifePathNumber', () => {
  describe('基本的な計算', () => {
    it('1985年1月23日 → 2+9=11（マスターナンバー）', () => {
      const date = new Date(1985, 0, 23); // 月は0始まり
      const result = calculateLifePathNumber(date);
      expect(result).toBe(11);
    });

    it('1990年5月15日 → 3', () => {
      const date = new Date(1990, 4, 15);
      const result = calculateLifePathNumber(date);
      expect(result).toBe(3);
    });

    it('2000年1月1日 → 4', () => {
      const date = new Date(2000, 0, 1);
      const result = calculateLifePathNumber(date);
      expect(result).toBe(4);
    });

    it('2002年9月9日 → 22（マスターナンバー）', () => {
      const date = new Date(2002, 8, 9); // 4+9+9=22
      const result = calculateLifePathNumber(date);
      expect(result).toBe(22);
    });
  });

  describe('マスターナンバーの判定', () => {
    it('11はマスターナンバーとして保持される', () => {
      const date = new Date(1985, 0, 23);
      const result = calculateLifePathNumber(date);
      expect(result).toBe(11);
      expect(result).not.toBe(2); // 1+1=2にならない
    });

    it('22はマスターナンバーとして保持される', () => {
      const date = new Date(2002, 8, 9); // 4+9+9=22
      const result = calculateLifePathNumber(date);
      expect(result).toBe(22);
      expect(result).not.toBe(4); // 2+2=4にならない
    });

    it('33はマスターナンバーとして保持される', () => {
      // 33になる誕生日を探す必要がある
      // 1999年12月15日 → 1+9+9+9+1+2+1+5=37 → 3+7=10 → 1+0=1
      // 別のケースを探す: 1984年6月24日
      // 1+9+8+4=22, 6, 2+4=6 → 22+6+6=34 → 3+4=7
      // 正しい33のケース: 2006年6月9日
      // 2+0+0+6=8, 6, 9 → 8+6+9=23 → 2+3=5
      // 1975年3月21日
      // 1+9+7+5=22, 3, 2+1=3 → 22+3+3=28 → 2+8=10 → 1+0=1
      // 実際に33になるケースを計算で探す
      // 1949年12月15日: 1+9+4+9=23→2+3=5, 12→1+2=3, 15→1+5=6 → 5+3+6=14 → 1+4=5
      // 1957年12月24日: 1+9+5+7=22, 1+2=3, 2+4=6 → 22+3+6=31 → 3+1=4
      // 1984年12月24日: 1+9+8+4=22, 1+2=3, 2+4=6 → 22+3+6=31 → 3+1=4
      // 1993年12月15日: 1+9+9+3=22, 1+2=3, 1+5=6 → 22+3+6=31 → 3+1=4
      // 2002年12月15日: 2+0+0+2=4, 1+2=3, 1+5=6 → 4+3+6=13 → 1+3=4
      // 簡単な33のケース: 誕生日そのものの各桁の合計が33
      // 2024年3月6日: 2+0+2+4=8, 3, 6 → 8+3+6=17 → 1+7=8
      // 実際に33が出る正確な日付を計算:
      // 年=11 (1910,1919,1928,1937,1946,1955,1964,1973,1982,1991,2000,2009...)
      // 月=11 (11月)
      // 日=11 (11日)
      // 1955年11月11日: 1+9+5+5=20→2+0=2, 1+1=2, 1+1=2 → 2+2+2=6
      // 別アプローチ: 年=22, 月=2, 日=9 → 22+2+9=33
      // 1955年2月9日: 1+9+5+5=20→2+0=2 (でもこれだと22にならない)
      // 1988年2月9日: 1+9+8+8=26→2+6=8, 2, 9 → 8+2+9=19 → 1+9=10 → 1+0=1
      // 年月日の合計が33になるケース
      // 実際は難しいので、計算ロジック内で33が出た場合のテストとして
      // 1984年6月15日: 1+9+8+4=22, 6, 1+5=6 → 22+6+6=34 → 3+4=7 (惜しい！)
      // 1984年7月14日: 1+9+8+4=22, 7, 1+4=5 → 22+7+5=34 → 3+4=7
      // 1984年8月13日: 1+9+8+4=22, 8, 1+3=4 → 22+8+4=34 → 3+4=7
      // 年をマスターナンバーに: 2009年11月13日
      // 2+0+0+9=11, 1+1=2, 1+3=4 → 11+2+4=17 → 1+7=8
      // シンプルに合計33: 2009年2月22日
      // 2+0+0+9=11, 2, 2+2=4 → 11+2+4=17 → 1+7=8
      // アルゴリズムの解釈を確認: 設計書によると
      // 年月日を「個別に」1桁にしてから合計する
      // なので年=マスターナンバーなら保持
      // 例: 2009年11月11日
      // 年: 2+0+0+9=11 (マスターナンバー保持)
      // 月: 11 (マスターナンバー保持)
      // 日: 11 (マスターナンバー保持)
      // 合計: 11+11+11=33 (マスターナンバー!)
      const date = new Date(2009, 10, 11); // 2009年11月11日
      const result = calculateLifePathNumber(date);
      expect(result).toBe(33);
    });
  });

  describe('エッジケース', () => {
    it('1月1日（最小値）', () => {
      const date = new Date(2000, 0, 1);
      const result = calculateLifePathNumber(date);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(33);
    });

    it('12月31日（最大値）', () => {
      const date = new Date(1999, 11, 31);
      const result = calculateLifePathNumber(date);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(33);
    });
  });
});

describe('getCalculationSteps', () => {
  it('計算ステップを正しく返す', () => {
    const date = new Date(1985, 2, 15); // 1985年3月15日
    const steps = getCalculationSteps(date);

    expect(steps).toBeDefined();
    expect(Array.isArray(steps)).toBe(true);
    expect(steps.length).toBeGreaterThan(0);

    // 各ステップが必要なプロパティを持つことを確認
    steps.forEach(step => {
      expect(step).toHaveProperty('description');
      expect(step).toHaveProperty('calculation');
      expect(step).toHaveProperty('result');
      expect(typeof step.result).toBe('number');
    });
  });

  it('マスターナンバーの計算ステップ', () => {
    const date = new Date(1985, 0, 23);
    const steps = getCalculationSteps(date);

    // 最後のステップがライフパスナンバー11になることを確認
    const lastStep = steps[steps.length - 1];
    expect(lastStep.result).toBe(11);
  });
});

describe('calculateCompatibility', () => {
  it('相性スコアを0-100の範囲で返す', () => {
    const result = calculateCompatibility(1, 2);

    expect(result).toHaveProperty('score');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('相性レベルを返す', () => {
    const result = calculateCompatibility(1, 5);

    expect(result).toHaveProperty('level');
    expect(typeof result.level).toBe('string');
    expect(result.level.length).toBeGreaterThan(0);
  });

  it('相性の良い点と注意点を返す', () => {
    const result = calculateCompatibility(2, 6);

    expect(result).toHaveProperty('strengths');
    expect(result).toHaveProperty('challenges');
    expect(Array.isArray(result.strengths)).toBe(true);
    expect(Array.isArray(result.challenges)).toBe(true);
  });

  it('同じ数字の相性', () => {
    const result = calculateCompatibility(7, 7);

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('マスターナンバー同士の相性', () => {
    const result = calculateCompatibility(11, 22);

    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('level');
  });
});
