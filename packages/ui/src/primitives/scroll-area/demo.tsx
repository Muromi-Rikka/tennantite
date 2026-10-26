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
    <ScrollArea className="mc-tex-slot h-120 w-280 p-8">
      <ul className="flex flex-col gap-4">
        {SERVERS.map((name, index) => (
          <Fragment key={name}>
            <li className="font-readable text-mc text-mc-text-main">{name}</li>
            {index < SERVERS.length - 1
              ? (
                  <li aria-hidden="true" className="h-px bg-mc-stone-dark" />
                )
              : null}
          </Fragment>
        ))}
      </ul>
    </ScrollArea>
  );
}
