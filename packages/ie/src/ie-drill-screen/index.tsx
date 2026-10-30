import type { ScreenSlot } from "@tennantite/ui";

import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";

export interface IeDrillScreenProps {
  className?: string;
  /**
   * 3 个钻头部件槽（中间件位下移 6px）
   */
  cores?: Array<null | ScreenSlot>;
  /**
   * 钻头槽
   */
  head?: ScreenSlot;
  onSlotClick?: (label: string) => void;
}

/**
 * 电钻（1.12.2 时代贴图，pinned 提交无 GUI 容器类，按 IEContainerScreen 范式
 * 重建）：钻头槽 + 三个钻头部件槽（贴图帧已烘焙，坐标取自像素测量）。
 */
export function IeDrillScreen({
  className,
  cores = [],
  head,
  onSlotClick,
}: IeDrillScreenProps) {
  const layout = IE_MACHINES.drill;
  const slotItems: Record<string, ScreenSlot | undefined> = {
    "drill-core": cores[0] ?? undefined,
    "drill-core-1": cores[1] ?? undefined,
    "drill-core-2": cores[2] ?? undefined,
    "drill-head": head,
  };
  return (
    <IeMachineScreen
      className={className}
      height={layout.height}
      inventoryLabelTop={layout.inventoryLabelTop}
      player={layout.player}
      title={layout.title}
      width={layout.width}
    >
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={ieExpandSlots(layout)} />
    </IeMachineScreen>
  );
}
