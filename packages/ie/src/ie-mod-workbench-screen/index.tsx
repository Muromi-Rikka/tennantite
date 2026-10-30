import type { ScreenSlot } from "@tennantite/ui";

import { gui, ScreenItemSlot } from "@tennantite/ui";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSprite } from "../ie-sprite/index";

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
  const itemFor = (label: string): ScreenSlot | undefined => {
    if (label === "mod-workbench-tool")
      return tool;
    if (label === "mod-workbench-shader")
      return shader;
    return label.startsWith("mod-workbench-input") ? inputs[Number(label.split("-").pop())] ?? undefined : outputs[Number(label.split("-").pop())] ?? undefined;
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
      <button
        aria-label="上一页"
        data-ie-page="left"
        onClick={onPageChange ? () => onPageChange(currentPage - 1) : undefined}
        style={{
          height: gui(12),
          left: gui(118),
          position: "absolute",
          top: gui(9),
          width: gui(18),
        }}
        type="button"
      >
        <IeSprite name="sprites/mod_workbench/page_left" />
      </button>
      <button
        aria-label="下一页"
        data-ie-page="right"
        onClick={onPageChange ? () => onPageChange(currentPage + 1) : undefined}
        style={{
          height: gui(12),
          left: gui(154),
          position: "absolute",
          top: gui(9),
          width: gui(18),
        }}
        type="button"
      >
        <IeSprite name="sprites/mod_workbench/page_right" />
      </button>
      {slots.map(slot => (
        <ScreenItemSlot
          item={itemFor(slot.label)}
          key={slot.label}
          label={slot.label}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
          top={slot.top}
        />
      ))}
    </IeMachineScreen>
  );
}
