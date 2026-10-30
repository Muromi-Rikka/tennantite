import type { ReactNode } from "react";
import { useState } from "react";
import type { MekanismChemicalContents, MekanismStorageScreenProps } from "../mekanism-storage-types";

import { MekanismBar } from "../mekanism-bar/index";
import { MekanismGauge } from "../mekanism-gauge/index";
import { MekanismInnerScreen } from "../mekanism-inner-screen/index";
import { mekanismNextSecurity } from "../mekanism-mode-state";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismTabBar } from "../mekanism-tab-bar/index";

export interface MekanismThermoelectricBoilerScreenProps extends MekanismStorageScreenProps {
  chemicals?: Record<"cooled" | "steam" | "superheated" | "water", MekanismChemicalContents>;
  rates?: { boil: number; max: number };
  texts?: { boilRate?: ReactNode; maxBoilRate?: ReactNode; temperature?: ReactNode };
}

interface BoilerGaugeProps {
  chemical?: MekanismChemicalContents;
  kind: "chemical" | "fluid";
  label: string;
  left: number;
}

interface BoilerReadoutProps {
  rates?: { boil: number; max: number };
  texts?: { boilRate?: ReactNode; maxBoilRate?: ReactNode; temperature?: ReactNode };
}

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
              setSecurity(mekanismNextSecurity(security));
            }
          }}
          security={security}
          tabs={[...boilerTabs(warning)]}
          warningSide="right"
          width={218}
        />
      )}
      title={title}
      width={218}
    >
      <BoilerReadout rates={rates} texts={texts} />
      <MekanismBar height={58} kind="rate" label="沸腾" left={44} tint={{ from: "#ffa160", to: "#ffd0a0" }} top={13} value={boilRatio(rates)} width={6} />
      <MekanismBar height={58} kind="rate" label="冷却" left={166} tint={{ from: "#366bd0", to: "#5a8cff" }} top={13} value={boilRatio(rates)} width={6} />
      <BoilerGauge chemical={chemicals?.superheated} kind="chemical" label="过热" left={6} />
      <BoilerGauge chemical={chemicals?.water} kind="fluid" label="水" left={26} />
      <BoilerGauge chemical={chemicals?.steam} kind="chemical" label="蒸汽" left={174} />
      <BoilerGauge chemical={chemicals?.cooled} kind="chemical" label="冷却液" left={194} />
    </MekanismScreen>
  );
}

/**
 * 锅炉仪表：容量缺省按 1 处理，读数缺省为 0。
 */
function BoilerGauge({ chemical, kind, label, left }: BoilerGaugeProps) {
  return (
    <MekanismGauge
      kind={kind}
      label={label}
      left={left}
      max={chemical?.capacity ?? 1}
      tint={chemical?.tint}
      top={13}
      type="standard"
      value={chemical?.amount ?? 0}
    />
  );
}

/**
 * 内屏读数：温度与沸腾速率，可选最大沸腾速率。
 */
function BoilerReadout({ rates, texts }: BoilerReadoutProps) {
  return (
    <MekanismInnerScreen height={40} left={54} top={23} width={110}>
      <span className="truncate">{texts?.temperature ?? "温度：0 K"}</span>
      <span className="truncate">{texts?.boilRate ?? `沸腾：${rates?.boil ?? 0} mB/t`}</span>
      {texts?.maxBoilRate ? <span className="truncate">{texts.maxBoilRate}</span> : null}
    </MekanismInnerScreen>
  );
}

/**
 * 标签页：警告时在安全页后追加警告页。
 */
function boilerTabs(hasWarning: boolean) {
  return hasWarning
    ? ["boiler" as const, "heat" as const, "security" as const, "warning" as const]
    : ["boiler" as const, "heat" as const, "security" as const];
}

/**
 * 沸腾占比：最大速率为 0 或缺省时为 0。
 */
function boilRatio(rates?: { boil: number; max: number }) {
  return rates && rates.max > 0 ? rates.boil / rates.max : 0;
}
