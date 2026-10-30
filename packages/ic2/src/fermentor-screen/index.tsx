import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type FermentorScreenProps = Omit<Ic2MachineScreenProps, "progressStyle">;

/**
 * 发酵机界面（1.12.2 原版贴图）：IC2 通用机器布局 + 熔炼箭头进度；
 * 上游无 `guidef/fermentor.xml`（贴图 `guifermenter.png` 未同步），
 * 槽位沿用通用机器布局。
 */
export function FermentorScreen(properties: FermentorScreenProps) {
  return <Ic2MachineScreen progressStyle="arrow" {...properties} />;
}
