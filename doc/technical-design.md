# 🛠️ 技術設計書：No.33「数秘術風占い」

**作成日**: 2025-01-13
**バージョン**: 1.0
**アプリ番号**: 33

---

## 1. 技術スタック

### 1.1 推奨構成
- **フレームワーク**: Next.js 14.x（App Router）
- **言語**: TypeScript 5.x
- **UI**: React 18.x
- **スタイリング**: Tailwind CSS v3
- **アニメーション**: Framer Motion
- **PWA**: next-pwa
- **AI API**: Google AI Studio (Gemini API)
- **状態管理**: React Context API
- **ローカルストレージ**: Web Storage API

### 1.2 開発ツール
- **リンター**: ESLint 8.x
- **フォーマッター**: Prettier
- **パッケージマネージャー**: npm または pnpm

---

## 2. アーキテクチャ設計

### 2.1 コンポーネント構成

```
app/
├── layout.tsx                  // ルートレイアウト（PWA設定含む）
├── page.tsx                    // メインページ
├── compatibility/
│   └── page.tsx                // 相性診断ページ
├── components/
│   ├── BirthdateInput.tsx      // 誕生日入力
│   ├── CalculationAnimation.tsx // 計算過程アニメーション
│   ├── LifePathNumber.tsx      // ライフパスナンバー表示
│   ├── PersonalityProfile.tsx  // 性格診断表示
│   ├── TodaysFortune.tsx       // 今日の運勢表示
│   ├── LuckyNumbers.tsx        // ラッキーナンバー表示
│   ├── CompatibilityResult.tsx // 相性診断結果
│   ├── AIContentSection.tsx    // AI生成コンテンツ表示（31番と共通）
│   ├── GenerateButton.tsx      // AI生成ボタン（31番と共通）
│   └── Navigation.tsx          // 占い系アプリ共通ナビゲーション
├── lib/
│   ├── numerology.ts           // 数秘術計算ロジック
│   ├── numberMeanings.ts       // 数字の意味データ
│   ├── aiService.ts            // Google AI Studio API統合（共通）
│   └── storage.ts              // ローカルストレージ管理（共通）
├── hooks/
│   ├── useNumerology.ts        // 数秘術計算カスタムフック
│   └── useAIGeneration.ts      // AI生成カスタムフック（共通）
└── types/
    └── numerology.ts           // 型定義
```

### 2.2 データフロー

```
[BirthdateInput]
    ↓ 誕生日入力
[useNumerology] → 数秘術計算 → [CalculationAnimation]
    ↓                              ↓
[LifePathNumber]              [計算過程表示]
    ↓
[PersonalityProfile] + [TodaysFortune] + [LuckyNumbers]

[GenerateButton]
    ↓ クリック
[useAIGeneration] → Google AI API → [AIContentSection]
```

---

## 3. 数秘術計算ロジック

### 3.1 アルゴリズム

```typescript
// lib/numerology.ts

/**
 * 誕生日からライフパスナンバーを計算
 * @param date 誕生日（Date型）
 * @returns ライフパスナンバー（1-9, 11, 22, 33）
 */
export function calculateLifePathNumber(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0始まりなので+1
  const day = date.getDate();

  // ステップ1: 年月日を個別に1桁になるまで足す
  const reducedYear = reduceToSingleDigit(year);
  const reducedMonth = reduceToSingleDigit(month);
  const reducedDay = reduceToSingleDigit(day);

  // ステップ2: 合計を計算
  const total = reducedYear + reducedMonth + reducedDay;

  // ステップ3: マスターナンバーチェック
  if (isMasterNumber(total)) {
    return total;
  }

  // ステップ4: 1桁になるまで足す
  return reduceToSingleDigit(total);
}

/**
 * 数字を1桁になるまで足す（マスターナンバー考慮）
 */
function reduceToSingleDigit(num: number): number {
  while (num > 9 && !isMasterNumber(num)) {
    num = sumDigits(num);
  }
  return num;
}

/**
 * 各桁を合計
 */
function sumDigits(num: number): number {
  return num
    .toString()
    .split('')
    .map(Number)
    .reduce((a, b) => a + b, 0);
}

/**
 * マスターナンバーかどうか判定
 */
function isMasterNumber(num: number): boolean {
  return num === 11 || num === 22 || num === 33;
}

/**
 * 計算過程を取得（アニメーション用）
 */
export function getCalculationSteps(date: Date): CalculationStep[] {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const steps: CalculationStep[] = [];

  // ステップ1: 年の計算
  steps.push({
    description: `年: ${year}`,
    calculation: `${year.toString().split('').join('+')}`,
    result: reduceToSingleDigit(year)
  });

  // ステップ2: 月の計算
  if (month > 9) {
    steps.push({
      description: `月: ${month}`,
      calculation: `${month.toString().split('').join('+')}`,
      result: reduceToSingleDigit(month)
    });
  } else {
    steps.push({
      description: `月: ${month}`,
      calculation: `${month}`,
      result: month
    });
  }

  // ステップ3: 日の計算
  if (day > 9) {
    steps.push({
      description: `日: ${day}`,
      calculation: `${day.toString().split('').join('+')}`,
      result: reduceToSingleDigit(day)
    });
  } else {
    steps.push({
      description: `日: ${day}`,
      calculation: `${day}`,
      result: day
    });
  }

  // ステップ4: 合計
  const sum = steps.reduce((acc, step) => acc + step.result, 0);
  steps.push({
    description: '合計',
    calculation: steps.map(s => s.result).join('+'),
    result: sum
  });

  // ステップ5: 最終的な1桁化（マスターナンバー考慮）
  if (!isMasterNumber(sum) && sum > 9) {
    const finalResult = reduceToSingleDigit(sum);
    steps.push({
      description: '最終結果',
      calculation: `${sum} → ${sum.toString().split('').join('+')}`,
      result: finalResult
    });
  }

  return steps;
}
```

### 3.2 相性診断ロジック

```typescript
/**
 * 2人の相性スコアを計算
 * @param number1 1人目のライフパスナンバー
 * @param number2 2人目のライフパスナンバー
 * @returns 相性スコア（0-100）
 */
export function calculateCompatibility(
  number1: number,
  number2: number
): CompatibilityResult {
  // 相性マトリックス（事前定義）
  const compatibilityMatrix: Record<string, number> = {
    '1-1': 70, '1-2': 85, '1-3': 90, '1-4': 60, '1-5': 95,
    '1-6': 75, '1-7': 65, '1-8': 80, '1-9': 70, '1-11': 88,
    '2-2': 90, '2-3': 75, '2-4': 80, '2-5': 60, '2-6': 95,
    '2-7': 85, '2-8': 70, '2-9': 80, '2-11': 92,
    // ... 以下、全ての組み合わせを定義
  };

  const key = `${Math.min(number1, number2)}-${Math.max(number1, number2)}`;
  const score = compatibilityMatrix[key] || 50; // デフォルト50%

  return {
    score,
    level: getCompatibilityLevel(score),
    strengths: getCompatibilityStrengths(number1, number2),
    challenges: getCompatibilityChallenges(number1, number2)
  };
}

function getCompatibilityLevel(score: number): string {
  if (score >= 90) return '最高の相性！';
  if (score >= 75) return '相性良好';
  if (score >= 60) return '普通';
  if (score >= 40) return 'やや注意';
  return '努力が必要';
}
```

---

## 4. 数字の意味データ

### 4.1 データ構造

```typescript
// lib/numberMeanings.ts

export interface NumberMeaning {
  number: number;
  name: string;                    // 「リーダー」等
  keywords: string[];              // キーワード配列
  personality: {
    positive: string[];            // 長所
    negative: string[];            // 短所
    career: string[];              // 向いている職業
  };
  element: string;                 // 対応する要素（火・水・土・風）
  color: string;                   // 対応する色
  luckyDay: string;                // ラッキーデー
}

export const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    number: 1,
    name: 'リーダー',
    keywords: ['独立心', '創造性', 'パイオニア精神'],
    personality: {
      positive: ['リーダーシップがある', '独創的', '決断力がある'],
      negative: ['頑固', '自己中心的になりやすい', '孤独を感じやすい'],
      career: ['起業家', 'プロジェクトリーダー', 'アーティスト']
    },
    element: '火',
    color: '赤',
    luckyDay: '日曜日'
  },
  // ... 2-9, 11, 22, 33の定義
};
```

---

## 5. アニメーション設計

### 5.1 計算過程アニメーション

```typescript
// components/CalculationAnimation.tsx
import { motion } from 'framer-motion';

export function CalculationAnimation({ steps }: { steps: CalculationStep[] }) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.5, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-purple-300">{step.description}</p>
          <p className="text-2xl font-bold text-gold">
            {step.calculation}
          </p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.5 + 0.3, type: 'spring' }}
            className="text-4xl font-bold text-white mt-2"
          >
            = {step.result}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}
```

### 5.2 ライフパスナンバー表示アニメーション

```typescript
export function LifePathNumber({ number }: { number: number }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="relative"
    >
      {/* キラキラエフェクト */}
      <motion.div
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 bg-gradient-radial from-gold/20 to-transparent"
      />

      {/* 数字 */}
      <div className="text-9xl font-bold text-gold">
        {number}
      </div>
    </motion.div>
  );
}
```

---

## 6. Google AI Studio API統合

### 6.1 プロンプト設計

#### 6.1.1 詳しい解説生成
```
あなたは数秘術の専門家です。
ライフパスナンバー ${number} について、
深い意味と歴史的・文化的背景を200文字程度で解説してください。
神秘的で興味深い内容にしてください。
```

#### 6.1.2 メッセージ生成
```
あなたは優しい占い師です。
ライフパスナンバー ${number} の人に向けて、
励ましと応援のメッセージを150文字程度で伝えてください。
温かく前向きな内容にしてください。
```

#### 6.1.3 行動指針生成
```
あなたは数秘術アドバイザーです。
ライフパスナンバー ${number} の人が今日意識すべきポイントと、
やると良いことを100文字程度でアドバイスしてください。
```

---

## 7. デザインシステム

### 7.1 カラーパレット

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'mystic-purple': {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        'mystic-gold': {
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        }
      },
      backgroundImage: {
        'mystic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'dark-mystic': 'linear-gradient(to bottom, #1a0b2e, #0f0520)',
      }
    }
  }
};
```

### 7.2 フォント

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Serif+JP:wght@400;600;700&display=swap');

/* 英数字: Cinzel（神秘的セリフ） */
/* 日本語: Noto Serif JP */
```

---

## 8. PWA設定

### 8.1 manifest.json
```json
{
  "name": "数秘術風占い",
  "short_name": "数秘術",
  "description": "誕生日から運命の数字を占うアプリ",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a0b2e",
  "theme_color": "#7C3AED",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 9. データモデル設計

### 9.1 型定義

```typescript
// types/numerology.ts

export interface NumerologyResult {
  lifePathNumber: number;
  calculationSteps: CalculationStep[];
  meaning: NumberMeaning;
  todaysFortune: string;
  luckyNumbers: number[];
}

export interface CalculationStep {
  description: string;
  calculation: string;
  result: number;
}

export interface CompatibilityResult {
  score: number;             // 0-100
  level: string;             // '最高の相性！'等
  strengths: string[];       // 相性の良い点
  challenges: string[];      // 注意点
}

export interface AIContent {
  explanation: string;       // 詳しい解説
  message: string;           // メッセージ
  advice: string;            // 行動指針
  generatedAt: Date;
}

export interface NumerologyHistory {
  date: string;
  birthdate: string;
  lifePathNumber: number;
  name?: string;
  viewedAt: Date;
}
```

### 9.2 ローカルストレージ構造

```typescript
const STORAGE_KEYS = {
  API_KEY: 'numerology-app-api-key',
  HISTORY: 'numerology-app-history',
  FAVORITES: 'numerology-app-favorites',
};
```

---

## 10. 占い系アプリとの連携

### 10.1 共通ナビゲーション

```typescript
// components/Navigation.tsx
const FORTUNE_APPS = [
  { id: 9, name: 'ラッキーカラー', path: '/app009-lucky-color' },
  { id: 10, name: '相性診断', path: '/app010-compatibility' },
  { id: 11, name: '星座占い', path: '/app011-zodiac' },
  { id: 33, name: '数秘術', path: '/app033-numerology' },
];
```

### 10.2 9番「ラッキーカラー」との連携

```typescript
// lib/luckyColor.ts
export function getLuckyColorByNumber(lifePathNumber: number): string {
  const colorMap: Record<number, string> = {
    1: '赤',
    2: 'オレンジ',
    3: '黄色',
    4: '緑',
    5: '青',
    6: 'インディゴ',
    7: '紫',
    8: 'ピンク',
    9: 'ゴールド',
    11: 'シルバー',
    22: 'ターコイズ',
    33: 'エメラルド',
  };
  return colorMap[lifePathNumber] || '白';
}
```

### 10.3 10番「相性診断」との統合

- 数秘術の相性スコアを10番アプリに追加
- 名前ベースの相性診断と数秘術ベースの相性診断を両方表示

---

## 11. パフォーマンス最適化

### 11.1 計算最適化
- 数秘術計算は軽量（100ms以内）
- 結果のメモ化（同じ誕生日の再計算を避ける）

### 11.2 アニメーション最適化
- Framer Motionの最適化設定
- will-change CSS使用

---

## 12. テスト戦略

### 12.1 単体テスト
- 数秘術計算ロジック（各ケース網羅）
- マスターナンバー判定
- 相性診断ロジック

### 12.2 統合テスト
- コンポーネント連携
- ローカルストレージ操作

### 12.3 E2Eテスト
- 誕生日入力 → 計算 → 結果表示の流れ
- AI生成フロー
- 相性診断フロー

---

## 13. 次ステップ

1. ✅ 技術設計書レビュー・承認
2. ⬜ 実装計画書作成（TDD準拠版）
3. ⬜ 開発環境セットアップ
4. ⬜ 実装開始（Claude Code on the Web）

---

**作成者**: クロ
**レビュー待ち**: あおいさん
