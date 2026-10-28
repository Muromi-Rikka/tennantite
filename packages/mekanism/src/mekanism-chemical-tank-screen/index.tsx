import { useState } from "react";
import type { ScreenSlot } from "@verdigris/ui";
import type { MekanismChemicalContents, MekanismStorageScreenProps } from "../mekanism-storage-types";
import type { MekanismSecurityMode } from "../mekanism-types";

import { MekanismBar } from "../mekanism-bar/index";
import { MekanismArmorSlots } from "../mekanism-armor-slots/index";
import { MekanismGasMode } from "../mekanism-gas-mode/index";
import { MekanismInnerScreen } from "../mekanism-inner-screen/index";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSideConfigWindow } from "../mekanism-side-config-window/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismSideHolder } from "../mekanism-side-holder/index";
import { MekanismTabBar } from "../mekanism-tab-bar/index";

export interface MekanismChemicalTankScreenProps extends MekanismStorageScreenProps {
  chemical?: MekanismChemicalContents;
  drain?: ScreenSlot;
  dumping?: boolean;
  fill?: ScreenSlot;
}

const SECURITY_ORDER: MekanismSecurityMode[] = ["public", "private", "protected"];

/**
 * 化学储罐：176×166，横向化学条 + 内屏 + 输入/输出槽 + 左侧装备栏。
 */
export function MekanismChemicalTankScreen({
  armor,
  chemical,
  className,
  defaultWindows = [],
  drain,
  dumping = false,
  fill,
  offhand,
  onSlotClick,
  onWindowsChange,
  playerName = "玩家",
  security: initialSecurity = "public",
  title = "化学储罐",
}: MekanismChemicalTankScreenProps) {
  const [windows, setWindows] = useState(defaultWindows);
  const [security, setSecurity] = useState(initialSecurity);

  const updateWindows = (next: typeof windows) => {
    setWindows(next);
    onWindowsChange?.(next);
  };

  return (
    <MekanismScreen
      className={className}
      height={166}
      inventoryLabel={{ end: 85, text: playerName, x: 8, y: 72 }}
      playerInventory={{ hotbarY: 142, x: 8, y: 84 }}
      tabs={(
        <MekanismTabBar
          active={windows.includes("side-config") ? ["config"] : []}
          onTabClick={(kind) => {
            if (kind === "config") {
              updateWindows(windows.includes("side-config") ? [] : ["side-config"]);
            }
            else if (kind === "security") {
              setSecurity(SECURITY_ORDER[(SECURITY_ORDER.indexOf(security) + 1) % SECURITY_ORDER.length] ?? "public");
            }
          }}
          security={security}
          tabs={["config", "transporter", "security"]}
          width={176}
        />
      )}
      title={title}
      width={176}
      windows={windows.includes("side-config")
        ? (
            <MekanismSideConfigWindow
              left={10}
              onClose={() => updateWindows([])}
              sides={{ front: "INPUT" }}
              top={15}
              transmissions={["chemical", "item"]}
            />
          )
        : null}
    >
      <MekanismSideHolder height={98} left={-26} side="left" top={62} />
      <MekanismBar
        height={10}
        horizontal
        kind="rate"
        label="化学物质"
        left={42}
        tint={{ from: "#c9071f", to: "#e03030" }}
        top={16}
        value={chemical ? chemical.amount / chemical.capacity : 0}
        width={116}
      />
      <MekanismInnerScreen height={28} left={42} top={37} width={118}>
        <span className="truncate">{dumping ? "正在倾倒" : "空闲"}</span>
      </MekanismInnerScreen>
      <MekanismGasMode label="气体模式" left={159} mode={dumping ? "dump" : "idle"} top={72} />
      <MekanismSlot item={drain} label="drain" left={15} onActivate={onSlotClick ? () => onSlotClick("drain", drain) : undefined} top={15} type="output" />
      <MekanismSlot item={fill} label="fill" left={15} onActivate={onSlotClick ? () => onSlotClick("fill", fill) : undefined} top={47} type="input" />
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
