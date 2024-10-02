"use client";
import React, { useState } from "react";
import ScoreInputForm from "./components/ScoreInputForm";
import PlayerScoreDisplay from "./components/PlayerScoreDisplay";
import {
  calculateScore,
  ScoreCalculationInput,
  ScoreCalculationResult,
} from "./components/calculateScore";
import PlayerRegistration from "./components/Score/PlayerRegistration";
import PlayerScoreManager from "./components/Score/PlayerScoreManager";
import { Player } from "./components/Score/types";

const MainPage: React.FC = () => {
  const [result, setResult] = useState<ScoreCalculationResult | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  // スコア計算フォームの送信処理
  const handleFormSubmit = (data: ScoreCalculationInput) => {
    const scoreResult = calculateScore(data);
    setResult(scoreResult);
  };

  // プレイヤー登録の処理
  const handlePlayerRegister = (newPlayer: Player) => {
    setPlayers([...players, newPlayer]);
  };

  // プレイヤーのスコア変更処理
  const handleScoreChange = (id: number, newScore: number) => {
    setPlayers(
      players.map((player) =>
        player.id === id ? { ...player, score: newScore } : player
      )
    );
  };

  return (
    <div>
      <h1>麻雀点数管理システム</h1>

      {/* プレイヤー登録フォーム */}
      <PlayerRegistration onPlayerRegister={handlePlayerRegister} />

      {/* 各プレイヤーの点数管理 */}
      <div>
        {players.map((player) => (
          <PlayerScoreManager
            key={player.id}
            player={player}
            onScoreChange={handleScoreChange}
          />
        ))}
      </div>

      <h2>点数計算機</h2>
      <ScoreInputForm onSubmit={handleFormSubmit} />
      {result && <PlayerScoreDisplay result={result} />}
    </div>
  );
};

export default MainPage;
