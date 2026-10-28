import { ModSprite } from "@verdigris/mods-core";

import { ic2SpriteMeta } from "@verdigris/textures";

/**
 * IC2 左上角信息按钮图标（10×10，纯展示）。
 */
export function Ic2InfoIcon({ left, top }: { left: number; top: number }) {
  return (
    <ModSprite
      left={left}
      sprite={ic2SpriteMeta.infoButton}
      src={{ height: 10, width: 10, x: 0, y: 0 }}
      top={top}
    />
  );
}
