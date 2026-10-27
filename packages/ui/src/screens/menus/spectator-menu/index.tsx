import type { GuiSpriteName } from "@verdigris/textures";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";

export type SpectatorAction = "close" | "next" | "previous" | "teleport_player" | "teleport_team";

export interface SpectatorMenuProps {
  className?: string;
  onSelect?: (action: SpectatorAction) => void;
}

const BUTTONS: { action: SpectatorAction; label: string; name: GuiSpriteName }[] = [
  { action: "close", label: "关闭", name: "sprites/spectator/close.png" },
  { action: "teleport_player", label: "传送到玩家", name: "sprites/spectator/teleport_to_player.png" },
  { action: "teleport_team", label: "传送到队伍", name: "sprites/spectator/teleport_to_team.png" },
  { action: "previous", label: "上一页", name: "sprites/spectator/scroll_left.png" },
  { action: "next", label: "下一页", name: "sprites/spectator/scroll_right.png" },
];

/**
 * 旁观者菜单（规格 §6.3）：16×16 按钮列。
 */
export function SpectatorMenu({ className, onSelect }: SpectatorMenuProps) {
  return (
    <div className={cn("flex flex-col bg-black/50", className)} data-hud="">
      {BUTTONS.map((button, index) => (
        <button
          aria-label={button.label}
          className="cursor-pointer border-0 bg-transparent p-0"
          key={button.action}
          onClick={() => onSelect?.(button.action)}
          style={{ height: gui(16), marginTop: gui(index === 0 ? 16 : 0), width: gui(16) }}
          type="button"
        >
          <GuiSprite height={16} name={button.name} width={16} />
        </button>
      ))}
    </div>
  );
}
