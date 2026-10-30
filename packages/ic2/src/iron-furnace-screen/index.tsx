import type { ScreenSlot } from "@tennantite/ui";
import { ScreenItemSlot } from "@tennantite/ui";
import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { IC2_MACHINE } from "../ic2-layout";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type IronFurnaceScreenProps = {
  /**
   * 燃料槽（`guidef/iron_furnace.xml` slot `fuel`，与通用布局放电槽同位）
   */
  fuel?: ScreenSlot;
} & Omit<
  Ic2MachineScreenProps,
  "children" | "discharge" | "hideDischarge" | "progressStyle"
>;

/**
 * 铁炉界面（1.12.2 原版贴图，`guidef/iron_furnace.xml`）：IC2 通用机器布局，
 * 放电槽位改为燃料槽、无 EU 能量表；上方燃料计与经验药水按钮贴图未同步，省略。
 */
export function IronFurnaceScreen({ fuel, ...properties }: IronFurnaceScreenProps) {
  return (
    <Ic2MachineScreen hideDischarge progressStyle="arrow" {...properties}>
      <ScreenItemSlot
        frame
        frameClassName="mc-tex-ic2-slot"
        item={fuel}
        label="machine-fuel"
        left={IC2_MACHINE.slots.discharge.left}
        top={IC2_MACHINE.slots.discharge.top}
      />
    </Ic2MachineScreen>
  );
}
