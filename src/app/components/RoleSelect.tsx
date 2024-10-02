import React, { useState } from "react";

interface RoleSelectProps {
  selectedRoles: string[];
  onRolesChange: (roles: string[]) => void;
}

const roles = ["リーチ", "ツモ", "タンヤオ", "ピンフ", "チートイツ", "ドラ"];

const RoleSelect: React.FC<RoleSelectProps> = ({
  selectedRoles,
  onRolesChange,
}) => {
  const handleRoleChange = (role: string) => {
    if (selectedRoles.includes(role)) {
      onRolesChange(selectedRoles.filter((r) => r !== role));
    } else {
      onRolesChange([...selectedRoles, role]);
    }
  };

  return (
    <div>
      <h3>役を選択してください</h3>
      {roles.map((role) => (
        <div key={role}>
          <label>
            <input
              type="checkbox"
              value={role}
              checked={selectedRoles.includes(role)}
              onChange={() => handleRoleChange(role)}
            />
            {role}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RoleSelect;
