/**
 * 誕生日入力コンポーネント
 */
'use client';

interface BirthdateInputProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function BirthdateInput({
  value,
  onChange,
}: BirthdateInputProps) {
  // Date → YYYY-MM-DD形式の文字列に変換
  const dateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      onChange(newDate);
    }
  };

  return (
    <div>
      <label
        htmlFor="birthdate"
        className="block text-sm font-medium text-mystic-purple-300 mb-2"
      >
        📅 誕生日
      </label>
      <input
        id="birthdate"
        type="date"
        value={dateToString(value)}
        onChange={handleDateChange}
        className="w-full px-4 py-3 rounded-lg bg-mystic-purple-900/30 border border-mystic-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-mystic-gold-500 transition-all"
      />
    </div>
  );
}
