import React from "react";
import { ScoreCalculationResult } from "./calculateScore";

interface PlayerScoreDisplayProps {
  result: ScoreCalculationResult;
}

const PlayerScoreDisplay: React.FC<PlayerScoreDisplayProps> = ({ result }) => {
  return (
    <div>
      <h3>計算結果</h3>
      <p>基本点: {result.baseScore}</p>
      <p>合計点: {result.totalScore}</p>
      {result.parentPayment && <p>親の支払額: {result.parentPayment}</p>}
      {result.childPayment && <p>子の支払額: {result.childPayment}</p>}
    </div>
  );
};

export default PlayerScoreDisplay;
