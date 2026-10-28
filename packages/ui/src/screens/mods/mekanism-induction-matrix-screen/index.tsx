import type { ReactNode } from "react";
import { useState } from "react";
import type { ScreenSlot } from "../../containers/types";
import type { MekanismStorageScreenProps } from "../mekanism-storage-types";
import type { MekanismSecurityMode } from "../mekanism-types";

import { MekanismGauge } from "../mekanism-gauge/index";
import { MekanismArmorSlots, MekanismInnerScreen } from "../mekanism-parts/index";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismElementHolder, MekanismSideHolder, MekanismTabBar } from "../mekanism-tab/index";

export interface MekanismInductionMatrixScreenProps extends MekanismStorageScreenProps {
  cells?: ScreenSlot[];
  energy?: { max: number; value: number };
  texts?: { capacity?: ReactNode; energy?: ReactNode; input?: ReactNode; output?: ReactNode };
}

const SECURITY_ORDER: MekanismSecurityMode[] = ["public", "private", "protected"];

/**
 * 感应矩阵：176×166，34×56 能量仪表 + 内屏 + 两个元件槽 + 左侧装备栏。
 */
export function MekanismInductionMatrixScreen({
  armor,
  cells = [],
  className,
  energy,
  offhand,
  onSlotClick,
  playerName = "玩家",
  security: initialSecurity = "public",
  texts,
  title = "感应矩阵",
}: MekanismInductionMatrixScreenProps) {
  const [security, setSecurity] = useState(initialSecurity);

  return (
    <MekanismScreen
      className={className}
      height={166}
      inventoryLabel={{ text: playerName, x: 8, y: 74 }}
      playerInventory={{ hotbarY: 142, x: 8, y: 84 }}
      tabs={(
        <MekanismTabBar
          onTabClick={(kind) => {
            if (kind === "security") {
              setSecurity(SECURITY_ORDER[(SECURITY_ORDER.indexOf(security) + 1) % SECURITY_ORDER.length] ?? "public");
            }
          }}
          security={security}
          tabs={["energy", "matrix", "security"]}
          width={176}
        />
      )}
      title={title}
      width={176}
    >
      <MekanismSideHolder height={98} left={-26} side="left" top={36} />
      <MekanismGauge height={56} kind="energy" label="能量" left={7} max={energy?.max ?? 1} top={16} type="medium" value={energy?.value ?? 0} width={34} />
      <MekanismInnerScreen height={46} left={49} top={21} width={84}>
        <span className="truncate">{texts?.energy ?? `${energy?.value ?? 0} / ${energy?.max ?? 0} FE`}</span>
        <span className="truncate">{texts?.capacity ?? "容量"}</span>
        {texts?.input ? <span className="truncate">{texts.input}</span> : null}
        {texts?.output ? <span className="truncate">{texts.output}</span> : null}
      </MekanismInnerScreen>
      <MekanismElementHolder height={56} left={141} top={16} width={26} />
      <MekanismSlot item={cells[0]} label="cell-0" left={145} onActivate={onSlotClick ? () => onSlotClick("cell-0", cells[0]) : undefined} top={20} type="inner-holder" />
      <MekanismSlot item={cells[1]} label="cell-1" left={145} onActivate={onSlotClick ? () => onSlotClick("cell-1", cells[1]) : undefined} top={50} type="inner-holder" />
      <MekanismArmorSlots
        armor={armor}
        left={-21}
        offhand={offhand}
        offhandY={112}
        onSlotClick={onSlotClick ? (index, item) => onSlotClick(index === 4 ? "offhand" : `armor-${index}`, item) : undefined}
        top={40}
      />
    </MekanismScreen>
  );
}
