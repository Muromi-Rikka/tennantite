import { useState } from "react";
import type { ScreenSlot } from "../../containers/types";
import type { MekanismStorageScreenProps } from "../mekanism-storage-types";
import type { MekanismSecurityMode } from "../mekanism-types";

import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismTabBar } from "../mekanism-tab/index";

export interface MekanismPersonalStorageScreenProps extends MekanismStorageScreenProps {
  items?: ScreenSlot[];
}

const SECURITY_ORDER: MekanismSecurityMode[] = ["public", "private", "protected"];

/**
 * 个人箱子：176×222，9×6 槽位 + 安全标签。
 */
export function MekanismPersonalStorageScreen({
  className,
  items = [],
  onSlotClick,
  playerName = "玩家",
  security: initialSecurity = "public",
  title = "个人箱子",
}: MekanismPersonalStorageScreenProps) {
  const [security, setSecurity] = useState(initialSecurity);

  return (
    <MekanismScreen
      className={className}
      height={222}
      inventoryLabel={{ text: playerName, x: 8, y: 128 }}
      playerInventory={{ hotbarY: 198, x: 8, y: 140 }}
      tabs={(
        <MekanismTabBar
          onTabClick={(kind) => {
            if (kind === "security") {
              setSecurity(SECURITY_ORDER[(SECURITY_ORDER.indexOf(security) + 1) % SECURITY_ORDER.length] ?? "public");
            }
          }}
          security={security}
          tabs={["security"]}
          width={176}
        />
      )}
      title={title}
      width={176}
    >
      {Array.from({ length: 54 }, (_, index) => {
        const column = index % 9;
        const row = Math.floor(index / 9);
        return (
          <MekanismSlot
            item={items[index]}
            key={`inventory-${index}`}
            label={`inventory-${index}`}
            left={7 + column * 18}
            onActivate={onSlotClick ? () => onSlotClick(`inventory-${index}`, items[index]) : undefined}
            top={17 + row * 18}
            type="normal"
          />
        );
      })}
    </MekanismScreen>
  );
}
