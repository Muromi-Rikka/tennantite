/**
 * @verdigris/textures — vanilla Minecraft GUI sprites and 26.3 item/status icons.
 */
import { guiIcons } from "./gui-icons.generated";
import { pixelIcons as basePixelIcons } from "./pixel-icons.generated";

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
