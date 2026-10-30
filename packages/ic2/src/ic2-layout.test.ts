import { ic2SpriteMeta } from "@tennantite/textures";
import { expect, it } from "vitest";

import {
  IC2_BATBOX,
  IC2_BLAST_FURNACE,
  IC2_INDUSTRIAL_FURNACE,
  IC2_MACHINE,
  IC2_SLOT_ITEM_OFFSET,
} from "./ic2-layout";

it("机器槽框 + 物品偏移等于 IC2 容器槽位", () => {
  expect(IC2_MACHINE.slots.input.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(56);
  expect(IC2_MACHINE.slots.input.top + IC2_SLOT_ITEM_OFFSET.normal).toBe(17);
  expect(IC2_MACHINE.slots.discharge.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(56);
  expect(IC2_MACHINE.slots.discharge.top + IC2_SLOT_ITEM_OFFSET.normal).toBe(53);
  expect(IC2_MACHINE.slots.output.left + IC2_SLOT_ITEM_OFFSET.large).toBe(116);
  expect(IC2_MACHINE.slots.output.top + IC2_SLOT_ITEM_OFFSET.large).toBe(35);
  expect(IC2_MACHINE.slots.upgrades.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(152);
  expect(IC2_MACHINE.slots.upgrades.top + IC2_SLOT_ITEM_OFFSET.normal).toBe(8);
  expect(IC2_MACHINE.inventory.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(8);
  expect(IC2_MACHINE.inventory.top + IC2_SLOT_ITEM_OFFSET.normal).toBe(84);
  expect(IC2_MACHINE.inventory.hotbarTop + IC2_SLOT_ITEM_OFFSET.normal).toBe(142);
});

it("batBox 槽框 + 物品偏移等于 IC2 容器槽位", () => {
  expect(IC2_BATBOX.slots.charge.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(56);
  expect(IC2_BATBOX.slots.charge.top + IC2_SLOT_ITEM_OFFSET.normal).toBe(17);
  expect(IC2_BATBOX.slots.discharge.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(56);
  expect(IC2_BATBOX.slots.discharge.top + IC2_SLOT_ITEM_OFFSET.normal).toBe(53);
  expect(IC2_BATBOX.slots.armor.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(8);
  expect(IC2_BATBOX.slots.armor.top + IC2_SLOT_ITEM_OFFSET.normal).toBe(84);
  expect(IC2_BATBOX.inventory.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(8);
  expect(IC2_BATBOX.inventory.top + IC2_SLOT_ITEM_OFFSET.normal).toBe(114);
  expect(IC2_BATBOX.inventory.hotbarTop + IC2_SLOT_ITEM_OFFSET.normal).toBe(172);
});

it("inductionFurnace 槽框 + 物品偏移等于 IC2 容器槽位", () => {
  expect(IC2_INDUSTRIAL_FURNACE.slots.inputA.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(44);
  expect(IC2_INDUSTRIAL_FURNACE.slots.inputB.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(60);
  expect(IC2_INDUSTRIAL_FURNACE.slots.outputA.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(114);
  expect(IC2_INDUSTRIAL_FURNACE.slots.outputB.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(130);
  expect(IC2_INDUSTRIAL_FURNACE.slots.discharge.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(51);
  expect(IC2_INDUSTRIAL_FURNACE.slots.discharge.top + IC2_SLOT_ITEM_OFFSET.normal).toBe(53);
  expect(IC2_INDUSTRIAL_FURNACE.inventory.hotbarTop + IC2_SLOT_ITEM_OFFSET.normal).toBe(142);
});

it("blastFurnace 槽框 + 物品偏移等于 IC2 容器槽位", () => {
  expect(IC2_BLAST_FURNACE.slots.input.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(56);
  expect(IC2_BLAST_FURNACE.slots.input.top + IC2_SLOT_ITEM_OFFSET.normal).toBe(25);
  expect(IC2_BLAST_FURNACE.slots.outputs.top + IC2_SLOT_ITEM_OFFSET.normal).toBe(25);
  expect(IC2_BLAST_FURNACE.slots.cellInput.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(8);
  expect(IC2_BLAST_FURNACE.slots.cellOutput.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(26);
  expect(IC2_BLAST_FURNACE.slots.fluid.left + IC2_SLOT_ITEM_OFFSET.normal).toBe(56);
  expect(IC2_BLAST_FURNACE.inventory.hotbarTop + IC2_SLOT_ITEM_OFFSET.normal).toBe(142);
});

it("生成贴图尺寸", () => {
  expect(ic2SpriteMeta.machineBackground).toMatchObject({ height: 166, width: 176 });
  expect(ic2SpriteMeta.electricBlock).toMatchObject({ height: 196, width: 176 });
  expect(ic2SpriteMeta.common).toMatchObject({ height: 256, width: 256 });
});
