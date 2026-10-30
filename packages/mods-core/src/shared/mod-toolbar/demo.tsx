import { ae2SpriteMeta } from "@tennantite/textures";

import { ModToolbar } from "./index";
import { ModSprite } from "../mod-sprite/index";

const ICON = { height: 16, width: 16, x: 0, y: 0 };

export function ModToolbarDemo() {
  return (
    <div className="relative h-24 w-8">
      <ModToolbar
        items={[
          { icon: <ModSprite sprite={ae2SpriteMeta.states} src={ICON} />, label: "排序" },
          { icon: <ModSprite sprite={ae2SpriteMeta.states} src={{ ...ICON, x: 16 }} />, label: "设置" },
          { icon: <ModSprite sprite={ae2SpriteMeta.states} src={{ ...ICON, x: 32 }} />, label: "查看" },
        ]}
        left={0}
        top={0}
      />
    </div>
  );
}
