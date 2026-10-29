/**
 * @tennantite/textures — vanilla Minecraft GUI sprites and 26.3 item/status icons.
 */
import { guiIcons } from "./gui-icons.generated";
import { pixelIcons as basePixelIcons } from "./pixel-icons.generated";

export {
  type Ae2SpriteMeta,
  ae2SpriteMeta,
  type Ae2SpriteName,
} from "./ae2-sprites.generated";
export {
  type CreateSpriteMeta,
  createSpriteMeta,
  type CreateSpriteName,
  type CreateSpriteScaling,
} from "./create-sprites.generated";
export {
  type EioSpriteMeta,
  eioSpriteMeta,
  type EioSpriteName,
} from "./enderio-sprites.generated";
export {
  type FarmersDelightSpriteMeta,
  farmersDelightSpriteMeta,
  type FarmersDelightSpriteName,
} from "./farmersdelight-sprites.generated";
export { type GuiIconName, guiIcons } from "./gui-icons.generated";

export { containerSlots, type ContainerSpriteName } from "./gui-layouts.generated";

export const pixelIcons = { ...basePixelIcons, ...guiIcons } as const;

export type PixelIconName = keyof typeof pixelIcons;

export {
  GUI_SPRITE_VERSION,
  type GuiSpriteMeta,
  guiSpriteMeta,
  type GuiSpriteName,
} from "./gui-sprites.generated";

export {
  type Ic2SpriteMeta,
  ic2SpriteMeta,
  type Ic2SpriteName,
} from "./ic2-sprites.generated";
export {
  type IeSpriteMeta,
  ieSpriteMeta,
  type IeSpriteName,
  type IeSpriteScaling,
} from "./ie-sprites.generated";
export {
  type IndustrialForegoingSpriteMeta,
  industrialForegoingSpriteMeta,
  type IndustrialForegoingSpriteName,
} from "./industrialforegoing-sprites.generated";

export {
  type MekanismSpriteMeta,
  mekanismSpriteMeta,
  type MekanismSpriteName,
  type MekanismSpriteScaling,
} from "./mekanism-sprites.generated";
export {
  type ThermalSpriteMeta,
  thermalSpriteMeta,
  type ThermalSpriteName,
  type ThermalSpriteScaling,
} from "./thermal-sprites.generated";
