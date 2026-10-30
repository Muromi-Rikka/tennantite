import { gui, GuiSprite, PlayerInventory, ScreenPanel } from "@tennantite/ui";
import { useState } from "react";

import { EioSprite } from "../eio-sprite/index";

// coords from screen/tele_pad pixel inspection (upstream Screen unavailable at pinned commit)
const BUTTONS = [
  { label: "传送操作 1", left: 152, top: 46 },
  { label: "传送操作 2", left: 152, top: 83 },
] as const;

export interface EioTelePadScreenProps {
  className?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

/**
 * 传送板（218×230，coords from screen/tele_pad pixel inspection
 * (upstream Screen unavailable at pinned commit)）：整幅背景（含右侧 26×124
 * 光柱区）、传送操作按钮 ×2 与玩家背包。
 */
export function EioTelePadScreen({
  className,
  onPrimaryAction,
  onSecondaryAction,
}: EioTelePadScreenProps) {
  const [highlighted, setHighlighted] = useState<null | string>(null);
  const handlers = [onPrimaryAction, onSecondaryAction];

  return (
    <ScreenPanel
      backgroundClassName="bg-transparent"
      className={className}
      data-eio-machine="telePad"
      height={230}
      width={218}
    >
      <EioSprite
        crop={{ height: 230, width: 218, x: 0, y: 0 }}
        height={230}
        name="screen/tele_pad"
        width={218}
      />
      {BUTTONS.map((button, index) => (
        <button
          aria-label={button.label}
          className="absolute p-0"
          data-eio-icon-button="sprites/widget/button.png"
          key={button.label}
          onBlur={() => { setHighlighted(null); }}
          onClick={handlers[index]}
          onFocus={() => { setHighlighted(button.label); }}
          onMouseEnter={() => { setHighlighted(button.label); }}
          onMouseLeave={() => { setHighlighted(null); }}
          style={{
            background: "transparent",
            border: 0,
            height: gui(16),
            left: gui(button.left),
            padding: 0,
            top: gui(button.top),
            width: gui(16),
          }}
          title={button.label}
          type="button"
        >
          <GuiSprite
            className="absolute top-0 left-0"
            height={16}
            name={highlighted === button.label ? "sprites/widget/button_highlighted.png" : "sprites/widget/button.png"}
            width={16}
          />
        </button>
      ))}
      <PlayerInventory
        bare
        hotbarY={196}
        x={7}
        y={138}
      />
    </ScreenPanel>
  );
}
