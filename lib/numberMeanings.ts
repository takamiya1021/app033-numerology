import { NumberMeaning } from '@/types/numerology';

/**
 * 数字の意味データ定義
 */
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
  2: {
    number: 2,
    name: '調和者',
    keywords: ['協調性', 'バランス', '感受性'],
    personality: {
      positive: ['協調性がある', '思いやり深い', 'バランス感覚がある'],
      negative: ['優柔不断', '依存的になりやすい', '自己主張が弱い'],
      career: ['カウンセラー', 'サポート役', '外交官']
    },
    element: '水',
    color: 'オレンジ',
    luckyDay: '月曜日'
  },
  3: {
    number: 3,
    name: '表現者',
    keywords: ['表現力', '社交性', '楽観性'],
    personality: {
      positive: ['表現力豊か', '社交的', '楽観的'],
      negative: ['散漫になりやすい', '軽率', '集中力に欠ける'],
      career: ['エンターテイナー', 'ライター', 'デザイナー']
    },
    element: '風',
    color: '黄色',
    luckyDay: '水曜日'
  },
  4: {
    number: 4,
    name: '建設者',
    keywords: ['安定性', '実直', '努力家'],
    personality: {
      positive: ['努力家', '計画的', '信頼できる'],
      negative: ['頑固', '柔軟性に欠ける', '保守的'],
      career: ['エンジニア', '建築家', '経理']
    },
    element: '土',
    color: '緑',
    luckyDay: '土曜日'
  },
  5: {
    number: 5,
    name: '冒険者',
    keywords: ['自由', '冒険', '変化'],
    personality: {
      positive: ['自由奔放', '適応力がある', '好奇心旺盛'],
      negative: ['落ち着きがない', '無責任になりやすい', '飽きっぽい'],
      career: ['旅行業', '営業', 'ジャーナリスト']
    },
    element: '風',
    color: '青',
    luckyDay: '水曜日'
  },
  6: {
    number: 6,
    name: '養育者',
    keywords: ['愛情', '責任感', '調和'],
    personality: {
      positive: ['愛情深い', '責任感が強い', '世話好き'],
      negative: ['過保護', '干渉しすぎる', '自己犠牲的'],
      career: ['教師', '医療従事者', 'カウンセラー']
    },
    element: '水',
    color: 'インディゴ',
    luckyDay: '金曜日'
  },
  7: {
    number: 7,
    name: '探求者',
    keywords: ['知性', '探究心', 'スピリチュアル'],
    personality: {
      positive: ['知的', '分析力がある', '直感的'],
      negative: ['孤立しやすい', '完璧主義', '疑い深い'],
      career: ['研究者', '哲学者', 'IT専門家']
    },
    element: '水',
    color: '紫',
    luckyDay: '土曜日'
  },
  8: {
    number: 8,
    name: '達成者',
    keywords: ['成功', '権力', '物質的豊かさ'],
    personality: {
      positive: ['野心的', '実行力がある', 'ビジネスセンスがある'],
      negative: ['物質主義的', '支配的', 'ワーカホリック'],
      career: ['経営者', '投資家', '銀行家']
    },
    element: '土',
    color: 'ピンク',
    luckyDay: '土曜日'
  },
  9: {
    number: 9,
    name: '完成者',
    keywords: ['完成', '普遍的愛', '人道主義'],
    personality: {
      positive: ['博愛主義的', '寛容', '理想主義的'],
      negative: ['現実逃避的', '依存的', '感情的'],
      career: ['慈善活動家', 'アーティスト', 'ヒーラー']
    },
    element: '火',
    color: 'ゴールド',
    luckyDay: '火曜日'
  },
  11: {
    number: 11,
    name: '直感者',
    keywords: ['直感', 'インスピレーション', '精神性'],
    personality: {
      positive: ['直感力が強い', 'インスピレーション豊か', 'カリスマ性がある'],
      negative: ['神経質', '不安定', '理想が高すぎる'],
      career: ['スピリチュアルリーダー', 'アーティスト', '発明家']
    },
    element: '風',
    color: 'シルバー',
    luckyDay: '月曜日'
  },
  22: {
    number: 22,
    name: '実現者',
    keywords: ['実現力', '大きな夢', 'マスタービルダー'],
    personality: {
      positive: ['実現力がある', 'ビジョンが大きい', '影響力がある'],
      negative: ['プレッシャーに弱い', '完璧主義', '自己批判的'],
      career: ['大規模プロジェクトリーダー', '社会起業家', '政治家']
    },
    element: '土',
    color: 'ターコイズ',
    luckyDay: '土曜日'
  },
  33: {
    number: 33,
    name: '奉仕者',
    keywords: ['無条件の愛', '奉仕', 'マスターティーチャー'],
    personality: {
      positive: ['無条件の愛を持つ', '奉仕精神が強い', '癒しの力がある'],
      negative: ['自己犠牲的すぎる', 'バーンアウトしやすい', '責任を背負いすぎる'],
      career: ['教育者', 'ヒーラー', '人道支援活動家']
    },
    element: '水',
    color: 'エメラルド',
    luckyDay: '金曜日'
  }
};

/**
 * 数字の意味を取得
 * @param number - ライフパスナンバー
 * @returns 数字の意味データ
 */
export function getNumberMeaning(number: number): NumberMeaning {
  const meaning = NUMBER_MEANINGS[number];
  if (!meaning) {
    throw new Error(`Invalid life path number: ${number}`);
  }
  return meaning;
}
