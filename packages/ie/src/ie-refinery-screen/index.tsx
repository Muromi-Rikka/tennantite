import type { ScreenSlot } from "@tennantite/ui";

import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeFluidTank } from "../ie-fluid-tank/index";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";

export interface IeRefineryScreenProps {
  bucketOutput?: ScreenSlot;
  catalyst?: ScreenSlot;
  className?: string;
  energy?: { max: number; value: number };
  /**
   * 流体容器输入槽（空桶）
   */
  fluidContainer?: ScreenSlot;
  onSlotClick?: (label: string) => void;
  /**
   * 三罐注入（左输入 / 右输入 / 输出，按布局表顺序）
   */
  tanks?: Array<null | { max: number; tint: string; value: number }>;
}

/**
 * 精炼厂（RefineryScreen）：催化剂槽 + 流体桶槽位 + 左/右输入与输出三罐
 * （FluidInfoArea 16×47）+ 竖向能量条。
 */
export function IeRefineryScreen({
  bucketOutput,
  catalyst,
  className,
  energy,
  fluidContainer,
  onSlotClick,
  tanks = [],
}: IeRefineryScreenProps) {
  const layout = IE_MACHINES.refinery;
  const slotItems: Record<string, ScreenSlot | undefined> = {
    "refinery-bucket-output": bucketOutput,
    "refinery-catalyst": catalyst,
    "refinery-fluid-container": fluidContainer,
  };
  return (
    <IeMachineScreen
      background={layout.background}
      className={className}
      height={layout.height}
      inventoryLabelTop={layout.inventoryLabelTop}
      player={layout.player}
      title={layout.title}
      width={layout.width}
    >
      {energy
        ? (
            <IeEnergyBar
              label="精炼厂能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
            />
          )
        : null}
      {layout.tanks.map((area, index) => {
        const tank = tanks[index];
        return tank
          ? (
              <IeFluidTank
                height={area.fill.height}
                key={area.label}
                label={area.label}
                left={area.fill.left}
                max={tank.max}
                overlayName={area.overlayName}
                tint={tank.tint}
                top={area.fill.top}
                value={tank.value}
                width={area.fill.width}
              />
            )
          : null;
      })}
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={ieExpandSlots(layout)} />
    </IeMachineScreen>
  );
}
