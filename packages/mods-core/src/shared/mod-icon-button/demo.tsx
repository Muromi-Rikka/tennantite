import { ae2SpriteMeta } from "@tennantite/textures";

import { ModIconButton } from "./index";
import { ModSprite } from "../mod-sprite/index";

const ICON = { height: 16, width: 16, x: 0, y: 0 };

export function ModIconButtonDemo() {
  return (
    <div className="relative h-16 w-32">
      <ModIconButton
        icon={<ModSprite sprite={ae2SpriteMeta.states} src={ICON} />}
        label="设置"
        left={0}
        top={0}
      />
      <ModIconButton
        icons={[
          <ModSprite key="a" sprite={ae2SpriteMeta.states} src={ICON} />,
          <ModSprite key="b" sprite={ae2SpriteMeta.states} src={{ ...ICON, x: 16 }} />,
        ]}
        label="多态"
        left={28}
        state={1}
        top={0}
      />
    </div>
  );
}
