import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

export interface AnvilScreenProps {
  className?: string;
  /**
  * 显示错误叉（(99,45) 28×21）
  */
  error?: boolean;
  item?: ScreenSlot;
  levelCost?: number;
  material?: ScreenSlot;
  onNameChange?: (name: string) => void;
  onTakeResult?: () => void;
  result?: ScreenSlot;
  title?: ReactNode;
  value?: string;
}

/**
 * 铁砧界面（规格 §6）：`container/anvil.png` 176×166。
 */
export function AnvilScreen({
  className,
  error = false,
  item,
  levelCost = 0,
  material,
  onNameChange,
  onTakeResult,
  result,
  title,
  value,
}: AnvilScreenProps) {
  return (
    <ScreenPanel
      background="container/anvil.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <div
        className="absolute"
        style={{ height: gui(16), left: gui(59), top: gui(20), width: gui(110) }}
      >
        <GuiSprite
          className="absolute inset-0"
          height={16}
          name="sprites/container/anvil/text_field.png"
          width={110}
        />
        <input
          aria-label="物品名称"
          className="absolute inset-0 w-full border-0 bg-transparent px-4 font-mc mc-text text-mc-text-main caret-white outline-none"
          onChange={(event) => {
            onNameChange?.(event.target.value);
          }}
          style={{ height: gui(16) }}
          value={value}
        />
      </div>
      <ScreenItemSlot item={item} label="anvil-item" left={26} top={46} />
      <ScreenItemSlot item={material} label="anvil-material" left={75} top={46} />
      <ScreenItemSlot
        item={result}
        label="anvil-result"
        left={133}
        onActivate={onTakeResult}
        top={46}
      />
      {error
        ? (
            <GuiSprite
              className="absolute"
              height={21}
              name="sprites/container/anvil/error.png"
              style={{ left: gui(99), top: gui(45) }}
              width={28}
            />
          )
        : null}
      <span
        className="absolute font-mc mc-text text-mc-accent-green mc-text-shadow"
        style={{ left: gui(59), top: gui(68) }}
      >
        {levelCost > 0 ? `${levelCost} 级` : ""}
      </span>
      <PlayerInventory bare />
    </ScreenPanel>
  );
}
