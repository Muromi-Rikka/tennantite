import type { ReactNode } from "react";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";

export interface GamemodeSwitcherProps {
  className?: string;
  /**
  * 当前选中的游戏模式 0..3
  */
  onChange?: (value: number) => void;
  title?: ReactNode;
  /**
  * 当前值 0..3
  */
  value?: number;
}

const LABELS = ["生存", "创造", "冒险", "旁观"];

/**
 * 游戏模式切换器（规格 §6）：`container/gamemode_switcher.png` 125×75。
 */
export function GamemodeSwitcher({
  className,
  onChange,
  title,
  value = 0,
}: GamemodeSwitcherProps) {
  return (
    <ScreenPanel
      background="container/gamemode_switcher.png"
      className={className}
      height={75}
      title={title}
      width={125}
    >
      {Array.from({ length: 4 }, (_, index) => (
        <button
          aria-label={LABELS[index]}
          aria-pressed={value === index}
          className="absolute cursor-pointer border-0 bg-transparent p-0"
          key={index}
          onClick={() => {
            onChange?.(index);
          }}
          style={{ height: gui(26), left: gui(9 + index * 27), top: gui(24), width: gui(26) }}
          type="button"
        >
          <GuiSprite
            height={26}
            name="sprites/gamemode_switcher/slot.png"
            width={26}
          />
          {value === index
            ? (
                <GuiSprite
                  className="absolute inset-0"
                  height={26}
                  name="sprites/gamemode_switcher/selection.png"
                  width={26}
                />
              )
            : null}
        </button>
      ))}
    </ScreenPanel>
  );
}
