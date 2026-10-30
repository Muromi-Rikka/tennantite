import type { EioSpriteName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";
import { gui, ScreenItemSlot } from "@tennantite/ui";
import { useState } from "react";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineScreen } from "../eio-machine-screen/index";

export interface EioTravelAnchorScreenProps {
  className?: string;
  /**
   * 幽影槽（展示其他锚点图标）
   */
  ghost?: ScreenSlot;
  name?: string;
  onNameChange?: (name: string) => void;
  onSlotClick?: (label: string) => void;
  onVisibleChange?: (isVisible: boolean) => void;
  /**
   * 锚点是否对其他玩家可见
   */
  visible?: boolean;
}

/**
 * 旅行锚点（176×184）：名称输入框、可见性切换（visible / not_visible）、
 * 幽影槽与玩家背包。
 */
export function EioTravelAnchorScreen({
  className,
  ghost,
  name = "",
  onNameChange,
  onSlotClick,
  onVisibleChange,
  visible = false,
}: EioTravelAnchorScreenProps) {
  const layout = EIO_MACHINES.travelAnchor;
  const slot = layout.slots[0];
  const [text, setText] = useState(name);

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      machine="travelAnchor"
      player={layout.player}
      width={layout.width}
    >
      <input
        aria-label="锚点名称"
        className="absolute font-mc mc-text"
        data-eio-travel-anchor-name=""
        onChange={(event) => {
          setText(event.target.value);
          onNameChange?.(event.target.value);
        }}
        style={{
          background: "transparent",
          border: 0,
          color: "#ffffff",
          font: "inherit",
          height: gui(18),
          left: gui(25),
          outline: "none",
          padding: 0,
          top: gui(14),
          width: gui(87),
        }}
        value={text}
      />
      <EioIconButton
        icon={(visible ? "sprites/screen/travel_anchor/visible" : "sprites/screen/travel_anchor/not_visible") as EioSpriteName}
        label="锚点可见性"
        left={150}
        onClick={() => { onVisibleChange?.(!visible); }}
        title={visible ? "可见" : "不可见"}
        top={10}
      />
      {slot
        ? (
            <ScreenItemSlot
              item={ghost}
              label={slot.label}
              left={slot.left}
              onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
              top={slot.top}
            />
          )
        : null}
    </EioMachineScreen>
  );
}
