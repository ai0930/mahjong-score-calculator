import React from "react";
import { Player } from "./types";

interface PlayerScoreManagerProps {
  player: Player;
  onScoreChange: (id: number, newScore: number) => void;
}

const PlayerScoreManager: React.FC<PlayerScoreManagerProps> = ({
  player,
  onScoreChange,
}) => {
  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScore = Number(e.target.value);
    if (!isNaN(newScore)) {
      onScoreChange(player.id, newScore);
    }
  };

  return (
    <div>
      <h3>{player.name}の点数管理</h3>
      <p>現在の点数: {player.score}点</p>
      <label>新しい点数を入力:</label>
      <input type="number" value={player.score} onChange={handleScoreChange} />
    </div>
  );
};

export default PlayerScoreManager;
