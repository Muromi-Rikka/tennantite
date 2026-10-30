import type { ScreenSlot } from "@tennantite/ui";

import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeProgressBars } from "../ie-progress-bars/index";
import { IeSpriteButton } from "../ie-sprite-button/index";

export interface IeArcFurnaceScreenProps {
  /**
   * 4 个添加剂槽（石灰/助熔剂）
   */
  additives?: Array<null | ScreenSlot>;
  className?: string;
  /**
   * 3 个电极槽（石墨电极）
   */
  electrodes?: Array<null | ScreenSlot>;
  energy?: { max: number; value: number };
  /**
   * 12 个输入槽
   */
  inputs?: Array<null | ScreenSlot>;
  /**
   * 分配按钮（autoSplitStacks）
   */
  onDistribute?: () => void;
  onSlotClick?: (label: string) => void;
  /**
   * 6 个输出槽
   */
  outputs?: Array<null | ScreenSlot>;
  /**
   * 每个输入槽的冶炼进度 0..1（ProcessSlot.processFloat，长度 ≤ 12）
   */
  progresses?: number[];
  slagOutput?: ScreenSlot;
}

/**
 * 弧光炉（ArcFurnaceScreen，176×207）：分配按钮、3 电极、12 输入（含竖向
 * 进度条）、4 添加剂、6 输出 + 炉渣输出、右侧竖向能量条。
 */
export function IeArcFurnaceScreen({
  additives = [],
  className,
  electrodes = [],
  energy,
  inputs = [],
  onDistribute,
  onSlotClick,
  outputs = [],
  progresses = [],
  slagOutput,
}: IeArcFurnaceScreenProps) {
  const layout = IE_MACHINES.arcFurnace;
  const slots = ieExpandSlots(layout);
  const slotItems: Record<string, null | ScreenSlot | undefined> = {};
  for (const slot of slots) {
    const label = slot.label;
    const index = Number(label.split("-").pop());
    if (label.startsWith("arc-furnace-input")) {
      slotItems[label] = inputs[index] ?? null;
    }
    else if (label.startsWith("arc-furnace-additive")) {
      slotItems[label] = additives[index] ?? null;
    }
    else if (label.startsWith("arc-furnace-output")) {
      slotItems[label] = outputs[index] ?? null;
    }
    else if (label.startsWith("arc-furnace-electrode")) {
      slotItems[label] = electrodes[index] ?? null;
    }
    else if (label === "arc-furnace-slag-output") {
      slotItems[label] = slagOutput;
    }
  }
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
              label="弧光炉能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
            />
          )
        : null}
      <IeSpriteButton
        dataAttributes={{ "data-ie-distribute-button": "normal" }}
        height={16}
        hoverName="sprites/arc_furnace/distribute_hover"
        label="分配物品"
        left={10}
        name="sprites/arc_furnace/distribute"
        onClick={onDistribute}
        top={10}
        width={16}
      />
      <IeProgressBars
        dataAttribute="data-ie-arc-progress"
        layout={layout.progressBars}
        values={progresses}
      />
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={slots} />
    </IeMachineScreen>
  );
}
