/**
 * BirthdateInput コンポーネントのテスト
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { BirthdateInput } from '@/components/BirthdateInput';

describe('BirthdateInput', () => {
  it('レンダリングされる', () => {
    const mockOnChange = jest.fn();
    render(<BirthdateInput value={new Date()} onChange={mockOnChange} />);

    expect(screen.getByLabelText(/誕生日/i)).toBeInTheDocument();
  });

  it('日付を変更できる', () => {
    const mockOnChange = jest.fn();
    const initialDate = new Date(2000, 0, 1);

    render(<BirthdateInput value={initialDate} onChange={mockOnChange} />);

    const input = screen.getByLabelText(/誕生日/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '2000-01-15' } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('名前を入力できる（オプション）', () => {
    const mockOnChange = jest.fn();
    const mockOnNameChange = jest.fn();

    render(
      <BirthdateInput
        value={new Date()}
        onChange={mockOnChange}
        name=""
        onNameChange={mockOnNameChange}
      />
    );

    const nameInput = screen.getByPlaceholderText(/名前/i);
    fireEvent.change(nameInput, { target: { value: '太郎' } });

    expect(mockOnNameChange).toHaveBeenCalledWith('太郎');
  });
});
