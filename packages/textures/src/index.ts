import type { BlockIconName } from "./block-icons.generated";
/**
 * @tennantite/textures — vanilla Minecraft GUI sprites and 26.3 item/status icons.
 */
import { blockFaces } from "./block-icons.generated";
import { guiIcons } from "./gui-icons.generated";
import { pixelIcons as basePixelIcons } from "./pixel-icons.generated";

export {
  type Ae2SpriteMeta,
  ae2SpriteMeta,
  type Ae2SpriteName,
} from "./ae2-sprites.generated";
export {
  blockFaces,
  type BlockIconName,
} from "./block-icons.generated";
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

/**
 * 平面图标（item / HUD 精灵）——方块名不在此表
*/
export const pixelIcons = { ...basePixelIcons, ...guiIcons } as const;

export type FlatIconName = keyof typeof pixelIcons;

/**
 * 全部原版图标名：平面精灵 + 等轴方块
*/
export type PixelIconName = BlockIconName | FlatIconName;

/**
 * 方块名判定：真值即该名走等轴立方体渲染
*/
export function isBlockIconName(name: PixelIconName): name is BlockIconName {
  return Object.hasOwn(blockFaces, name);
}

/**
 * 全部图标名（字母序），供文档图标墙与 playground 枚举
*/
export const iconNames: PixelIconName[] = (
  [...Object.keys(pixelIcons), ...Object.keys(blockFaces)] as PixelIconName[]
).toSorted((left, right) => left.localeCompare(right));

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
