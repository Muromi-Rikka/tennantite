import { describe, expect, it } from "vitest";

import type { MekanismFactoryType } from "./mekanism-factory-layout";
import {
  MEKANISM_FACTORY_TIER_NAMES,
  MEKANISM_FACTORY_TIERS,
  MEKANISM_FACTORY_TYPES,
  mekanismFactoryLayout,
} from "./mekanism-factory-layout";

const FACTORY_TYPES: MekanismFactoryType[] = [
  "combining",
  "compressing",
  "crushing",
  "enriching",
  "infusing",
  "injecting",
  "purifying",
  "sawing",
  "smelting",
];

/**
 * 独立期望表：值为上游 `FactoryTier` 的 baseX / mult 与 `FactoryContainer` 的背包偏移。
 */
const EXPECTED_TIERS = {
  advanced: { baseX: 35, inventoryX: 8, processes: 5, step: 26, width: 176 },
  basic: { baseX: 55, inventoryX: 8, processes: 3, step: 38, width: 176 },
  elite: { baseX: 29, inventoryX: 8, processes: 7, step: 19, width: 176 },
  ultimate: { baseX: 27, inventoryX: 26, processes: 9, step: 19, width: 210 },
} as const;

describe("mekanism factory layouts", () => {
  it("defines four tiers with upstream process counts and geometry", () => {
    expect(MEKANISM_FACTORY_TIERS).toEqual(EXPECTED_TIERS);
    expect(MEKANISM_FACTORY_TIER_NAMES).toEqual({
      advanced: "高级",
      basic: "基础",
      elite: "精英",
      ultimate: "终极",
    });
    expect(Object.keys(MEKANISM_FACTORY_TYPES)).toEqual(FACTORY_TYPES);
  });

  it("derives the basic enriching factory", () => {
    const layout = mekanismFactoryLayout("enriching", "basic");
    expect(layout).toMatchObject({
      height: 166,
      inventoryLabel: { x: 8, y: 75 },
      player: { hotbarY: 143, x: 8, y: 85 },
      power: { height: 52, left: 164, top: 16 },
      title: "基础富集工厂",
      transmissions: ["energy", "item"],
      width: 176,
    });
    expect(layout.chemical).toBeUndefined();
    expect(layout.dump).toBeUndefined();
    expect(layout.slots.energy).toEqual({ left: 6, top: 12, type: "power" });
    expect([0, 1, 2].map(index => layout.slots[`input-${index}`]?.left)).toEqual([54, 92, 130]);
    expect([0, 1, 2].map(index => (layout.slots[`input-${index}`]?.top ?? 0) + 1)).toEqual([13, 13, 13]);
    expect([0, 1, 2].map(index => (layout.slots[`input-${index}`]?.left ?? 0) + 1)).toEqual([55, 93, 131]);
    expect([0, 1, 2].map(index => layout.slots[`output-${index}`]?.top)).toEqual([56, 56, 56]);
    expect(layout.slots["secondary-output-0"]).toBeUndefined();
    expect(layout.progress.map(bar => bar.left)).toEqual([59, 97, 135]);
    expect(layout.progress.every(bar => bar.top === 33 && bar.type === "DOWN")).toBe(true);
    expect(layout.progress.map(bar => bar.role)).toEqual(["process-0", "process-1", "process-2"]);
  });

  it("derives the ultimate enriching factory", () => {
    const layout = mekanismFactoryLayout("enriching", "ultimate");
    expect(layout.width).toBe(210);
    expect(layout.player.x).toBe(26);
    expect(layout.inventoryLabel).toEqual({ x: 26, y: 75 });
    expect(layout.power).toEqual({ height: 52, left: 198, top: 16 });
    expect(layout.progress).toHaveLength(9);
    expect(layout.progress.map(bar => bar.left)).toEqual([31, 50, 69, 88, 107, 126, 145, 164, 183]);
    expect(Array.from({ length: 9 }, (_, index) => (layout.slots[`input-${index}`]?.left ?? 0) + 1))
      .toEqual([27, 46, 65, 84, 103, 122, 141, 160, 179]);
    expect(layout.title).toBe("终极富集工厂");
  });

  it("adds the chemical bar, dump button and extra slot", () => {
    const basic = mekanismFactoryLayout("injecting", "basic");
    expect(basic.height).toBe(177);
    expect(basic.player).toEqual({ hotbarY: 153, x: 8, y: 95 });
    expect(basic.slots.extra).toEqual({ left: 6, top: 56, type: "extra" });
    expect(basic.chemical).toEqual({ height: 4, left: 7, top: 76, width: 138 });
    expect(basic.dump).toEqual({ height: 10, left: 148, top: 76, width: 21 });
    expect(basic.transmissions).toEqual(["energy", "item", "chemical"]);

    const ultimate = mekanismFactoryLayout("injecting", "ultimate");
    expect(ultimate.chemical?.width).toBe(172);
    expect(ultimate.dump?.left).toBe(182);
  });

  it("adds the second output row for sawing factories", () => {
    const layout = mekanismFactoryLayout("sawing", "basic");
    expect(layout.height).toBe(187);
    expect(layout.player.y).toBe(105);
    expect(layout.power.height).toBe(73);
    expect([0, 1, 2].map(index => layout.slots[`secondary-output-${index}`]?.top)).toEqual([76, 76, 76]);
    expect(layout.chemical).toBeUndefined();
  });

  it("gives combining factories an extra slot but no chemical bar", () => {
    const layout = mekanismFactoryLayout("combining", "elite");
    expect(layout.height).toBe(166);
    expect(layout.slots.extra).toBeDefined();
    expect(layout.chemical).toBeUndefined();
    expect(layout.title).toBe("精英融合工厂");
  });

  it("keeps item factories free of chemical or secondary slots", () => {
    for (const factory of ["crushing", "smelting"] as MekanismFactoryType[]) {
      const layout = mekanismFactoryLayout(factory, "advanced");
      expect(layout.slots.extra).toBeUndefined();
      expect(layout.slots["secondary-output-0"]).toBeUndefined();
      expect(layout.chemical).toBeUndefined();
      expect(layout.slots["input-0"]).toBeDefined();
      expect(!layout.slots["input-4"]).toBe(false);
      expect(layout.slots["input-5"]).toBeUndefined();
    }
  });
});
