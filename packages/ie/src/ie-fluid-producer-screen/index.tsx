import type { ScreenSlot } from "@tennantite/ui";

import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeFluidTank } from "../ie-fluid-tank/index";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";

export interface IeFluidProducerScreenProps {
  /**
   * 中部窄流体单元槽
   */
  cell?: ScreenSlot;
  className?: string;
  energy?: { max: number; value: number };
  /**
   * 3×3 材料网格
   */
  grid?: Array<null | ScreenSlot>;
  /**
   * 流体容器输入槽
   */
  input?: ScreenSlot;
  onSlotClick?: (label: string) => void;
  output?: ScreenSlot;
  tank?: { max: number; tint: string; value: number };
}

/**
 * 流体泵站（1.12.2 时代贴图 fluid_producer.png，pinned 提交无 GUI 容器类，
 * 按 IEContainerScreen 范式重建）：3×3 网格 + 流体单元/容器/输出槽 +
 * 罐显示区与竖向能量表（坐标取自贴图像素测量）。
 */
export function IeFluidProducerScreen({
  cell,
  className,
  energy,
  grid = [],
  input,
  onSlotClick,
  output,
  tank,
}: IeFluidProducerScreenProps) {
  const layout = IE_MACHINES.fluidProducer;
  const slots = ieExpandSlots(layout);
  const tankArea = layout.tanks[0];
  const slotItems: Record<string, ScreenSlot | undefined> = {
    "fluid-producer-cell": cell,
    "fluid-producer-input": input,
    "fluid-producer-output": output,
  };
  for (const [index, item] of grid.entries()) {
    slotItems[`fluid-producer-grid-${index}`] = item ?? undefined;
  }
  return (
    <IeMachineScreen
      className={className}
      height={layout.height}
      inventoryLabelTop={layout.inventoryLabelTop}
      player={layout.player}
      title={layout.title}
      width={layout.width}
    >
      {tank && tankArea
        ? (
            <IeFluidTank
              height={tankArea.fill.height}
              label={tankArea.label}
              left={tankArea.fill.left}
              max={tank.max}
              tint={tank.tint}
              top={tankArea.fill.top}
              value={tank.value}
              width={tankArea.fill.width}
            />
          )
        : null}
      {energy
        ? (
            <IeEnergyBar
              height={40}
              label="流体泵站能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
              width={9}
            />
          )
        : null}
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={slots} />
    </IeMachineScreen>
  );
}
