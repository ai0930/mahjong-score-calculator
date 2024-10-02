import React, { useState } from "react";
import { yakuData } from "../data/yakuData"; // 役のデータをインポート

// yakuDataの型定義
interface Yaku {
  id: number;
  name: string;
  description?: string; // 説明をオプションに追加
}

interface YakuSelectProps {
  onYakuSelect: (selectedYaku: string[]) => void; // 選択された役を親コンポーネントに送る
}

const YakuSelect: React.FC<YakuSelectProps> = ({ onYakuSelect }) => {
  const [selectedYaku, setSelectedYaku] = useState<string[]>([]);

  const handleYakuChange = (yaku: string) => {
    setSelectedYaku((prev) => {
      if (prev.includes(yaku)) {
        return prev.filter((item) => item !== yaku); // 既に選択されている場合は削除
      } else {
        return [...prev, yaku]; // 新しく選択
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onYakuSelect(selectedYaku); // 親コンポーネントに選択した役を送信
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>役を選択してください</h3>
      {yakuData.map((yaku: Yaku) => (
        <div key={yaku.id}>
          <label>
            <input
              type="checkbox"
              value={yaku.name}
              checked={selectedYaku.includes(yaku.name)}
              onChange={() => handleYakuChange(yaku.name)}
            />
            {yaku.name}
          </label>
          {yaku.description && <p>{yaku.description}</p>} {/* 説明を表示 */}
        </div>
      ))}
      <button type="submit">選択完了</button>
    </form>
  );
};

export default YakuSelect;
