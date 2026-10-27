/* eslint-disable react/no-array-index-key -- 告示牌行号是固定 1..4 的字段身份 */
import type { GuiSpriteName } from "@verdigris/textures";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";

export interface SignEditProps {
  className?: string;
  lines?: [string, string, string, string];
  maxLines?: 1 | 2 | 3 | 4;
  onChange?: (lines: string[]) => void;
  title?: React.ReactNode;
  /**
  * 木材类型
  */
  wood?: string;
}

/**
 * 告示牌编辑（规格 §6.3）：200×96 木质背景 + 四行输入。
 */
export function SignEdit({
  className,
  lines = ["", "", "", ""],
  maxLines = 4,
  onChange,
  title,
  wood = "oak",
}: SignEditProps) {
  const visible = lines.slice(0, maxLines);
  return (
    <div
      className={cn("relative", className)}
      style={{ height: gui(96), width: gui(200) }}
    >
      <GuiSprite
        className="absolute inset-0"
        height={96}
        name={`signs/${wood}.png` as GuiSpriteName}
        tile
        width={200}
      />
      {title
        ? <div className="absolute inset-x-0 top-1 text-center font-mc mc-text text-mc-text-main mc-text-shadow">{title}</div>
        : null}
      {visible.map((line, index) => (
        <input
          aria-label={`告示牌第 ${index + 1} 行`}
          className="absolute w-full border-0 bg-transparent text-center font-mc mc-text text-mc-text-main caret-white outline-none"
          defaultValue={line}
          key={index}
          maxLength={24}
          onChange={(event) => {
            const next = [...visible];
            next[index] = event.target.value;
            onChange?.(next);
          }}
          style={{ height: gui(18), left: 0, top: gui(20 + index * 18) }}
        />
      ))}
    </div>
  );
}
