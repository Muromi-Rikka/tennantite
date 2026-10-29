import type { IfButtonKind } from "./if-machine-layout";
import type { IfCropKey } from "./if-metrics";

/**
 * 上游 `RedstoneAction` 顺序：IGNORE → NO_REDSTONE → WITH_REDSTONE → ONCE。
 */
export type IfRedstoneMode = "ignore" | "no_redstone" | "once" | "with_redstone";

export const IF_REDSTONE_ORDER = ["ignore", "no_redstone", "with_redstone", "once"] as const;

export const IF_REDSTONE_LABELS: Record<IfRedstoneMode, string> = {
  ignore: "忽略",
  no_redstone: "无红石",
  once: "单次",
  with_redstone: "有红石",
};

const REDSTONE_CROPS = {
  ignore: "redstoneIgnored",
  no_redstone: "redstoneNo",
  once: "redstoneOnce",
  with_redstone: "redstoneYes",
} as const satisfies Record<IfRedstoneMode, IfCropKey>;

/**
 * 按钮状态 → 图集裁剪（`buttons` 为状态索引；`lock` 由 `isLocked` 决定）。
 */
export function ifButtonCrop(kind: IfButtonKind, state = 0, isLocked = false): IfCropKey {
  switch (kind) {
    case "baby-mode":
    case "recipe": {
      return "itemBackground";
    }
    case "dye-next": {
      return "arrowRight";
    }
    case "dye-prev": {
      return "arrowLeft";
    }
    case "enchant-extract":
    case "mob-crusher": {
      return state === 1 ? "sideDisabled" : "sideEnabled";
    }
    case "ferm-production": {
      return (["fermProc2", "fermProc3", "fermProc4", "fermProc5"] as const)[state] ?? "fermProc2";
    }
    case "ferm-seal": {
      return (["fermTankFull", "fermTankHalf", "fermTankOne"] as const)[state] ?? "fermTankFull";
    }
    case "lock": {
      return isLocked ? "lockLocked" : "lockUnlocked";
    }
    default: {
      return "itemBackground";
    }
  }
}

export function ifNextRedstone(mode: IfRedstoneMode): IfRedstoneMode {
  const index = IF_REDSTONE_ORDER.indexOf(mode);
  return IF_REDSTONE_ORDER[(index + 1) % IF_REDSTONE_ORDER.length] ?? "ignore";
}

export function ifRedstoneCrop(mode: IfRedstoneMode): IfCropKey {
  return REDSTONE_CROPS[mode];
}
