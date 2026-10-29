/**
 * 磨石 / 粉碎机容器坐标（1 GUI px = 1 源 px）。
 *
 * Create 1.21.1 的磨石与粉碎机没有上游 Screen 类（方块无 GUI，槽位由
 * MillstoneBlockEntity / CrushingWheelControllerBlockEntity 直接交互），此处按
 * MekanismMachineLayout 的数据驱动模式给出共用的原版风格容器布局：
 * 顶部输入槽 → 竖向进度（JEI milling/crushing 类别的向下箭头方向）→ 输出槽，
 * 底部玩家背包。机器键可继续扩展。
 */
export type CreateMachineKind = "crusher" | "millstone";

export interface CreateMachineLayout {
  height: number;
  input: { left: number; top: number };
  output: { left: number; top: number };
  progress: { height: number; left: number; top: number; width: number };
  title: string;
  width: number;
}

const SHAPE = {
  height: 166,
  input: { left: 80, top: 14 },
  output: { left: 80, top: 62 },
  progress: { height: 24, left: 84, top: 36, width: 8 },
  width: 176,
} as const;

export const CREATE_MACHINE_LAYOUT = {
  crusher: {
    ...SHAPE,
    title: "Crusher",
  },
  millstone: {
    ...SHAPE,
    title: "Millstone",
  },
} satisfies Record<CreateMachineKind, CreateMachineLayout>;

export type CreateMachineName = keyof typeof CREATE_MACHINE_LAYOUT;
