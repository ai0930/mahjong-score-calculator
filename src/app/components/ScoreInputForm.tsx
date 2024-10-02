import React, { useState } from "react";
import RoleSelect from "./RoleSelect";

interface ScoreInputFormProps {
  onSubmit: (data: any) => void;
}

const ScoreInputForm: React.FC<ScoreInputFormProps> = ({ onSubmit }) => {
  const [isParent, setIsParent] = useState(false);
  const [isTsumo, setIsTsumo] = useState(false);
  const [han, setHan] = useState(1);
  const [fu, setFu] = useState(20);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      isParent,
      isTsumo,
      han,
      fu,
      selectedRoles,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>親ですか？</label>
        <input
          type="checkbox"
          checked={isParent}
          onChange={() => setIsParent(!isParent)}
        />
      </div>
      <div>
        <label>ツモですか？</label>
        <input
          type="checkbox"
          checked={isTsumo}
          onChange={() => setIsTsumo(!isTsumo)}
        />
      </div>
      <div>
        <label>飜数</label>
        <input
          type="number"
          value={han}
          onChange={(e) => setHan(Number(e.target.value))}
        />
      </div>
      <div>
        <label>符</label>
        <input
          type="number"
          value={fu}
          onChange={(e) => setFu(Number(e.target.value))}
        />
      </div>
      <RoleSelect
        selectedRoles={selectedRoles}
        onRolesChange={setSelectedRoles}
      />
      <button type="submit">計算する</button>
    </form>
  );
};

export default ScoreInputForm;
