import type { ScreenSlot } from "@tennantite/ui";
import { useState } from "react";
import type { MekanismStorageScreenProps } from "../mekanism-storage-types";
import type { MekanismSecurityMode } from "../mekanism-types";

import { MekanismArmorSlots } from "../mekanism-armor-slots/index";
import { MekanismGauge } from "../mekanism-gauge/index";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSideConfigWindow } from "../mekanism-side-config-window/index";
import { MekanismSideHolder } from "../mekanism-side-holder/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismTabBar } from "../mekanism-tab-bar/index";

export interface MekanismEnergyCubeScreenProps extends MekanismStorageScreenProps {
  charge?: ScreenSlot;
  discharge?: ScreenSlot;
  energy?: { max: number; value: number };
}

const SECURITY_ORDER: MekanismSecurityMode[] = ["public", "private", "protected"];

/**
 * 能量立方：176×166，energy gauge + 充放电槽 + 右侧 5 个装备槽。
 */
export function MekanismEnergyCubeScreen({
  armor,
  charge,
  className,
  defaultWindows = [],
  discharge,
  energy,
  offhand,
  onSlotClick,
  onWindowsChange,
  playerName = "玩家",
  security: initialSecurity = "public",
  title = "能量立方",
}: MekanismEnergyCubeScreenProps) {
  const [windows, setWindows] = useState(defaultWindows);
  const [security, setSecurity] = useState(initialSecurity);
  const [transmission, setTransmission] = useState<"energy" | "item">("energy");

  const updateWindows = (next: typeof windows) => {
    setWindows(next);
    onWindowsChange?.(next);
  };
  const cycleSecurity = () => {
    setSecurity(SECURITY_ORDER[(SECURITY_ORDER.indexOf(security) + 1) % SECURITY_ORDER.length] ?? "public");
  };

  return (
    <MekanismScreen
      className={className}
      height={166}
      inventoryLabel={{ text: playerName, x: 8, y: 72 }}
      playerInventory={{ hotbarY: 142, x: 8, y: 84 }}
      tabs={(
        <MekanismTabBar
          active={windows.includes("side-config") ? ["config"] : []}
          onTabClick={(kind) => {
            if (kind === "config") {
              updateWindows(windows.includes("side-config") ? [] : ["side-config"]);
            }
            else if (kind === "security") {
              cycleSecurity();
            }
          }}
          positions={{ security: 6 }}
          security={security}
          tabs={["config", "transporter", "energy", "security"]}
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
              onTransmissionChange={(next) => {
                if (next === "energy" || next === "item") {
                  setTransmission(next);
                }
              }}
              top={15}
              transmission={transmission}
              transmissions={["energy", "item"]}
            />
          )
        : null}
    >
      <MekanismSideHolder height={98} left={176} side="right" top={36} />
      <MekanismSlot item={discharge} label="discharge" left={16} onActivate={onSlotClick ? () => onSlotClick("discharge", discharge) : undefined} overlay="minus" top={34} type="power" />
      <MekanismSlot item={charge} label="charge" left={142} onActivate={onSlotClick ? () => onSlotClick("charge", charge) : undefined} overlay="plus" top={34} type="power" />
      <MekanismGauge
        kind="energy"
        label="能量"
        left={55}
        max={energy?.max ?? 1}
        top={18}
        type="wide"
        value={energy?.value ?? 0}
      />
      <MekanismArmorSlots
        armor={armor}
        left={179}
        offhand={offhand}
        offhandY={112}
        onSlotClick={onSlotClick ? (index, item) => onSlotClick(index === 4 ? "offhand" : `armor-${index}`, item) : undefined}
        top={40}
      />
    </MekanismScreen>
  );
}
