import type { EioSpriteName } from "@tennantite/textures";

import type { EioAlloySmelterMode, EioRedstoneControl } from "./eio-machine-layout";
import { EIO_ALLOY_MODE_ORDER, EIO_REDSTONE_ORDER } from "./eio-machine-layout";

export const EIO_REDSTONE_LABELS: Record<EioRedstoneControl, string> = {
  active_with_signal: "有信号激活",
  active_without_signal: "无信号激活",
  always_active: "始终激活",
  never_active: "从不激活",
};

export const EIO_ALLOY_MODE_LABELS: Record<EioAlloySmelterMode, string> = {
  all: "全部",
  alloys: "仅合金",
  furnace: "仅熔炼",
};

const REDSTONE_ICONS = {
  active_with_signal: "sprites/icon/redstone_control/active_with_signal",
  active_without_signal: "sprites/icon/redstone_control/active_without_signal",
  always_active: "sprites/icon/redstone_control/always_active",
  never_active: "sprites/icon/redstone_control/never_active",
} satisfies Record<EioRedstoneControl, EioSpriteName>;

const ALLOY_MODE_ICONS = {
  all: "sprites/icon/alloy_smelter_mode/all",
  alloys: "sprites/icon/alloy_smelter_mode/alloys",
  furnace: "sprites/icon/alloy_smelter_mode/furnace",
} satisfies Record<EioAlloySmelterMode, EioSpriteName>;

export function eioAlloyModeIcon(mode: EioAlloySmelterMode): EioSpriteName {
  return ALLOY_MODE_ICONS[mode];
}

export function eioNextAlloyMode(mode: EioAlloySmelterMode): EioAlloySmelterMode {
  const index = EIO_ALLOY_MODE_ORDER.indexOf(mode);
  return EIO_ALLOY_MODE_ORDER[(index + 1) % EIO_ALLOY_MODE_ORDER.length] ?? "all";
}

export function eioNextRedstone(control: EioRedstoneControl): EioRedstoneControl {
  const index = EIO_REDSTONE_ORDER.indexOf(control);
  return EIO_REDSTONE_ORDER[(index + 1) % EIO_REDSTONE_ORDER.length] ?? "always_active";
}

export function eioRedstoneIcon(control: EioRedstoneControl): EioSpriteName {
  return REDSTONE_ICONS[control];
}
