import type { ScreenSlot } from "@tennantite/ui";

import { gui, ScreenItemSlot } from "@tennantite/ui";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSprite } from "../ie-sprite/index";

export interface IeToolboxScreenProps {
  /**
   * 3 个护甲槽
   */
  armor?: Array<null | ScreenSlot>;
  className?: string;
  /**
   * 6 个食物槽
   */
  food?: Array<null | ScreenSlot>;
  /**
   * 7 个杂项槽
   */
  misc?: Array<null | ScreenSlot>;
  onSlotClick?: (label: string) => void;
  /**
   * 4 个着色器槽
   */
  shaders?: Array<null | ScreenSlot>;
  /**
   * 3 个工具槽（工具/断线钳/锤）
   */
  tools?: Array<null | ScreenSlot>;
}

/**
 * 工具箱（ToolboxScreen）：背景 blit 于 topPos-17（源区 176×255），工具/护甲/
 * 着色器/食物/杂项五组槽位。
 */
export function IeToolboxScreen({
  armor = [],
  className,
  food = [],
  misc = [],
  onSlotClick,
  shaders = [],
  tools = [],
}: IeToolboxScreenProps) {
  const layout = IE_MACHINES.toolbox;
  const slots = ieExpandSlots(layout);
  const groupOf = (label: string): Array<null | ScreenSlot> => {
    if (label.startsWith("toolbox-armor"))
      return armor;
    if (label.startsWith("toolbox-shader"))
      return shaders;
    if (label.startsWith("toolbox-food"))
      return food;
    return label.startsWith("toolbox-misc") ? misc : tools;
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
      <IeSprite
        name="toolbox"
        src={{ height: 255, width: 176, x: 0, y: 0 }}
        style={{ left: 0, position: "absolute", top: gui(-17) }}
      />
      {slots.map(slot => (
        <ScreenItemSlot
          item={groupOf(slot.label)[indexInGroup(slot.label)] ?? undefined}
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

function indexInGroup(label: string): number {
  if (label === "toolbox-tool")
    return 0;
  if (label === "toolbox-wirecutter")
    return 1;
  return label === "toolbox-hammer" ? 2 : Number(label.split("-").pop());
}
