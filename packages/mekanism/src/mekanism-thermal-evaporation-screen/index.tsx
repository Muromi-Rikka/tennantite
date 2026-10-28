import type { ReactNode } from "react";
import { useState } from "react";
import type { MekanismFluidContents, MekanismStorageScreenProps } from "../mekanism-storage-types";
import type { MekanismSecurityMode } from "../mekanism-types";

import { MekanismBar } from "../mekanism-bar/index";
import { MekanismGauge } from "../mekanism-gauge/index";
import { MekanismArrow } from "../mekanism-arrow/index";
import { MekanismInnerScreen } from "../mekanism-inner-screen/index";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismTabBar } from "../mekanism-tab-bar/index";

export interface MekanismThermalEvaporationScreenProps extends MekanismStorageScreenProps {
  fluid?: { input?: MekanismFluidContents; output?: MekanismFluidContents };
  temperature?: number;
  texts?: { formed?: ReactNode; height?: ReactNode; production?: ReactNode; temperature?: ReactNode };
}

const SECURITY_ORDER: MekanismSecurityMode[] = ["public", "private", "protected"];

/**
 * 热力蒸发控制器：196×166，输入/输出流体仪表 + 横向速率条 + 内屏。
 */
export function MekanismThermalEvaporationScreen({
  className,
  fluid,
  playerName = "玩家",
  security: initialSecurity = "public",
  temperature = 0,
  texts,
  title = "热力蒸发控制器",
  warning = false,
}: MekanismThermalEvaporationScreenProps) {
  const [security, setSecurity] = useState(initialSecurity);
  const tabs = warning ? ["heat" as const, "security" as const, "warning" as const] : ["heat" as const, "security" as const];

  return (
    <MekanismScreen
      className={className}
      height={166}
      inventoryLabel={{ text: playerName, x: 18, y: 74 }}
      playerInventory={{ hotbarY: 142, x: 18, y: 84 }}
      tabs={(
        <MekanismTabBar
          onTabClick={(kind) => {
            if (kind === "security") {
              setSecurity(SECURITY_ORDER[(SECURITY_ORDER.indexOf(security) + 1) % SECURITY_ORDER.length] ?? "public");
            }
          }}
          security={security}
          tabs={[...tabs]}
          warningSide="right"
          width={196}
        />
      )}
      title={title}
      titleEnd={172}
      titleX={24}
      width={196}
    >
      <MekanismInnerScreen height={40} left={48} top={19} width={100}>
        <span className="truncate">{texts?.temperature ?? `温度：${temperature} K`}</span>
        <span className="truncate">{texts?.height ?? "高度：0"}</span>
        <span className="truncate">{texts?.production ?? "产量：0 mB/t"}</span>
        {texts?.formed ? <span className="truncate">{texts.formed}</span> : null}
      </MekanismInnerScreen>
      <MekanismBar height={8} horizontal kind="rate" label="蒸发速率" left={58} tint={{ from: "#366bd0", to: "#5a8cff" }} top={62} value={0} width={78} />
      <MekanismArrow dir="down" left={32} top={39} />
      <MekanismArrow dir="down" left={156} top={39} />
      <MekanismGauge fillSprite={fluid?.input?.fill} kind="fluid" label="输入" left={6} max={fluid?.input?.capacity ?? 1} tint={fluid?.input?.tint} top={13} type="standard" value={fluid?.input?.amount ?? 0} />
      <MekanismGauge fillSprite={fluid?.output?.fill} kind="fluid" label="输出" left={172} max={fluid?.output?.capacity ?? 1} tint={fluid?.output?.tint} top={13} type="standard" value={fluid?.output?.amount ?? 0} />
    </MekanismScreen>
  );
}
