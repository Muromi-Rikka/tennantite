import type { ScreenSlot } from "@tennantite/ui";

import { ModProgress } from "@tennantite/mods-core";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IE_FLAME } from "../ie-metrics";
import { IeSprite } from "../ie-sprite/index";

export interface IeAlloySmelterScreenProps {
  /**
   * 燃烧进度 0..1
   */
  burn?: number;
  className?: string;
  fuel?: ScreenSlot;
  /**
   * 两个合金输入槽
   */
  inputs?: Array<null | ScreenSlot>;
  onSlotClick?: (label: string) => void;
  output?: ScreenSlot;
  /**
   * 冶炼进度 0..1
   */
  process?: number;
}

/**
 * 合金炉（AlloySmelterScreen）：双输入 + 燃料 + 输出，火焰与箭头进度
 * 复用背景贴图内的裁剪区域（同 BlastFurnaceScreen.drawFlameAndArrow，箭头 x=84）。
 */
export function IeAlloySmelterScreen({
  burn = 0,
  className,
  fuel,
  inputs = [],
  onSlotClick,
  output,
  process = 0,
}: IeAlloySmelterScreenProps) {
  const layout = IE_MACHINES.alloySmelter;
  const slotItems: Record<string, ScreenSlot | undefined> = {
    "alloy-smelter-fuel": fuel,
    "alloy-smelter-input": inputs[0] ?? undefined,
    "alloy-smelter-input-2": inputs[1] ?? undefined,
    "alloy-smelter-output": output,
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
      <ModProgress
        direction="up"
        fill={(
          <IeSprite
            name={layout.background!}
            src={{ height: 12, width: 9, x: 179, y: 1 }}
          />
        )}
        height={IE_FLAME.height}
        label="合金炉燃烧进度"
        left={layout.flame.left}
        progress={burn}
        top={layout.flame.top}
        width={IE_FLAME.width}
      />
      <ModProgress
        direction="right"
        fill={(
          <IeSprite
            name={layout.background!}
            src={{ height: 16, width: 22, x: 177, y: 14 }}
          />
        )}
        height={layout.arrow.height}
        label="合金炉冶炼进度"
        left={layout.arrow.left}
        progress={process}
        top={layout.arrow.top}
        width={layout.arrow.width}
      />
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={ieExpandSlots(layout)} />
    </IeMachineScreen>
  );
}
