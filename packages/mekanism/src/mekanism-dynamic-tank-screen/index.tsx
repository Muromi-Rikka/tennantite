import type { ReactNode } from "react";
import { useState } from "react";
import type { ScreenSlot } from "@verdigris/ui";
import type { MekanismChemicalContents, MekanismFluidContents, MekanismStorageScreenProps } from "../mekanism-storage-types";
import type { MekanismEditMode, MekanismSecurityMode } from "../mekanism-types";

import { MekanismGauge } from "../mekanism-gauge/index";
import { MekanismArmorSlots } from "../mekanism-armor-slots/index";
import { MekanismArrow } from "../mekanism-arrow/index";
import { MekanismInnerScreen } from "../mekanism-inner-screen/index";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismElementHolder } from "../mekanism-element-holder/index";
import { MekanismSideHolder } from "../mekanism-side-holder/index";
import { MekanismTabBar } from "../mekanism-tab-bar/index";

export interface MekanismDynamicTankScreenProps extends MekanismStorageScreenProps {
  chemical?: MekanismChemicalContents;
  contents?: ScreenSlot[];
  fluid?: MekanismFluidContents;
  texts?: { capacity?: ReactNode; stored?: ReactNode };
}

const SECURITY_ORDER: MekanismSecurityMode[] = ["public", "private", "protected"];
const EDIT_ORDER: MekanismEditMode[] = ["both", "fill", "empty"];

/**
 * 动态储罐：176×166，34×56 合并仪表 + 内屏 + 两个内容槽 + 左侧装备栏。
 */
export function MekanismDynamicTankScreen({
  armor,
  chemical,
  className,
  contents = [],
  editMode: initialEditMode = "both",
  fluid,
  offhand,
  onSlotClick,
  playerName = "玩家",
  security: initialSecurity = "public",
  texts,
  title = "动态储罐",
}: MekanismDynamicTankScreenProps) {
  const [security, setSecurity] = useState(initialSecurity);
  const [editMode, setEditMode] = useState(initialEditMode);
  const contentsData = fluid ?? chemical;
  const kind = fluid ? "fluid" : "chemical";

  return (
    <MekanismScreen
      className={className}
      height={166}
      inventoryLabel={{ text: playerName, x: 8, y: 74 }}
      playerInventory={{ hotbarY: 142, x: 8, y: 84 }}
      tabs={(
        <MekanismTabBar
          editMode={editMode}
          onTabClick={(tab) => {
            if (tab === "security") {
              setSecurity(SECURITY_ORDER[(SECURITY_ORDER.indexOf(security) + 1) % SECURITY_ORDER.length] ?? "public");
            }
            else if (tab === "edit") {
              setEditMode(EDIT_ORDER[(EDIT_ORDER.indexOf(editMode) + 1) % EDIT_ORDER.length] ?? "both");
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
        fillSprite={contentsData?.fill}
        height={56}
        kind={kind}
        label="内容物"
        left={7}
        max={contentsData?.capacity ?? 1}
        tint={contentsData?.tint}
        top={16}
        type="medium"
        value={contentsData?.amount ?? 0}
        width={34}
      />
      <MekanismInnerScreen height={46} left={49} top={21} width={84}>
        <span className="truncate">{texts?.stored ?? `${contentsData?.amount ?? 0} / ${contentsData?.capacity ?? 0}`}</span>
        <span className="truncate">{texts?.capacity ?? "容量"}</span>
      </MekanismInnerScreen>
      <MekanismElementHolder height={56} left={141} top={16} width={26} />
      <MekanismSlot item={contents[0]} label="contents-0" left={145} onActivate={onSlotClick ? () => onSlotClick("contents-0", contents[0]) : undefined} top={20} type="inner-holder" />
      <MekanismSlot item={contents[1]} label="contents-1" left={145} onActivate={onSlotClick ? () => onSlotClick("contents-1", contents[1]) : undefined} top={50} type="inner-holder" />
      <MekanismArrow dir="down" left={150} top={39} />
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
