// プレイヤーのスコア計算のためのインターフェース
export interface ScoreCalculationInput {
  isParent: boolean; // 親かどうか
  yaku: string[]; // 選ばれた役の配列
  fu: number; // 符
  isTsumo: boolean; // ツモ上がりかロン上がりか
}

export interface ScoreCalculationResult {
  baseScore: number; // 基本点
  totalScore: number; // 合計点
  parentPayment?: number; // 親が支払う点数（ツモ時）
  childPayment?: number; // 子が支払う点数（ツモ時）
}

// 各役の翻数を定義する型
interface YakuToHan {
  [key: string]: number; // 任意のキーを持つオブジェクト
}

// 各役の翻数を定義する
const yakuToHan: YakuToHan = {
  タンヤオ: 1,
  ピンフ: 1,
  // 他の役も追加する
};

// 役に基づく翻数を計算する関数
const getHanFromYaku = (yaku: string[]): number => {
  return yaku.reduce((totalHan, currentYaku) => {
    const hanValue = yakuToHan[currentYaku] || 0; // 役に基づく翻数を取得
    return totalHan + hanValue; // 翻数を合計
  }, 0);
};

// 翻数に基づく乗数を計算する関数
const hanToMultiplier = (han: number): number => {
  if (han >= 5) {
    return 8000; // 満貫以上
  }
  return Math.pow(2, han + 2);
};

// スコアを計算する関数
export const calculateScore = (
  input: ScoreCalculationInput
): ScoreCalculationResult => {
  const { isParent, yaku, fu, isTsumo } = input;

  // 翻数を役から計算する
  const han = getHanFromYaku(yaku);

  // 基本点を計算する
  const multiplier = hanToMultiplier(han);
  let baseScore = fu * multiplier;

  // ツモかロンかで点数を分ける
  let totalScore = baseScore;
  let parentPayment, childPayment;

  if (isTsumo) {
    if (isParent) {
      parentPayment = totalScore;
      totalScore = parentPayment * 3; // 全員から同じ額を支払わせる
    } else {
      parentPayment = totalScore * 2;
      childPayment = totalScore;
      totalScore = parentPayment + childPayment * 2;
    }
  } else {
    totalScore = totalScore * 6; // ロンの場合は直接計算
  }

  return {
    baseScore,
    totalScore,
    parentPayment,
    childPayment,
  };
};
