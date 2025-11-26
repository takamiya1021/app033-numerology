import { test, expect } from '@playwright/test';

test.describe('数秘術風占い E2Eテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('メインページが正しく表示される', async ({ page }) => {
    // タイトル確認
    await expect(page).toHaveTitle(/数秘術風占い/);

    // メイン要素の存在確認
    await expect(page.getByRole('heading', { name: /数秘術風占い/i })).toBeVisible();
  });

  test('誕生日入力から結果表示までのフロー', async ({ page }) => {
    // 誕生日入力フォームの確認
    const dateInput = page.locator('input[type="date"]');
    await expect(dateInput).toBeVisible();

    // 誕生日を入力（例: 1990-01-01）
    await dateInput.fill('1990-01-01');

    // 計算ボタンをクリック
    const calculateButton = page.getByRole('button', { name: /占う|計算/i });
    await calculateButton.click();

    // 結果が表示されるまで待機
    await page.waitForTimeout(1000);

    // ライフパスナンバーが表示されることを確認
    const result = page.getByText(/ライフパスナンバー|運命数/i);
    await expect(result).toBeVisible();

    // 数字が表示されることを確認（1-9, 11, 22, 33のいずれか）
    const numberDisplay = page.locator('text=/^[0-9]{1,2}$/');
    await expect(numberDisplay.first()).toBeVisible();
  });

  test('計算過程のアニメーションが表示される', async ({ page }) => {
    // 誕生日入力
    const dateInput = page.locator('input[type="date"]');
    await dateInput.fill('1985-01-23');

    // 計算実行
    const calculateButton = page.getByRole('button', { name: /占う|計算/i });
    await calculateButton.click();

    // 計算過程が表示されるまで待機
    await page.waitForTimeout(1000);

    // 計算過程セクションが表示されることを確認
    const calculationSection = page.getByText('計算過程');
    await expect(calculationSection).toBeVisible();

    // 計算結果（= の後の数字）が表示されることを確認
    const resultDisplay = page.locator('text=/^= \\d+$/');
    await expect(resultDisplay.first()).toBeVisible();
  });

  test('性格診断情報が表示される', async ({ page }) => {
    // 誕生日入力と計算
    await page.locator('input[type="date"]').fill('1995-05-15');
    await page.getByRole('button', { name: /占う|計算/i }).click();

    // 結果表示まで待機
    await page.waitForTimeout(1500);

    // 性格診断セクションの確認
    const personalitySection = page.getByText(/性格診断|性格|特徴/i);
    await expect(personalitySection).toBeVisible();
  });

  test('レスポンシブデザイン - モバイル表示', async ({ page }) => {
    // モバイルサイズに変更
    await page.setViewportSize({ width: 375, height: 667 });

    // ページが正しく表示されることを確認
    await expect(page.getByRole('heading', { name: /数秘術風占い/i })).toBeVisible();

    // 入力フォームが表示されることを確認
    const dateInput = page.locator('input[type="date"]');
    await expect(dateInput).toBeVisible();
  });
});

test.describe('相性診断機能', () => {
  test('相性診断ページが表示される', async ({ page }) => {
    // 相性診断ページに移動
    await page.goto('/compatibility');

    // ページタイトル確認
    await expect(page.getByRole('heading', { name: /相性診断/i })).toBeVisible();

    // 2つの誕生日入力欄が存在することを確認
    const dateInputs = page.locator('input[type="date"]');
    const count = await dateInputs.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('相性診断の実行フロー', async ({ page }) => {
    await page.goto('/compatibility');

    // 2つの誕生日を入力
    const dateInputs = page.locator('input[type="date"]');
    await dateInputs.nth(0).fill('1990-01-01');
    await dateInputs.nth(1).fill('1992-05-15');

    // 相性診断ボタンをクリック
    const calculateButton = page.getByRole('button', { name: /占う|診断/i });
    await calculateButton.click();

    // 結果表示まで待機
    await page.waitForTimeout(1000);

    // 相性スコア（数字+%）が表示されることを確認
    const compatibilityScore = page.locator('.text-6xl').filter({ hasText: /%$/ });
    await expect(compatibilityScore).toBeVisible();

    // 相性レベル（「最高の相性！」等）が表示されることを確認
    const compatibilityLevel = page.locator('.text-xl.text-white.font-semibold');
    await expect(compatibilityLevel).toBeVisible();
  });
});

test.describe('アクセシビリティ', () => {
  test('キーボードナビゲーションが機能する', async ({ page }) => {
    await page.goto('/');

    // Tabキーでフォーカス移動
    await page.keyboard.press('Tab');

    // フォーカスされた要素が存在することを確認
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('フォームラベルが適切に関連付けられている', async ({ page }) => {
    await page.goto('/');

    // 日付入力フォームにラベルが存在することを確認
    const dateInput = page.locator('input[type="date"]');
    const inputId = await dateInput.getAttribute('id');

    if (inputId) {
      const label = page.locator(`label[for="${inputId}"]`);
      await expect(label).toBeVisible();
    }
  });
});
