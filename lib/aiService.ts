/**
 * AI生成サービス（Google AI Studio API統合）
 */

/**
 * AI生成リクエスト
 */
export async function generateAIContent(
  apiKey: string,
  lifePathNumber: number,
  type: 'explanation' | 'message' | 'advice'
): Promise<string> {
  // APIキーが無い場合はデモモード
  if (!apiKey || apiKey === 'demo') {
    return generateDemoContent(lifePathNumber, type);
  }

  try {
    const prompt = generatePrompt(lifePathNumber, type);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error('AI生成に失敗しました');
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || generateDemoContent(lifePathNumber, type);
  } catch (error) {
    console.error('AI生成エラー:', error);
    return generateDemoContent(lifePathNumber, type);
  }
}

/**
 * プロンプト生成
 */
function generatePrompt(lifePathNumber: number, type: string): string {
  switch (type) {
    case 'explanation':
      return `あなたは数秘術の専門家です。ライフパスナンバー ${lifePathNumber} について、深い意味と歴史的・文化的背景を200文字程度で解説してください。神秘的で興味深い内容にしてください。`;

    case 'message':
      return `あなたは優しい占い師です。ライフパスナンバー ${lifePathNumber} の人に向けて、励ましと応援のメッセージを150文字程度で伝えてください。温かく前向きな内容にしてください。`;

    case 'advice':
      return `あなたは数秘術アドバイザーです。ライフパスナンバー ${lifePathNumber} の人が今日意識すべきポイントと、やると良いことを100文字程度でアドバイスしてください。`;

    default:
      return '';
  }
}

/**
 * デモコンテンツ生成
 */
function generateDemoContent(lifePathNumber: number, type: string): string {
  const demoData: Record<number, Record<string, string>> = {
    1: {
      explanation: 'ナンバー1は太陽を象徴し、古代から「始まり」や「創造」を表してきました。エジプトでは神の数とされ、リーダーシップと独立の力を持つとされています。新しい道を切り開く勇気と、他者を導く力があなたには宿っています。',
      message: 'あなたは生まれながらのリーダーです。自分の直感を信じて、恐れずに前進してください。あなたの勇気が、周りの人々にも希望と勇気を与えます。今日も輝き続けてください！',
      advice: '今日は新しいことに挑戦する絶好の日です。自分のアイデアを信じて行動しましょう。',
    },
    // 他の数字も同様に定義...
  };

  // デフォルトメッセージ
  const defaultData = {
    explanation: `ナンバー${lifePathNumber}は、数秘術において特別な意味を持つ数字です。古代から現代まで、多くの文化でこの数字の神秘性が認識されてきました。あなたの人生の道筋を示す重要な数字として、深い洞察をもたらしてくれるでしょう。`,
    message: `あなたの持つナンバー${lifePathNumber}の力を信じてください。この数字があなたに与える特別な才能を活かし、自分らしく輝いていきましょう。今日も素敵な一日になりますように！`,
    advice: `今日は${lifePathNumber}の力を意識して過ごしましょう。自分の直感を信じて行動することが良い結果につながります。`,
  };

  const data = demoData[lifePathNumber];
  if (data && type in data) {
    return data[type as keyof typeof data];
  }
  return defaultData[type as keyof typeof defaultData];
}
