import type { GuiSpriteName } from "@verdigris/textures";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";
import { MenuBackground } from "../menu-background";

export interface RealmEntry {
  description?: string;
  name: string;
  status?: "closed" | "expired" | "expires_soon" | "open";
}

export interface RealmsScreenProps {
  className?: string;
  onConfigure?: () => void;
  onPlay?: () => void;
  realms?: RealmEntry[];
  selectedName?: string;
  title?: React.ReactNode;
}

/**
 * Realms 界面（规格 §6.3）：320×240 + Realm 状态图标。
 */
export function RealmsScreen({
  className,
  onConfigure,
  onPlay,
  realms = [],
  selectedName,
  title = "Minecraft Realms",
}: RealmsScreenProps) {
  return (
    <MenuBackground
      className={cn("overflow-hidden", className)}
      style={{ height: gui(240), width: gui(320) }}
    >
      <div className="absolute font-mc mc-text text-mc-text-main mc-text-shadow" style={{ left: gui(8), top: gui(8) }}>
        {title}
      </div>
      {realms.slice(0, 4).map((realm, index) => (
        <div
          className={cn(
            "absolute flex items-center gap-2 rounded-none px-2 outline-1 outline-transparent",
            selectedName === realm.name && "outline-white",
          )}
          key={realm.name}
          style={{ height: gui(36), left: gui(4), top: gui(36 + index * 36), width: gui(312) }}
        >
          <GuiSprite height={32} name="realms/adventure.png" width={32} />
          <span className="flex flex-col">
            <span className="font-mc mc-text text-mc-text-main mc-text-shadow">{realm.name}</span>
            <span className="font-mc mc-text text-mc-text-dim">{realm.description}</span>
          </span>
          <GuiSprite
            className="ml-auto"
            height={28}
            name={`sprites/realm_status/${realm.status ?? "open"}.png` as GuiSpriteName}
            width={10}
          />
        </div>
      ))}
      <Button className="absolute w-200" onClick={onPlay} style={{ left: gui(60), top: gui(186) }}>
        游玩
      </Button>
      <Button className="absolute w-98" onClick={onConfigure} style={{ left: gui(162), top: gui(210) }}>
        配置
      </Button>
    </MenuBackground>
  );
}
