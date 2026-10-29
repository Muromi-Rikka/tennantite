// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  IfAugmentPanelDemo,
  IfBiofuelGeneratorScreenDemo,
  IfBioreactorScreenDemo,
  IfDissolutionChamberScreenDemo,
  IfDyeMixerScreenDemo,
  IfEnergyBarDemo,
  IfFermentationStationScreenDemo,
  IfFluidExtractorScreenDemo,
  IfFluidTankDemo,
  IfIconButtonDemo,
  IfLaserBaseScreenDemo,
  IfMachineGalleryDemo,
  IfMachineScreenDemo,
  IfMobCrusherScreenDemo,
  IfMycelialGeneratorScreenDemo,
  IfPotionBrewerScreenDemo,
  IfProgressDemo,
  IfRedstoneButtonDemo,
  IfSlotDemo,
  IfSpriteDemo,
  IfTankPanelDemo,
  IfTextFieldDemo,
} from "./demos";

describe("sSR smoke (node env, 规格 §1.1)", () => {
  it("iNDUSTRIAL FOREGOING 组件与机器屏可服务端渲染", () => {
    const html = renderToStaticMarkup(
      <>
        <IfSpriteDemo />
        <IfSlotDemo />
        <IfFluidTankDemo />
        <IfEnergyBarDemo />
        <IfProgressDemo />
        <IfIconButtonDemo />
        <IfRedstoneButtonDemo />
        <IfAugmentPanelDemo />
        <IfTankPanelDemo />
        <IfTextFieldDemo />
        <IfMachineScreenDemo />
        <IfMachineGalleryDemo />
        <IfDissolutionChamberScreenDemo />
        <IfFluidExtractorScreenDemo />
        <IfBioreactorScreenDemo />
        <IfBiofuelGeneratorScreenDemo />
        <IfMobCrusherScreenDemo />
        <IfDyeMixerScreenDemo />
        <IfFermentationStationScreenDemo />
        <IfMycelialGeneratorScreenDemo />
        <IfLaserBaseScreenDemo />
        <IfPotionBrewerScreenDemo />
      </>,
    );
    expect(typeof html).toBe("string");
    expect(html).toContain("data-if-machine");
    expect(html).toContain("溶解成型机");
  });
});
