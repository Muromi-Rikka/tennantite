/**
 * @verdigris/textures — vanilla Minecraft GUI sprites and 26.3 item/status icons.
 */
import { guiIcons } from "./gui-icons.generated";
import { pixelIcons as basePixelIcons } from "./pixel-icons.generated";

export {
  type Ae2SpriteMeta,
  ae2SpriteMeta,
  type Ae2SpriteName,
} from "./ae2-sprites.generated";
export { type GuiIconName, guiIcons } from "./gui-icons.generated";
export { containerSlots, type ContainerSpriteName } from "./gui-layouts.generated";
export {
  GUI_SPRITE_VERSION,
  type GuiSpriteMeta,
  guiSpriteMeta,
  type GuiSpriteName,
} from "./gui-sprites.generated";

export const pixelIcons = { ...basePixelIcons, ...guiIcons } as const;

export type PixelIconName = keyof typeof pixelIcons;

export {
  type Ic2SpriteMeta,
  ic2SpriteMeta,
  type Ic2SpriteName,
} from "./ic2-sprites.generated";

export {
  type MekanismSpriteMeta,
  mekanismSpriteMeta,
  type MekanismSpriteName,
  type MekanismSpriteScaling,
} from "./mekanism-sprites.generated";
