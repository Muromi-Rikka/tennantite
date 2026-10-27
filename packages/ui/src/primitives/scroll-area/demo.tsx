import { Fragment } from "react";

import { ScrollArea } from "./index";

const SERVERS = [
  "Hypixel — mc.hypixel.net",
  "Mineplex — mineplex.com",
  "CubeCraft — cubecraft.net",
  "The Hive — hivemc.eu",
  "GommeHD — gommehd.net",
  " lunar-network — play.lunar.gg",
  "PurpleMC — purplemc.net",
  "NetherGames —ethergames.org",
] as const;

/**
 * ScrollArea 预览用例：服务器列表
*/
export function ScrollAreaDemo() {
  return (
    <ScrollArea className="mc-tex-slot h-60 w-140 p-4">
      <ul className="flex flex-col gap-2">
        {SERVERS.map((name, index) => (
          <Fragment key={name}>
            <li className="font-mc mc-text text-mc-text-main">{name}</li>
            {index < SERVERS.length - 1
              ? (
                  <li aria-hidden="true" className="h-(--mc-gui) bg-mc-stone-dark" />
                )
              : null}
          </Fragment>
        ))}
      </ul>
    </ScrollArea>
  );
}
