import { ae2SpriteMeta } from "@tennantite/textures";

import { ModSprite } from "../mod-sprite/index";
import { ModTabButton } from "./index";

const ICON = { height: 16, width: 16, x: 0, y: 0 };

export function ModTabButtonDemo() {
  return (
    <div className="relative h-16 w-32">
      <ModTabButton
        icon={<ModSprite sprite={ae2SpriteMeta.states} src={ICON} />}
        label="未选中"
        left={0}
        selected={false}
        top={0}
      />
      <ModTabButton
        icon={<ModSprite sprite={ae2SpriteMeta.states} src={ICON} />}
        label="已选中"
        left={28}
        selected
        top={0}
      />
    </div>
  );
}
