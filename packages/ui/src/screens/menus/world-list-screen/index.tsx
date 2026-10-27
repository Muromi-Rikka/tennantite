import type { GuiSpriteName } from "@verdigris/textures";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";
import { MenuBackground } from "../menu-background";

export interface WorldEntry {
  name: string;
  status?: "error" | "join" | "marked_join" | "warning";
}

export interface WorldListScreenProps {
  className?: string;
  onCreate?: () => void;
  onDelete?: (name: string) => void;
  onEdit?: (name: string) => void;
  onPlay?: (name: string) => void;
  onSelect?: (name: string) => void;
  selectedName?: string;
  title?: React.ReactNode;
  worlds?: WorldEntry[];
}

/**
 * 世界列表（规格 §6.3）：320×240 + 32×32 世界图标。
 */
export function WorldListScreen({
  className,
  onCreate,
  onDelete,
  onEdit,
  onPlay,
  onSelect,
  selectedName,
  title = "选择世界",
  worlds = [],
}: WorldListScreenProps) {
  return (
    <MenuBackground
      className={cn("overflow-hidden", className)}
      style={{ height: gui(240), width: gui(320) }}
    >
      <div className="absolute font-mc mc-text text-mc-text-main mc-text-shadow" style={{ left: gui(8), top: gui(8) }}>
        {title}
      </div>
      {worlds.slice(0, 4).map((world, index) => (
        <div
          className={cn(
            "absolute flex items-center outline-1 outline-transparent",
            selectedName === world.name && "outline-white",
          )}
          key={world.name}
          style={{ height: gui(36), left: gui(4), top: gui(36 + index * 36), width: gui(312) }}
        >
          <button
            aria-label={world.name}
            className="flex flex-1 cursor-pointer items-center border-0 bg-transparent text-left"
            onClick={() => onSelect?.(world.name)}
            type="button"
          >
            <GuiSprite
              className="ml-2"
              height={32}
              name={`sprites/world_list/${world.status ?? "join"}.png` as GuiSpriteName}
              width={32}
            />
            <span className="ml-2 font-mc mc-text text-mc-text-main mc-text-shadow">{world.name}</span>
          </button>
          <button
            aria-label={`删除 ${world.name}`}
            className="mr-2 cursor-pointer border-0 bg-transparent p-0"
            onClick={() => onDelete?.(world.name)}
            style={{ height: gui(32), width: gui(32) }}
            type="button"
          >
            <GuiSprite height={32} name="sprites/world_list/error.png" width={32} />
          </button>
        </div>
      ))}
      <Button className="absolute w-200" onClick={() => onPlay?.(selectedName ?? "")} style={{ left: gui(60), top: gui(186) }}>
        进入世界
      </Button>
      <Button className="absolute w-98" onClick={onCreate} style={{ left: gui(60), top: gui(210) }}>
        创建新世界
      </Button>
      <Button className="absolute w-98" onClick={() => onEdit?.(selectedName ?? "")} style={{ left: gui(162), top: gui(210) }}>
        编辑
      </Button>
    </MenuBackground>
  );
}
