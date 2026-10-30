// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
// node 环境下若有组件触达 window / document / navigator 会直接抛错。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  ThermalBottlerScreenDemo,
  ThermalBrewerScreenDemo,
  ThermalCacheScreenDemo,
  ThermalCellRateTextDemo,
  ThermalCentrifugeScreenDemo,
  ThermalChargeBenchScreenDemo,
  ThermalChillerScreenDemo,
  ThermalCollectorScreenDemo,
  ThermalComposterScreenDemo,
  ThermalCrafterScreenDemo,
  ThermalCrucibleScreenDemo,
  ThermalCrystallizerScreenDemo,
  ThermalEnergyCellScreenDemo,
  ThermalEnergyGaugeDemo,
  ThermalFisherScreenDemo,
  ThermalFluidCacheScreenDemo,
  ThermalHiveExtractorScreenDemo,
  ThermalInsolatorScreenDemo,
  ThermalMachineScreenDemo,
  ThermalNullifierScreenDemo,
  ThermalPotionDiffuserScreenDemo,
  ThermalPressScreenDemo,
  ThermalPulverizerScreenDemo,
  ThermalPyrolyzerScreenDemo,
  ThermalRedstoneFurnaceIdleDemo,
  ThermalRedstoneFurnaceScreenDemo,
  ThermalRefineryScreenDemo,
  ThermalRockGenScreenDemo,
  ThermalSawmillScreenDemo,
  ThermalSmelterScreenDemo,
  ThermalSoilInfuserScreenDemo,
  ThermalSpriteDemo,
  ThermalTinkerBenchScreenDemo,
  ThermalTreeExtractorScreenDemo,
  ThermalWaterGenScreenDemo,
  ThermalXpCondenserScreenDemo,
} from "./demos";

describe("sSR smoke (node env, 规格 §1.1)", () => {
  it("thermal 全部界面与共享件均可服务端渲染", () => {
    const html = renderToStaticMarkup(
      <>
        <ThermalRedstoneFurnaceScreenDemo />
        <ThermalRedstoneFurnaceIdleDemo />
        <ThermalEnergyCellScreenDemo />
        <ThermalMachineScreenDemo />
        <ThermalEnergyGaugeDemo />
        <ThermalCellRateTextDemo />
        <ThermalSpriteDemo />
        <ThermalCacheScreenDemo />
        <ThermalPulverizerScreenDemo />
        <ThermalSawmillScreenDemo />
        <ThermalSmelterScreenDemo />
        <ThermalCrucibleScreenDemo />
        <ThermalCentrifugeScreenDemo />
        <ThermalRefineryScreenDemo />
        <ThermalBottlerScreenDemo />
        <ThermalBrewerScreenDemo />
        <ThermalCrafterScreenDemo />
        <ThermalCrystallizerScreenDemo />
        <ThermalInsolatorScreenDemo />
        <ThermalChillerScreenDemo />
        <ThermalPressScreenDemo />
        <ThermalPyrolyzerScreenDemo />
        <ThermalComposterScreenDemo />
        <ThermalNullifierScreenDemo />
        <ThermalCollectorScreenDemo />
        <ThermalFluidCacheScreenDemo />
        <ThermalTinkerBenchScreenDemo />
        <ThermalChargeBenchScreenDemo />
        <ThermalFisherScreenDemo />
        <ThermalTreeExtractorScreenDemo />
        <ThermalHiveExtractorScreenDemo />
        <ThermalSoilInfuserScreenDemo />
        <ThermalRockGenScreenDemo />
        <ThermalWaterGenScreenDemo />
        <ThermalXpCondenserScreenDemo />
        <ThermalPotionDiffuserScreenDemo />
      </>,
    );
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
