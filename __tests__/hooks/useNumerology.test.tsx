/**
 * useNumerology カスタムフックのテスト
 */
import { renderHook, act } from '@testing-library/react';
import { useNumerology } from '@/hooks/useNumerology';

describe('useNumerology', () => {
  it('初期状態が正しい', () => {
    const { result } = renderHook(() => useNumerology());

    expect(result.current.result).toBeNull();
    expect(result.current.isCalculating).toBe(false);
  });

  it('計算を実行できる', () => {
    const { result } = renderHook(() => useNumerology());

    act(() => {
      const date = new Date(1985, 0, 23);
      result.current.calculate(date);
    });

    expect(result.current.result).not.toBeNull();
    expect(result.current.result?.lifePathNumber).toBe(11);
  });

  it('計算ステップが含まれる', () => {
    const { result } = renderHook(() => useNumerology());

    act(() => {
      const date = new Date(1990, 4, 15);
      result.current.calculate(date);
    });

    expect(result.current.result?.calculationSteps).toBeDefined();
    expect(Array.isArray(result.current.result?.calculationSteps)).toBe(true);
  });

  it('数字の意味が含まれる', () => {
    const { result } = renderHook(() => useNumerology());

    act(() => {
      const date = new Date(2000, 0, 1);
      result.current.calculate(date);
    });

    expect(result.current.result?.meaning).toBeDefined();
    expect(result.current.result?.meaning.number).toBe(4);
  });

  it('結果をリセットできる', () => {
    const { result } = renderHook(() => useNumerology());

    act(() => {
      const date = new Date(1985, 0, 23);
      result.current.calculate(date);
    });

    expect(result.current.result).not.toBeNull();

    act(() => {
      result.current.reset();
    });

    expect(result.current.result).toBeNull();
  });
});
