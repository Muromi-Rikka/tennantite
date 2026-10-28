import type { MekanismSpriteName } from "@verdigris/textures";

import type {
  MekanismDataType,
  MekanismGaugeType,
  MekanismProgressType,
  MekanismSlotType,
  MekanismTabKind,
} from "./mekanism-types";

export const MEKANISM_SLOT_SIZE = 18;

export const MEKANISM_BASE_IMAGE = { height: 166, width: 176 } as const;

export const MEKANISM_GAUGE_SIZES: Record<MekanismGaugeType, { height: number; width: number }> = {
  "medium": { height: 60, width: 34 },
  "small": { height: 30, width: 18 },
  "small-med": { height: 48, width: 18 },
  "standard": { height: 60, width: 18 },
  "wide": { height: 50, width: 66 },
};

export const MEKANISM_PROGRESS_SIZES: Record<MekanismProgressType, {
  height: number;
  reverse: boolean;
  vertical: boolean;
  width: number;
}> = {
  BAR: { height: 9, reverse: false, vertical: false, width: 25 },
  BI: { height: 6, reverse: false, vertical: false, width: 16 },
  DOWN: { height: 20, reverse: false, vertical: true, width: 8 },
  FLAME: { height: 13, reverse: true, vertical: true, width: 13 },
  INSTALLING: { height: 14, reverse: false, vertical: true, width: 10 },
  LARGE_LEFT: { height: 8, reverse: true, vertical: false, width: 48 },
  LARGE_RIGHT: { height: 8, reverse: false, vertical: false, width: 48 },
  RIGHT: { height: 8, reverse: false, vertical: false, width: 32 },
  SMALL_LEFT: { height: 8, reverse: true, vertical: false, width: 28 },
  SMALL_RIGHT: { height: 8, reverse: false, vertical: false, width: 28 },
  TALL_RIGHT: { height: 15, reverse: false, vertical: true, width: 20 },
  UNINSTALLING: { height: 12, reverse: false, vertical: true, width: 12 },
};

export const MEKANISM_SLOT_SPRITES: Record<MekanismSlotType, MekanismSpriteName> = {
  "dark": "slot/dark",
  "extra": "slot/extra",
  "inner-holder": "slot/inner_holder_slot",
  "input": "slot/input",
  "input-2": "slot/input_2",
  "normal": "slot/normal",
  "output": "slot/output",
  "output-2": "slot/output_2",
  "power": "slot/power",
};

export const MEKANISM_PROGRESS_SPRITES: Record<MekanismProgressType, string> = {
  BAR: "bar",
  BI: "bidirectional",
  DOWN: "down",
  FLAME: "flame",
  INSTALLING: "installing",
  LARGE_LEFT: "large_left",
  LARGE_RIGHT: "large_right",
  RIGHT: "right",
  SMALL_LEFT: "small_left",
  SMALL_RIGHT: "small_right",
  TALL_RIGHT: "tall_right",
  UNINSTALLING: "uninstalling",
};

export const MEKANISM_GAUGE_OVERLAYS: Record<MekanismGaugeType, string> = {
  "medium": "medium",
  "small": "small",
  "small-med": "small_med",
  "standard": "standard",
  "wide": "wide",
};

export const MEKANISM_TAB_POSITIONS: Record<"left" | "right", Partial<Record<MekanismTabKind, number>>> = {
  left: {
    boiler: 6,
    config: 6,
    energy: 137,
    heat: 109,
    matrix: 6,
    sorting: 62,
    transporter: 34,
    visuals: 6,
    warning: 109,
  },
  right: {
    edit: 138,
    redstone: 137,
    security: 34,
    upgrade: 6,
    warning: 109,
  },
};

export const MEKANISM_WINDOW_POSITIONS = {
  "side-config": { height: 135, width: 156, x: (width: number) => (width - 156) / 2, y: 15 },
  "upgrade": { height: 100, width: 198, x: (width: number) => (width - 198) / 2, y: 15 },
} as const;

export const MEKANISM_SIDE_POSITIONS = {
  BACK: { left: 44, top: 92 },
  BOTTOM: { left: 67, top: 92 },
  FRONT: { left: 67, top: 69 },
  LEFT: { left: 44, top: 69 },
  RIGHT: { left: 90, top: 69 },
  TOP: { left: 67, top: 46 },
} as const;

export const MEKANISM_DATA_COLORS: Record<MekanismDataType, string> = {
  ENERGY: "#14c414",
  EXTRA: "#ffff6e",
  INPUT: "#c41414",
  INPUT_2: "#ffb319",
  INPUT_OUTPUT: "#c414c4",
  NONE: "#c4c4c4",
  OUTPUT: "#1414c4",
  OUTPUT_2: "#14c4c4",
};
