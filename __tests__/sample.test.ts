/**
 * サンプルテスト - Jest環境が正しく動作することを確認
 */
describe('Sample Test', () => {
  it('should pass a simple test', () => {
    expect(true).toBe(true);
  });

  it('should perform basic arithmetic', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const str = 'Hello World';
    expect(str.toLowerCase()).toBe('hello world');
  });
});
