import type { GuiSpriteName } from "@verdigris/textures";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn, gui } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";
import { MenuBackground } from "../menu-background/index";

export interface MultiplayerScreenProps {
  className?: string;
  onDirectConnect?: () => void;
  onJoin?: () => void;
  onServerSelect?: (address: string) => void;
  selectedAddress?: string;
  servers?: ServerEntry[];
}

export interface ServerEntry {
  address: string;
  meta?: string;
  name: string;
  ping?: 1 | 2 | 3 | 4 | 5;
}

/**
 * 多人游戏服务器列表（规格 §6.3）：320×240 menu_background + 4 行 36px 服务器。
 */
export function MultiplayerScreen({
  className,
  onDirectConnect,
  onJoin,
  onServerSelect,
  selectedAddress,
  servers = [],
}: MultiplayerScreenProps) {
  return (
    <MenuBackground
      className={cn("relative overflow-hidden", className)}
      style={{ height: gui(240), width: gui(320) }}
    >
      <div className="absolute font-mc mc-text text-mc-text-main mc-text-shadow" style={{ left: gui(8), top: gui(8) }}>
        选择服务器
      </div>
      <GuiSprite
        className="absolute"
        height={2}
        name="header_separator.png"
        style={{ left: 0, top: gui(32) }}
        tile
        width={320}
      />
      <GuiSprite
        className="absolute"
        height={148}
        name="menu_list_background.png"
        style={{ left: 0, top: gui(34) }}
        tile
        width={320}
      />
      {servers.slice(0, 4).map((server, index) => {
        const top = 36 + index * 36;
        const isSelected = selectedAddress === server.address;
        return (
          <button
            className={cn(
              "absolute flex cursor-pointer items-center border-0 bg-transparent p-0 text-left",
              isSelected && "outline-1 outline-white",
            )}
            data-address={server.address}
            data-selected={isSelected ? "" : undefined}
            data-server-entry=""
            key={server.address}
            onClick={() => {
              onServerSelect?.(server.address);
            }}
            style={{ height: gui(36), left: gui(4), top: gui(top), width: gui(312) }}
            type="button"
          >
            <GuiSprite
              className="ml-2"
              height={32}
              name="sprites/server_list/join.png"
              width={32}
            />
            <span className="ml-2 flex flex-col">
              <span className="font-mc mc-text text-mc-text-main mc-text-shadow">{server.name}</span>
              <span className="font-mc mc-text text-mc-text-dim">{server.address}</span>
            </span>
            {server.ping
              ? (
                  <GuiSprite
                    className="mr-6 ml-auto"
                    height={8}
                    name={`server_list/ping_${server.ping}.png` as GuiSpriteName}
                    width={10}
                  />
                )
              : null}
          </button>
        );
      })}
      <GuiSprite
        className="absolute"
        height={2}
        name="footer_separator.png"
        style={{ left: 0, top: gui(184) }}
        tile
        width={320}
      />
      <Button
        className="absolute w-200"
        onClick={onJoin}
        style={{ left: gui(60), top: gui(186) }}
      >
        加入服务器
      </Button>
      <Button
        className="absolute w-98"
        onClick={onDirectConnect}
        style={{ left: gui(60), top: gui(210) }}
      >
        直接连接
      </Button>
      <Button className="absolute w-98" style={{ left: gui(162), top: gui(210) }}>
        添加服务器
      </Button>
    </MenuBackground>
  );
}
