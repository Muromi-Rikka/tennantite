import type { ScreenSlot } from "@tennantite/ui";
import { useState } from "react";
import type { MekanismFluidContents, MekanismStorageScreenProps } from "../mekanism-storage-types";

import { MekanismArmorSlots } from "../mekanism-armor-slots/index";
import { MekanismGauge } from "../mekanism-gauge/index";
import { mekanismNextEdit, mekanismNextSecurity } from "../mekanism-mode-state";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSideHolder } from "../mekanism-side-holder/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismTabBar } from "../mekanism-tab-bar/index";

export interface MekanismFluidTankScreenProps extends MekanismStorageScreenProps {
  fluid?: MekanismFluidContents;
  input?: ScreenSlot;
  output?: ScreenSlot;
}

/**
 * 流体储罐：176×166，wide 流体仪表 + 输入/输出槽 + 左侧装备栏。
 */
export function MekanismFluidTankScreen({
  armor,
  className,
  editMode: initialEditMode = "both",
  fluid,
  input,
  offhand,
  onSlotClick,
  output,
  playerName = "玩家",
  security: initialSecurity = "public",
  title = "流体储罐",
}: MekanismFluidTankScreenProps) {
  const [security, setSecurity] = useState(initialSecurity);
  const [editMode, setEditMode] = useState(initialEditMode);

  return (
    <MekanismScreen
      className={className}
      height={166}
      inventoryLabel={{ text: playerName, x: 8, y: 72 }}
      playerInventory={{ hotbarY: 142, x: 8, y: 84 }}
      tabs={(
        <MekanismTabBar
          editMode={editMode}
          onTabClick={(kind) => {
            if (kind === "security") {
              setSecurity(mekanismNextSecurity(security));
            }
            else if (kind === "edit") {
              setEditMode(mekanismNextEdit(editMode));
            }
          }}
          security={security}
          tabs={["security", "edit"]}
          width={176}
        />
      )}
      title={title}
      width={176}
    >
      <MekanismSideHolder height={98} left={-26} side="left" top={62} />
      <MekanismGauge
        fillSprite={fluid?.fill}
        kind="fluid"
        label="流体"
        left={48}
        max={fluid?.capacity ?? 1}
        tint={fluid?.tint}
        top={18}
        type="wide"
        value={fluid?.amount ?? 0}
      />
      <MekanismSlot item={input} label="input" left={145} onActivate={onSlotClick ? () => onSlotClick("input", input) : undefined} top={18} type="input" />
      <MekanismSlot item={output} label="output" left={145} onActivate={onSlotClick ? () => onSlotClick("output", output) : undefined} top={50} type="output" />
      <MekanismArmorSlots
        armor={armor}
        left={-21}
        offhand={offhand}
        offhandY={138}
        onSlotClick={onSlotClick ? (index, item) => onSlotClick(index === 4 ? "offhand" : `armor-${index}`, item) : undefined}
        top={66}
      />
    </MekanismScreen>
  );
}
