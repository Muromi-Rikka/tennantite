import { ae2SpriteMeta } from "@tennantite/textures";

import { ModSprite } from "./index";

const ICON = { height: 16, width: 16, x: 0, y: 0 };

export function ModSpriteDemo() {
  return (
    <div className="relative h-24 w-48">
      <ModSprite
        height={16}
        left={0}
        sprite={ae2SpriteMeta.states}
        src={ICON}
        top={0}
        width={16}
      />
      <ModSprite
        height={16}
        left={24}
        sprite={ae2SpriteMeta.states}
        src={ICON}
        tint="#3f76e4"
        top={0}
        width={16}
      />
      <ModSprite
        height={32}
        left={48}
        sprite={ae2SpriteMeta.states}
        src={ICON}
        top={0}
        width={32}
      />
      <ModSprite
        height={32}
        left={0}
        sprite={ae2SpriteMeta.states}
        src={{ height: 16, width: 16, x: 16, y: 0 }}
        top={32}
        width={32}
      />
    </div>
  );
}
