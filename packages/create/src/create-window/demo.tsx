import { ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";

import { CREATE_ATLAS } from "../create-metrics";
import { CreateWindow } from "./index";

export function CreateWindowDemo() {
  return (
    <div className="relative">
      <CreateWindow
        background={(
          <ModSprite
            left={0}
            sprite={createSpriteMeta[CREATE_ATLAS.filter.atlas]}
            src={CREATE_ATLAS.filter}
            top={0}
          />
        )}
        height={99}
        player={{}}
        title="筛选器"
        titleTop={8}
        width={214}
      />
    </div>
  );
}
