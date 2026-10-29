import type { MekanismSlotType, MekanismTransmission } from "../mekanism-types";

/**
 * 工厂档位几何（上游 `FactoryTier`）：`baseX` / `step` 决定每列输入输出槽与进度的 x，
 * `inventoryX` 是终极档 `getInventoryXOffset()` 的 26，`width` 是终极档 210。
 */
export const MEKANISM_FACTORY_TIERS = {
  advanced: { baseX: 35, inventoryX: 8, processes: 5, step: 26, width: 176 },
  basic: { baseX: 55, inventoryX: 8, processes: 3, step: 38, width: 176 },
  elite: { baseX: 29, inventoryX: 8, processes: 7, step: 19, width: 176 },
  ultimate: { baseX: 27, inventoryX: 26, processes: 9, step: 19, width: 210 },
} as const;

export type MekanismFactoryTier = keyof typeof MEKANISM_FACTORY_TIERS;

export const MEKANISM_FACTORY_TIER_NAMES: Record<MekanismFactoryTier, string> = {
  advanced: "高级",
  basic: "基础",
  elite: "精英",
  ultimate: "终极",
};

/**
 * 工厂类型（上游 `FactoryType`）：`chemicalBar` = `hasSecondaryResourceBar()`，
 * `extraSlot` = 额外输入槽（融合 / 压缩 / 灌注 / 压射 / 提纯），`secondOutput` = 锯木第二输出行。
 */
export const MEKANISM_FACTORY_TYPES = {
  combining: { chemicalBar: false, extraSlot: true, name: "融合", secondOutput: false },
  compressing: { chemicalBar: true, extraSlot: true, name: "压缩", secondOutput: false },
  crushing: { chemicalBar: false, extraSlot: false, name: "粉碎", secondOutput: false },
  enriching: { chemicalBar: false, extraSlot: false, name: "富集", secondOutput: false },
  infusing: { chemicalBar: true, extraSlot: true, name: "灌注", secondOutput: false },
  injecting: { chemicalBar: true, extraSlot: true, name: "压射", secondOutput: false },
  purifying: { chemicalBar: true, extraSlot: true, name: "提纯", secondOutput: false },
  sawing: { chemicalBar: false, extraSlot: false, name: "锯木", secondOutput: true },
  smelting: { chemicalBar: false, extraSlot: false, name: "熔炼", secondOutput: false },
} as const;

export interface MekanismFactoryLayout {
  chemical?: { height: number; left: number; top: number; width: number };
  dump?: { height: number; left: number; top: number; width: number };
  height: number;
  inventoryLabel: { x: number; y: number };
  player: { hotbarY: number; x: number; y: number };
  power: { height: number; left: number; top: number };
  progress: MekanismFactoryProgress[];
  slots: Record<string, MekanismFactorySlot>;
  title: string;
  transmissions: MekanismTransmission[];
  width: number;
}

export interface MekanismFactoryProgress {
  left: number;
  role: string;
  top: number;
  type: "DOWN";
}

export interface MekanismFactorySlot {
  left: number;
  top: number;
  type: MekanismSlotType;
}

export type MekanismFactoryType = keyof typeof MEKANISM_FACTORY_TYPES;

/**
 * 按工厂类型与档位派生整屏几何（槽框 = 容器 `slot - 1`）。
 *
 * 上游依据：`GuiFactory`（尺寸 / 进度列 / 化学条 / 倾倒按钮）、
 * `TileEntityItemToItemFactory`（`baseX + i * mult` 槽列）、
 * `FactoryContainer`（`getInventoryYOffset` / `getInventoryXOffset`）。
 */
export function mekanismFactoryLayout(
  factory: MekanismFactoryType,
  tier: MekanismFactoryTier,
): MekanismFactoryLayout {
  const type = MEKANISM_FACTORY_TYPES[factory];
  const metrics = MEKANISM_FACTORY_TIERS[tier];
  const height = type.chemicalBar ? 177 : (type.secondOutput ? 187 : 166);
  const playerY = type.chemicalBar ? 95 : (type.secondOutput ? 105 : 85);

  const slots: Record<string, MekanismFactorySlot> = {
    energy: { left: 6, top: 12, type: "power" },
  };
  if (type.extraSlot) {
    slots.extra = { left: 6, top: 56, type: "extra" };
  }

  const progress: MekanismFactoryProgress[] = [];
  for (let index = 0; index < metrics.processes; index += 1) {
    const x = metrics.baseX + index * metrics.step;
    slots[`input-${index}`] = { left: x - 1, top: 12, type: "input" };
    slots[`output-${index}`] = { left: x - 1, top: 56, type: "output" };
    if (type.secondOutput) {
      slots[`secondary-output-${index}`] = { left: x - 1, top: 76, type: "output" };
    }
    progress.push({
      left: 4 + metrics.baseX + index * metrics.step,
      role: `process-${index}`,
      top: 33,
      type: "DOWN",
    });
  }

  const chemical = type.chemicalBar
    ? { height: 4, left: 7, top: 76, width: tier === "ultimate" ? 172 : 138 }
    : undefined;

  return {
    chemical,
    dump: type.chemicalBar
      ? { height: 10, left: tier === "ultimate" ? 182 : 148, top: 76, width: 21 }
      : undefined,
    height,
    inventoryLabel: { x: metrics.inventoryX, y: playerY - 10 },
    player: { hotbarY: playerY + 58, x: metrics.inventoryX, y: playerY },
    power: { height: type.secondOutput ? 73 : 52, left: metrics.width - 12, top: 16 },
    progress,
    slots,
    title: `${MEKANISM_FACTORY_TIER_NAMES[tier] + type.name}工厂`,
    transmissions: type.chemicalBar ? ["energy", "item", "chemical"] : ["energy", "item"],
    width: metrics.width,
  };
}
