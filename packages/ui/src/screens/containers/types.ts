import type { PixelIconName } from "@verdigris/textures";

/**
 * 槽位区域标识（onSlotClick 回调用）
*/
export type ScreenArea
  = | "armor"
    | "craft"
    | "craft-result"
    | "hotbar"
    | "input"
    | "main"
    | "output"
    | "secondary";

/**
 * 容器界面的槽位数据（由使用方注入，库不含任何游戏逻辑，规格 §0.2 / §8.2）
*/
export interface ScreenItem {
  count?: number;
  icon?: PixelIconName;
  src?: string;
  tooltip?: string;
}

export type ScreenSlot = null | ScreenItem | undefined;

export interface SlotClickDetails {
  area: ScreenArea;
  index: number;
}

/**
 * 固定长度槽位数组补齐
*/
export function padSlots(slots: ScreenSlot[], length: number): ScreenSlot[] {
  const result = slots.slice(0, length);
  while (result.length < length) {
    result.push(null);
  }
  return result;
}
