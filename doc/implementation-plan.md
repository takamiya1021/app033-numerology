# 📝 実装計画書（TDD準拠版）：No.33「数秘術風占い」

**作成日**: 2025-01-13
**バージョン**: 1.0
**アプリ番号**: 33

---

## 実装方針

### TDD（Test-Driven Development）原則
- 全Phaseで **Red-Green-Refactor** サイクルを適用
- テストファースト：実装前にテストを書く
- 完了条件：全テストパス、コードカバレッジ80%以上

### 開発環境
- Next.js 14.x + TypeScript 5.x
- テストフレームワーク: Jest + React Testing Library
- E2Eテスト: Playwright（オプション）
- アニメーション: Framer Motion

---

## Phase 0: テスト環境構築（予定工数: 2時間）

### タスク

- [x] **0-1. Next.jsプロジェクトセットアップ（Red）**
  - `npx create-next-app@latest app033-numerology --typescript --tailwind --app`
  - プロジェクト構造確認
  - **完了条件**: `npm run dev`で起動確認

- [x] **0-2. Jest + React Testing Library設定（Green）**
  - `npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom`
  - `jest.config.js`作成
  - `setupTests.ts`作成
  - **完了条件**: `npm test`でテスト実行可能

- [x] **0-3. Framer Motion設定（Green）**
  - `npm install framer-motion`
  - アニメーションテスト用の設定
  - **完了条件**: Framer Motionが使用可能

- [x] **0-4. サンプルテスト作成・実行（Refactor）**
  - `__tests__/sample.test.ts`作成
  - テスト実行確認
  - **完了条件**: テストがパスすることを確認

---

## Phase 1: 数秘術計算ロジック実装（予定工数: 4時間）

### タスク

- [x] **1-1. 数字の意味データ作成（Green）**
  - `lib/numberMeanings.ts`作成
  - 1〜9, 11, 22, 33の意味データ定義
  - **完了条件**: 全数字のデータが定義済み

- [x] **1-2. 数秘術計算テスト作成（Red）**
  - `__tests__/lib/numerology.test.ts`作成
  - ライフパスナンバー計算のテストケース
  - マスターナンバー判定テスト
  - 計算過程取得テスト
  - **完了条件**: テストが失敗することを確認

- [x] **1-3. 数秘術計算ロジック実装（Green）**
  - `lib/numerology.ts`作成
  - `calculateLifePathNumber()`関数実装
  - `reduceToSingleDigit()`関数実装
  - `isMasterNumber()`関数実装
  - `getCalculationSteps()`関数実装
  - **完了条件**: 全テストがパス

- [x] **1-4. 相性診断ロジック実装（Red → Green）**
  - `__tests__/lib/numerology.test.ts`に相性診断テスト追加（Red）
  - `calculateCompatibility()`関数実装（Green）
  - 相性マトリックス定義（Green）
  - **完了条件**: 全テストがパス

- [x] **1-5. 型定義整備（Refactor）**
  - `types/numerology.ts`作成
  - `NumerologyResult`等のインターフェース定義
  - 関数の戻り値を型安全に
  - **完了条件**: TypeScriptエラーゼロ、テストパス

- [x] **1-6. カスタムフック作成（Red → Green → Refactor）**
  - `__tests__/hooks/useNumerology.test.ts`作成（Red）
  - `hooks/useNumerology.ts`実装（Green）
  - React Hooksのルール準拠確認（Refactor）
  - **完了条件**: 全テストパス、Hooks動作確認

---

## Phase 2: UI実装（予定工数: 5時間）

### タスク

- [x] **2-1. BirthdateInputテスト作成（Red）**
  - `__tests__/components/BirthdateInput.test.tsx`作成
  - カレンダー選択テスト
  - 名前入力（オプション）テスト
  - **完了条件**: テストが失敗することを確認

- [x] **2-2. BirthdateInputコンポーネント実装（Green）**
  - `components/BirthdateInput.tsx`作成
  - カレンダーUI（31番・32番参考）
  - 名前入力フォーム（オプション）
  - **完了条件**: 全テストがパス

- [x] **2-3. CalculationAnimationテスト作成（Red）**
  - `__tests__/components/CalculationAnimation.test.tsx`作成
  - ステップ表示テスト
  - アニメーション動作テスト
  - **完了条件**: テストが失敗することを確認

- [x] **2-4. CalculationAnimationコンポーネント実装（Green）**
  - `components/CalculationAnimation.tsx`作成
  - Framer Motionでステップアニメーション
  - 計算過程の順次表示
  - **完了条件**: 全テストがパス、アニメーション確認

- [x] **2-5. LifePathNumberテスト作成（Red）**
  - `__tests__/components/LifePathNumber.test.tsx`作成
  - 数字表示テスト
  - マスターナンバー表示テスト
  - **完了条件**: テストが失敗することを確認

- [x] **2-6. LifePathNumberコンポーネント実装（Green）**
  - `components/LifePathNumber.tsx`作成
  - 数字を大きく表示
  - キラキラエフェクト
  - スケールアニメーション
  - **完了条件**: 全テストがパス、エフェクト確認

- [x] **2-7. その他表示コンポーネント実装（Red → Green → Refactor）**
  - `PersonalityProfile.tsx`（性格診断）
  - `TodaysFortune.tsx`（今日の運勢）
  - `LuckyNumbers.tsx`（ラッキーナンバー）
  - 各コンポーネントのテスト作成 → 実装
  - **完了条件**: 全テストパス、表示確認

---

## Phase 3: 相性診断機能実装（予定工数: 3時間）

### タスク

- [x] **3-1. 相性診断ページ作成（Red → Green）**
  - `__tests__/app/compatibility/page.test.tsx`作成（Red）
  - `app/compatibility/page.tsx`実装（Green）
  - 2つの誕生日入力フォーム
  - **完了条件**: 全テストがパス

- [x] **3-2. CompatibilityResultテスト作成（Red）**
  - `__tests__/components/CompatibilityResult.test.tsx`作成
  - 相性スコア表示テスト
  - 星の評価表示テスト
  - **完了条件**: テストが失敗することを確認

- [x] **3-3. CompatibilityResultコンポーネント実装（Green）**
  - `components/CompatibilityResult.tsx`作成
  - 相性スコア表示（0-100%）
  - 星評価（⭐1-5）
  - 相性の良い点・注意点表示
  - **完了条件**: 全テストがパス

- [x] **3-4. 相性診断統合（Refactor）**
  - 相性診断フロー全体の動作確認
  - アニメーション調整
  - **完了条件**: 全機能動作、テストパス

---

## Phase 4: AI生成機能実装（予定工数: 3時間）

### タスク

- [x] **4-1. AIサービス共通化（31番・32番から流用）**
  - 共通`lib/aiService.ts`を使用
  - 33番用のプロンプト関数追加
  - **完了条件**: 共通モジュール使用可能

- [x] **4-2. 数秘術用プロンプト実装（Red → Green）**
  - `__tests__/lib/aiService.test.ts`に33番用テスト追加（Red）
  - 解説・メッセージ・行動指針のプロンプト実装（Green）
  - **完了条件**: 全テストがパス

- [x] **4-3. useAIGenerationフック調整（Refactor）**
  - 共通`useAIGeneration.ts`を流用
  - 33番用のコンテンツ種別に対応
  - **完了条件**: 全テストパス、Hooks動作確認

- [x] **4-4. AIContentSectionコンポーネント（31番・32番から流用・調整）**
  - 共通`AIContentSection.tsx`を流用
  - 33番用の3項目表示に調整（解説・メッセージ・行動指針）
  - **完了条件**: 全テストパス、表示確認

- [x] **4-5. GenerateButton（共通から流用）**
  - 共通`GenerateButton.tsx`をそのまま流用
  - **完了条件**: 動作確認

---

## Phase 5: デザイン・アニメーション実装（予定工数: 4時間）

### タスク

- [x] **5-1. デザインシステム構築（Green）**
  - `tailwind.config.js`設定
  - 紫系・金色のカラーパレット定義
  - 神秘的グラデーション設定
  - **完了条件**: デザインシステム適用

- [x] **5-2. フォント設定（Green）**
  - Google Fonts統合（Cinzel + Noto Serif JP）
  - フォント適用確認
  - **完了条件**: フォント表示確認

- [x] **5-3. 背景・エフェクト実装（Refactor）**
  - 神秘的な背景グラデーション
  - キラキラエフェクト
  - パーティクルアニメーション（オプション）
  - **完了条件**: 神秘的な雰囲気完成

- [x] **5-4. レスポンシブ対応（Refactor）**
  - モバイル・タブレット・デスクトップ対応
  - レイアウト調整
  - **完了条件**: 全デバイスで快適に表示

---

## Phase 6: ローカルストレージ実装（予定工数: 2時間）

### タスク

- [x] **6-1. ストレージユーティリティ共通化（31番・32番から流用）**
  - 共通`lib/storage.ts`を使用
  - 33番用のキー追加
  - **完了条件**: 共通モジュール使用可能

- [x] **6-2. 履歴保存機能実装（Red → Green → Refactor）**
  - `__tests__/lib/storage.test.ts`に33番用テスト追加（Red）
  - 診断履歴の保存・読み込み実装（Green）
  - **完了条件**: 全テストがパス

- [x] **6-3. 設定画面実装（Red → Green → Refactor）**
  - `__tests__/app/settings/page.test.tsx`作成（Red）
  - `app/settings/page.tsx`実装（Green）
  - APIキー入力、履歴表示、データクリア（Green）
  - **完了条件**: 全テストパス、動作確認

- [x] **6-4. お気に入り機能実装（Refactor）**
  - お気に入り登録ボタン
  - お気に入り一覧表示
  - **完了条件**: 全機能動作、テストパス

---

## Phase 7: 占い系アプリ連携（予定工数: 3時間）

### タスク

- [ ] **7-1. 共通ナビゲーション実装（Red → Green → Refactor）**
  - `__tests__/components/Navigation.test.tsx`作成（Red）
  - `components/Navigation.tsx`実装（Green）
  - 9番・10番・11番・33番へのリンク（Green）
  - **完了条件**: 全テストパス、ナビゲーション動作

- [ ] **7-2. 9番「ラッキーカラー」連携（Refactor）**
  - `lib/luckyColor.ts`作成
  - 数秘術の数字からラッキーカラー提案
  - 9番アプリへのリンク追加
  - **完了条件**: 連携動作確認

- [ ] **7-3. 10番「相性診断」連携（Refactor）**
  - 数秘術ベースの相性診断を10番に追加
  - 相互リンク設定
  - **完了条件**: 連携動作確認

- [x] **7-4. デザイン統一（Refactor）**
  - 占い系アプリ全体のデザインテーマ統一
  - 紫系・神秘的な雰囲気の共通化
  - **完了条件**: デザイン一貫性確認

---

## Phase 8: PWA対応・統合テスト・最終調整（予定工数: 4時間）

### タスク

- [ ] **8-1. next-pwa設定（Green）**
  - `npm install next-pwa`
  - `next.config.js`設定
  - `public/manifest.json`作成
  - **完了条件**: ビルド成功、警告ゼロ

- [ ] **8-2. Service Worker動作確認（Green）**
  - PWAインストール確認
  - オフライン動作テスト
  - **完了条件**: オフラインで数秘術計算が動作

- [x] **8-3. アイコン作成（Green）**
  - `public/icon-192.png`作成（数秘術デザイン）
  - `public/icon-512.png`作成
  - ファビコン設定
  - **完了条件**: アイコン表示確認

- [ ] **8-4. E2Eテスト作成（Red）**
  - Playwright設定
  - `e2e/numerology.spec.ts`作成
  - ユーザーフロー全体のテスト
  - **完了条件**: テストが失敗することを確認

- [ ] **8-5. E2Eテスト実装（Green）**
  - 誕生日入力 → 計算 → 結果表示の流れ
  - AI生成テスト
  - 相性診断テスト
  - **完了条件**: 全E2Eテストがパス

- [ ] **8-6. E2Eテストのリファクタリング（Refactor）**
  - テストコードの重複排除
  - ヘルパー関数の抽出
  - Page Objectパターン適用
  - テストの可読性・メンテナンス性向上
  - **完了条件**: E2Eテストコードが整理され、保守しやすい状態

- [x] **8-7. パフォーマンス最適化（Refactor）**
  - Lighthouse監査実行
  - パフォーマンススコア改善
  - アクセシビリティ改善
  - **完了条件**: Lighthouse スコア90以上（全カテゴリ）

- [x] **8-8. コードレビュー・リファクタリング（Refactor）**
  - ESLint警告ゼロ
  - TypeScript strict mode有効化
  - コードコメント追加
  - **完了条件**: 静的解析エラーゼロ

- [x] **8-9. ドキュメント整備（完了）**
  - README.md作成
  - 開発ガイド記載
  - デプロイ手順記載
  - **完了条件**: ドキュメント完備

---

## マイルストーン

| マイルストーン | 期限目安 | 完了条件 |
|---------------|---------|---------|
| M1: テスト環境構築完了 | Day 1 | Phase 0完了、全テスト実行可能 |
| M2: コア機能実装完了 | Day 3 | Phase 1-2完了、数秘術計算・UI動作 |
| M3: 相性診断完了 | Day 4 | Phase 3完了、相性診断動作 |
| M4: AI機能実装完了 | Day 5 | Phase 4完了、AI生成動作 |
| M5: デザイン完成 | Day 7 | Phase 5完了、神秘的デザイン完成 |
| M6: 連携・統合完了 | Day 9 | Phase 7-8完了、全機能動作 |

---

## 完了基準

### 機能要件
- ✅ 誕生日入力（カレンダー選択、名前オプション）
- ✅ 数秘術計算（ライフパスナンバー、マスターナンバー対応）
- ✅ 計算過程アニメーション
- ✅ 性格診断・今日の運勢・ラッキーナンバー表示
- ✅ 相性診断機能
- ✅ AI生成コンテンツ（解説・メッセージ・行動指針）
- ✅ ローカルストレージ（履歴・お気に入り）
- ✅ PWA（オフライン対応、インストール可能）
- ✅ 占い系アプリとの連携（9番・10番・11番）

### 品質要件
- ✅ 全テストパス（単体・統合・E2E）
- ✅ コードカバレッジ80%以上
- ✅ Lighthouse スコア90以上（全カテゴリ）
- ✅ TypeScriptエラーゼロ
- ✅ ESLint警告ゼロ

### デザイン要件
- ✅ 神秘的な雰囲気（紫系・金色）
- ✅ スムーズなアニメーション
- ✅ レスポンシブデザイン

### ドキュメント要件
- ✅ README.md完備
- ✅ コードコメント適切
- ✅ 開発ガイド記載

---

## リスク管理

| リスク | 発生確率 | 影響度 | 対策 |
|--------|---------|--------|------|
| マスターナンバー判定の複雑性 | 中 | 中 | テストケース充実、明確なロジック定義 |
| アニメーションパフォーマンス低下 | 中 | 中 | Framer Motion最適化設定 |
| 相性マトリックスの網羅性 | 低 | 低 | 全組み合わせを事前定義 |
| 占い系アプリ統合の複雑さ | 中 | 低 | 段階的に連携実装 |

---

## 占い系アプリ統合のメリット

- **ユーザー体験向上**: 複数の占いを一箇所で楽しめる
- **デザイン統一**: 一貫したブランド体験
- **開発効率**: AI生成・ストレージ管理の共通化
- **相互送客**: アプリ間の相互リンクで利用促進

---

## 次ステップ

1. ✅ 実装計画書レビュー・承認
2. ✅ 開発環境セットアップ（Phase 0完了）
3. ✅ Phase 0-6 実装完了
4. ⬜ Phase 7 占い系アプリ連携（残りタスク）
5. ⬜ Phase 8 PWA対応・E2Eテスト（残りタスク）

---

**作成者**: クロ
**レビュー待ち**: あおいさん
**総予定工数**: 約30時間（9日間想定）
