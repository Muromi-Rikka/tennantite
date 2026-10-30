// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  EioAlloySmelterScreenDemo,
  EioAttractorScreenDemo,
  EioAversionScreenDemo,
  EioBufferScreenDemo,
  EioCapacitorBankScreenDemo,
  EioCombustionGeneratorScreenDemo,
  EioCrafterScreenDemo,
  EioDialingDeviceScreenDemo,
  EioDrainScreenDemo,
  EioEnchanterScreenDemo,
  EioEnergyBarDemo,
  EioExperienceBarDemo,
  EioFarmStationScreenDemo,
  EioGrindingBallDemo,
  EioIconButtonDemo,
  EioImpulseHopperScreenDemo,
  EioInhibitorScreenDemo,
  EioKillerJoeScreenDemo,
  EioLavaGeneratorScreenDemo,
  EioMachineLayoutDemo,
  EioMachineScreenDemo,
  EioMachineStateDemo,
  EioNiardScreenDemo,
  EioPaintingMachineScreenDemo,
  EioPoweredSpawnerScreenDemo,
  EioRelocatorScreenDemo,
  EioSagMillScreenDemo,
  EioSliceAndSpliceScreenDemo,
  EioSoulBinderScreenDemo,
  EioSoulEngineScreenDemo,
  EioSpriteDemo,
  EioStirlingGeneratorScreenDemo,
  EioTankScreenDemo,
  EioTelePadScreenDemo,
  EioTransceiverScreenDemo,
  EioTravelAnchorScreenDemo,
  EioVacuumChestScreenDemo,
  EioVatScreenDemo,
  EioWeatherObeliskScreenDemo,
  EioWiredChargerScreenDemo,
  EioWirelessChargerScreenDemo,
  EioXpObeliskScreenDemo,
  EioXpVacuumScreenDemo,
} from "./demos";

describe("sSR smoke (node env, 规格 §1.1)", () => {
  it("eNDER IO 组件与机器屏可服务端渲染", () => {
    const html = renderToStaticMarkup(
      <>
        <EioSpriteDemo />
        <EioMachineLayoutDemo />
        <EioMachineScreenDemo />
        <EioIconButtonDemo />
        <EioMachineStateDemo />
        <EioEnergyBarDemo />
        <EioGrindingBallDemo />
        <EioExperienceBarDemo />
        <EioAlloySmelterScreenDemo />
        <EioSagMillScreenDemo />
        <EioStirlingGeneratorScreenDemo />
        <EioSoulBinderScreenDemo />
        <EioCapacitorBankScreenDemo />
        <EioPaintingMachineScreenDemo />
        <EioSliceAndSpliceScreenDemo />
        <EioEnchanterScreenDemo />
        <EioCombustionGeneratorScreenDemo />
        <EioLavaGeneratorScreenDemo />
        <EioSoulEngineScreenDemo />
        <EioVatScreenDemo />
        <EioTankScreenDemo />
        <EioDrainScreenDemo />
        <EioNiardScreenDemo />
        <EioWiredChargerScreenDemo />
        <EioWirelessChargerScreenDemo />
        <EioPoweredSpawnerScreenDemo />
        <EioXpObeliskScreenDemo />
        <EioXpVacuumScreenDemo />
        <EioImpulseHopperScreenDemo />
        <EioCrafterScreenDemo />
        <EioFarmStationScreenDemo />
        <EioVacuumChestScreenDemo />
        <EioAttractorScreenDemo />
        <EioAversionScreenDemo />
        <EioInhibitorScreenDemo />
        <EioRelocatorScreenDemo />
        <EioWeatherObeliskScreenDemo />
        <EioKillerJoeScreenDemo />
        <EioBufferScreenDemo />
        <EioTravelAnchorScreenDemo />
        <EioDialingDeviceScreenDemo />
        <EioTelePadScreenDemo />
        <EioTransceiverScreenDemo />
      </>,
    );
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
