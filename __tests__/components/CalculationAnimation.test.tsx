/**
 * CalculationAnimation コンポーネントのテスト
 */
import { render, screen } from '@testing-library/react';
import { CalculationAnimation } from '@/components/CalculationAnimation';
import { CalculationStep } from '@/types/numerology';

describe('CalculationAnimation', () => {
  const mockSteps: CalculationStep[] = [
    {
      description: '年: 1985',
      calculation: '1+9+8+5',
      result: 23,
    },
    {
      description: '合計',
      calculation: '2+3',
      result: 5,
    },
  ];

  it('計算ステップが表示される', () => {
    render(<CalculationAnimation steps={mockSteps} />);

    expect(screen.getByText('年: 1985')).toBeInTheDocument();
    expect(screen.getByText('1+9+8+5')).toBeInTheDocument();
  });

  it('結果が表示される', () => {
    render(<CalculationAnimation steps={mockSteps} />);

    expect(screen.getByText('= 23')).toBeInTheDocument();
    expect(screen.getByText('= 5')).toBeInTheDocument();
  });
});
