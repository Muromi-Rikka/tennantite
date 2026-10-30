import type { ScreenSlot } from "@tennantite/ui";

import { ScreenItemSlot } from "@tennantite/ui";

import { IeFluidTank } from "../ie-fluid-tank/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "./index";

const slotItems: Record<string, ScreenSlot | undefined> = {
  "coke-oven-bucket-output": { count: 1, icon: "potion", tooltip: "杂酚油桶" },
  "coke-oven-fluid-container": { count: 1, icon: "potion", tooltip: "空桶" },
  "coke-oven-input": { count: 8, icon: "oak-log", tooltip: "橡木原木 ×8" },
  "coke-oven-output": { count: 1, icon: "charcoal", tooltip: "木炭" },
};

/**
 * IeMachineScreen 预览用例：以焦炉布局表驱动背景 / 标题 / 背包标签 /
 * 玩家背包，槽位与液体罐由子组件注入。
 */
export function IeMachineScreenDemo() {
  const layout = IE_MACHINES.cokeOven;
  return (
    <IeMachineScreen
      background={layout.background}
      height={layout.height}
      inventoryLabelTop={layout.inventoryLabelTop}
      player={layout.player}
      title={layout.title}
      width={layout.width}
    >
      <IeFluidTank
        height={layout.tank.fill.height}
        label="焦炉木焦油罐"
        left={layout.tank.fill.left}
        max={8000}
        overlayName={layout.tank.overlayName}
        tint="#6e5530"
        top={layout.tank.fill.top}
        value={250}
        width={layout.tank.fill.width}
      />
      {ieExpandSlots(layout).map(slot => (
        <ScreenItemSlot
          item={slotItems[slot.label]}
          key={slot.label}
          label={slot.label}
          left={slot.left}
          top={slot.top}
        />
      ))}
    </IeMachineScreen>
  );
}
