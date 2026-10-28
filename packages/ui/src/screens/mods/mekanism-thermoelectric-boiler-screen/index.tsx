import type { ReactNode } from "react";
import { useState } from "react";
import type { MekanismChemicalContents, MekanismStorageScreenProps } from "../mekanism-storage-types";
import type { MekanismSecurityMode } from "../mekanism-types";

import { MekanismBar } from "../mekanism-bar/index";
import { MekanismGauge } from "../mekanism-gauge/index";
import { MekanismInnerScreen } from "../mekanism-parts/index";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismTabBar } from "../mekanism-tab/index";

export interface MekanismThermoelectricBoilerScreenProps extends MekanismStorageScreenProps {
  chemicals?: Record<"cooled" | "steam" | "superheated" | "water", MekanismChemicalContents>;
  rates?: { boil: number; max: number };
  texts?: { boilRate?: ReactNode; maxBoilRate?: ReactNode; temperature?: ReactNode };
}

const SECURITY_ORDER: MekanismSecurityMode[] = ["public", "private", "protected"];

/**
 * 热力锅炉：218×166，四个仪表 + 两条竖向速率条 + 内屏。
 */
export function MekanismThermoelectricBoilerScreen({
  chemicals,
  className,
  playerName = "玩家",
  rates,
  security: initialSecurity = "public",
  texts,
  title = "热力锅炉",
  warning = false,
}: MekanismThermoelectricBoilerScreenProps) {
  const [security, setSecurity] = useState(initialSecurity);
  const tabs = warning
    ? ["boiler" as const, "heat" as const, "security" as const, "warning" as const]
    : ["boiler" as const, "heat" as const, "security" as const];

  return (
    <MekanismScreen
      className={className}
      height={166}
      inventoryLabel={{ text: playerName, x: 29, y: 74 }}
      playerInventory={{ hotbarY: 142, x: 29, y: 84 }}
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
          width={218}
        />
      )}
      title={title}
      width={218}
    >
      <MekanismInnerScreen height={40} left={54} top={23} width={110}>
        <span className="truncate">{texts?.temperature ?? "温度：0 K"}</span>
        <span className="truncate">{texts?.boilRate ?? `沸腾：${rates?.boil ?? 0} mB/t`}</span>
        {texts?.maxBoilRate ? <span className="truncate">{texts.maxBoilRate}</span> : null}
      </MekanismInnerScreen>
      <MekanismBar height={58} kind="rate" label="沸腾" left={44} tint={{ from: "#ffa160", to: "#ffd0a0" }} top={13} value={rates && rates.max > 0 ? rates.boil / rates.max : 0} width={6} />
      <MekanismBar height={58} kind="rate" label="冷却" left={166} tint={{ from: "#366bd0", to: "#5a8cff" }} top={13} value={rates && rates.max > 0 ? rates.boil / rates.max : 0} width={6} />
      <MekanismGauge kind="chemical" label="过热" left={6} max={chemicals?.superheated.capacity ?? 1} tint={chemicals?.superheated.tint} top={13} type="standard" value={chemicals?.superheated.amount ?? 0} />
      <MekanismGauge kind="fluid" label="水" left={26} max={chemicals?.water.capacity ?? 1} tint={chemicals?.water.tint} top={13} type="standard" value={chemicals?.water.amount ?? 0} />
      <MekanismGauge kind="chemical" label="蒸汽" left={174} max={chemicals?.steam.capacity ?? 1} tint={chemicals?.steam.tint} top={13} type="standard" value={chemicals?.steam.amount ?? 0} />
      <MekanismGauge kind="chemical" label="冷却液" left={194} max={chemicals?.cooled.capacity ?? 1} tint={chemicals?.cooled.tint} top={13} type="standard" value={chemicals?.cooled.amount ?? 0} />
    </MekanismScreen>
  );
}
