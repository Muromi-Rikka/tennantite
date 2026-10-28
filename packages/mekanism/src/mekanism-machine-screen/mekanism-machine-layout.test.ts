import { describe, expect, it } from "vitest";

import type { MekanismMachineLayout } from "./mekanism-machine-layout";
import { MEKANISM_MACHINES } from "./mekanism-machine-layout";
import {
  MEKANISM_BASE_IMAGE,
  MEKANISM_GAUGE_SIZES,
  MEKANISM_PROGRESS_SIZES,
  MEKANISM_WINDOW_POSITIONS,
} from "../mekanism-metrics";

/**
 * 独立期望表：值为上游容器槽位（slot.x / slot.y），不是布局表的复制。
 * 布局存槽框左上角，因此断言时 +1。
 */
const EXPECTED: Record<keyof typeof MEKANISM_MACHINES, Record<string, { x: number; y: number }>> = {
  "antiprotonic-nucleosynthesizer": { gas: { x: 6, y: 69 }, output: { x: 152, y: 40 } },
  "chemical-crystallizer": { input: { x: 8, y: 65 }, output: { x: 129, y: 57 } },
  "chemical-dissolution-chamber": { gas: { x: 8, y: 65 }, output: { x: 152, y: 55 } },
  "chemical-infuser": { left: { x: 6, y: 56 }, right: { x: 154, y: 56 } },
  "chemical-injection-chamber": { input: { x: 64, y: 17 }, secondary: { x: 64, y: 53 } },
  "chemical-oxidizer": { input: { x: 26, y: 36 }, output: { x: 152, y: 55 } },
  "chemical-washer": { fluid: { x: 180, y: 71 }, slurryOut: { x: 152, y: 56 } },
  "combiner": { extra: { x: 64, y: 53 }, main: { x: 64, y: 17 } },
  "crusher": { input: { x: 64, y: 17 }, output: { x: 116, y: 35 } },
  "electrolytic-separator": { fluid: { x: 26, y: 35 }, leftOut: { x: 59, y: 52 } },
  "energized-smelter": { input: { x: 64, y: 17 }, output: { x: 116, y: 35 } },
  "enrichment-chamber": { input: { x: 64, y: 17 }, output: { x: 116, y: 35 } },
  "formulaic-assemblicator": { energy: { x: 152, y: 76 }, formula: { x: 6, y: 26 } },
  "isotopic-centrifuge": { input: { x: 5, y: 56 }, output: { x: 155, y: 56 } },
  "metallurgic-infuser": { infusion: { x: 17, y: 35 }, input: { x: 51, y: 43 } },
  "nutritional-liquifier": { fluidOut: { x: 155, y: 56 }, input: { x: 26, y: 36 } },
  "osmium-compressor": { input: { x: 64, y: 17 }, output: { x: 116, y: 35 } },
  "painting-machine": { input: { x: 45, y: 35 }, pigment: { x: 6, y: 56 } },
  "pigment-extractor": { input: { x: 26, y: 36 }, output: { x: 152, y: 55 } },
  "pigment-mixer": { left: { x: 6, y: 56 }, output: { x: 80, y: 65 } },
  "precision-sawmill": { input: { x: 56, y: 17 }, secondary: { x: 132, y: 35 } },
  "pressurized-reaction-chamber": { input: { x: 54, y: 40 }, output: { x: 116, y: 40 } },
  "purification-chamber": { input: { x: 64, y: 17 }, secondary: { x: 64, y: 53 } },
  "resistive-heater": { energy: { x: 15, y: 35 } },
  "rotary-condensentrator": { fluidOut: { x: 155, y: 56 }, gasIn: { x: 5, y: 25 } },
  "solar-neutron-activator": { input: { x: 5, y: 56 }, output: { x: 155, y: 56 } },
};

describe("mekanism machine layouts", () => {
  it("defines 26 machines and the base panel", () => {
    expect(Object.keys(MEKANISM_MACHINES)).toHaveLength(26);
    expect(MEKANISM_BASE_IMAGE).toEqual({ height: 166, width: 176 });
  });

  it("matches upstream container slot coordinates for every machine", () => {
    for (const [machine, slots] of Object.entries(EXPECTED)) {
      const layout: MekanismMachineLayout = MEKANISM_MACHINES[machine as keyof typeof MEKANISM_MACHINES];
      for (const [role, expected] of Object.entries(slots)) {
        const slot = layout.slots[role];
        expect(slot, `${machine}.${role}`).toBeDefined();
        if (!slot) {
          throw new Error(`missing slot ${machine}.${role}`);
        }
        expect({ left: slot.left + 1, top: slot.top + 1 }, `${machine}.${role}`).toEqual({ left: expected.x, top: expected.y });
      }
    }
  });

  it("uses upstream gauge and progress sizes", () => {
    expect(MEKANISM_GAUGE_SIZES.standard).toEqual({ height: 60, width: 18 });
    expect(MEKANISM_GAUGE_SIZES.small).toEqual({ height: 30, width: 18 });
    expect(MEKANISM_GAUGE_SIZES["small-med"]).toEqual({ height: 48, width: 18 });
    expect(MEKANISM_GAUGE_SIZES.medium).toEqual({ height: 60, width: 34 });
    expect(MEKANISM_GAUGE_SIZES.wide).toEqual({ height: 50, width: 66 });
    expect(MEKANISM_PROGRESS_SIZES.LARGE_LEFT.reverse).toBe(true);
    expect(MEKANISM_PROGRESS_SIZES.TALL_RIGHT.vertical).toBe(true);
    expect(MEKANISM_PROGRESS_SIZES.BI).toMatchObject({ height: 6, width: 16 });
  });

  it("centers the side config and upgrade windows", () => {
    expect(MEKANISM_WINDOW_POSITIONS["side-config"]).toMatchObject({ height: 135, width: 156 });
    expect(MEKANISM_WINDOW_POSITIONS.upgrade).toMatchObject({ height: 100, width: 198 });
    expect(MEKANISM_WINDOW_POSITIONS["side-config"].x(176)).toBe(10);
    expect(MEKANISM_WINDOW_POSITIONS.upgrade.x(176)).toBe(-11);
  });

  it("keeps taller and wider machine canvases", () => {
    expect(MEKANISM_MACHINES["pressurized-reaction-chamber"].height).toBe(171);
    expect(MEKANISM_MACHINES["formulaic-assemblicator"].height).toBe(230);
    expect(MEKANISM_MACHINES["antiprotonic-nucleosynthesizer"]).toMatchObject({ height: 193, width: 196 });
  });
});
