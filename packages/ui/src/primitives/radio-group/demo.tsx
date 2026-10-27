import { useState } from "react";

import { Radio, RadioGroup } from "./index";

const DIFFICULTIES = ["和平", "简单", "普通", "困难"] as const;

/**
 * RadioGroup 预览用例：难度选择
*/
export function RadioGroupDemo() {
  const [difficulty, setDifficulty] = useState("普通");

  return (
    <RadioGroup
      aria-label="游戏难度"
      onValueChange={(value) => {
        setDifficulty(value as string);
      }}
      value={difficulty}
    >
      {DIFFICULTIES.map(name => (
        <label className="flex items-center gap-4" key={name}>
          <Radio value={name} />
          <span className="font-mc mc-text">
            {name}
            {difficulty === name ? "（当前）" : ""}
          </span>
        </label>
      ))}
    </RadioGroup>
  );
}
