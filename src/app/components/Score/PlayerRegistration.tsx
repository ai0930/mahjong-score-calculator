import React, { useState } from "react";
import { Player } from "./types";

interface PlayerRegistrationProps {
  onPlayerRegister: (player: Player) => void;
}

const PlayerRegistration: React.FC<PlayerRegistrationProps> = ({
  onPlayerRegister,
}) => {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName) {
      const newPlayer: Player = {
        id: Date.now(),
        name: playerName,
        score: 25000, // 初期持ち点は 25000 点
      };
      onPlayerRegister(newPlayer);
      setPlayerName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>プレイヤー名:</label>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="名前を入力してください"
      />
      <button type="submit">プレイヤーを登録</button>
    </form>
  );
};

export default PlayerRegistration;
