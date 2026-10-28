/**
 * IC2（IndustrialCraft 2 Experimental 2.8.99-ex112 / Minecraft 1.12.2）界面布局。
 *
 * 数值取自 `assets/ic2/guidef/*.xml` 与反编译的
 * `GuiDefaultBackground`、`ContainerStandardMachine`、`GuiElectricBlock`、
 * `ContainerElectricBlock`；槽框坐标 = 容器槽位 - `IC2_SLOT_ITEM_OFFSET`。
 */
export const IC2_SLOT_ITEM_OFFSET = { large: 5, normal: 1 } as const;

export const IC2_MACHINE = {
  energy: { left: 59, top: 37, variant: "bolt" },
  height: 166,
  info: { left: 3, top: 3 },
  inventory: { hotbarTop: 141, left: 7, nameLeft: 8, nameTop: 73, top: 83 },
  progress: {
    arrow: { left: 80, top: 35 },
    crush: { left: 80, top: 38 },
    drop: { left: 80, top: 35 },
    triangle: { left: 80, top: 35 },
  },
  slots: {
    discharge: { left: 55, top: 52 },
    input: { left: 55, top: 16 },
    output: { left: 111, size: 26, top: 30 },
    upgrades: { count: 4, left: 151, step: 18, top: 7 },
  },
  width: 176,
} as const;

export const IC2_BATBOX = {
  button: { left: 152, top: 4 },
  energy: { left: 79, top: 38, variant: "bar" },
  height: 196,
  inventory: { hotbarTop: 171, left: 7, top: 113 },
  labels: {
    armor: { left: 8, top: 73 },
    capacity: { left: 110, top: 45 },
    level: { left: 79, top: 25 },
    output: { left: 85, top: 60 },
    value: { left: 110, top: 35 },
  },
  slots: {
    armor: {
      count: 4,
      ghosts: [
        "mc-tex-ic2-armor-boots",
        "mc-tex-ic2-armor-leggings",
        "mc-tex-ic2-armor-chestplate",
        "mc-tex-ic2-armor-helmet",
      ],
      left: 7,
      step: 18,
      top: 83,
    },
    charge: { left: 55, top: 16 },
    discharge: { left: 55, top: 52 },
  },
  width: 176,
} as const;
