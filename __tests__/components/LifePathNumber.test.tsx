/**
 * LifePathNumber コンポーネントのテスト
 */
import { render, screen } from '@testing-library/react';
import { LifePathNumber } from '@/components/LifePathNumber';

describe('LifePathNumber', () => {
  it('ライフパスナンバーが表示される', () => {
    render(<LifePathNumber number={7} name="探求者" />);

    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText(/探求者/i)).toBeInTheDocument();
  });

  it('マスターナンバーが表示される', () => {
    render(<LifePathNumber number={11} name="直感者" isMaster />);

    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText(/マスターナンバー/i)).toBeInTheDocument();
  });
});
