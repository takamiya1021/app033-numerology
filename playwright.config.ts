import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright設定ファイル
 * E2Eテストの実行設定
 */
export default defineConfig({
  testDir: './e2e',
  // テストタイムアウト（30秒）
  timeout: 30000,
  // 並列実行
  fullyParallel: true,
  // CI環境でのリトライ
  retries: process.env.CI ? 2 : 0,
  // ワーカー数
  workers: process.env.CI ? 1 : undefined,
  // レポーター
  reporter: 'html',

  use: {
    // ベースURL
    baseURL: 'http://localhost:3033',
    // トレース設定
    trace: 'on-first-retry',
    // スクリーンショット設定
    screenshot: 'only-on-failure',
  },

  // テスト実行前にローカルサーバーを起動
  webServer: {
    command: 'npm run dev -- -p 3033',
    url: 'http://localhost:3033',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  // テスト対象ブラウザ
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
