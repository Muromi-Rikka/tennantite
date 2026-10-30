import type { ScreenSlot } from "@tennantite/ui";

import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSpriteButton } from "../ie-sprite-button/index";

export interface IeModWorkbenchScreenProps {
  className?: string;
  /**
   * 当前图纸页（纯展示状态，GuiButtonIE 翻页 118,9 / 154,9 18×12）
   */
  currentPage?: number;
  /**
   * 6 个升级/图纸输入槽
   */
  inputs?: Array<null | ScreenSlot>;
  onPageChange?: (page: number) => void;
  onSlotClick?: (label: string) => void;
  /**
   * 9 个图纸输出槽
   */
  outputs?: Array<null | ScreenSlot>;
  shader?: ScreenSlot;
  tool?: ScreenSlot;
}

/**
 * 工程师工作台（ModWorkbenchScreen）：工具槽 + 6 升级槽 + 着色器槽 +
 * 图纸输出 3×3，左/右翻页按钮（mod_workbench/page_left / page_right）。
 */
export function IeModWorkbenchScreen({
  className,
  currentPage = 0,
  inputs = [],
  onPageChange,
  onSlotClick,
  outputs = [],
  shader,
  tool,
}: IeModWorkbenchScreenProps) {
  const layout = IE_MACHINES.modWorkbench;
  const slots = ieExpandSlots(layout);
  const slotItems: Record<string, ScreenSlot | undefined> = {
    "mod-workbench-shader": shader,
    "mod-workbench-tool": tool,
  };
  for (const [index, item] of inputs.entries()) {
    slotItems[`mod-workbench-input-${index}`] = item ?? undefined;
  }
  for (const [index, item] of outputs.entries()) {
    slotItems[`mod-workbench-output-${index}`] = item ?? undefined;
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
      <IeSpriteButton
        dataAttributes={{ "data-ie-page": "left" }}
        height={12}
        label="上一页"
        left={118}
        name="sprites/mod_workbench/page_left"
        onClick={onPageChange ? () => onPageChange(currentPage - 1) : undefined}
        top={9}
        width={18}
      />
      <IeSpriteButton
        dataAttributes={{ "data-ie-page": "right" }}
        height={12}
        label="下一页"
        left={154}
        name="sprites/mod_workbench/page_right"
        onClick={onPageChange ? () => onPageChange(currentPage + 1) : undefined}
        top={9}
        width={18}
      />
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={slots} />
    </IeMachineScreen>
  );
}
