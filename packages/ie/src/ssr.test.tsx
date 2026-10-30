// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  IeAlloySmelterScreenDemo,
  IeArcFurnaceScreenDemo,
  IeAssemblerScreenDemo,
  IeAutoWorkbenchScreenDemo,
  IeBlastFurnaceScreenDemo,
  IeCapacitorHvScreenDemo,
  IeChunkLoaderScreenDemo,
  IeCircuitTableScreenDemo,
  IeClocheScreenDemo,
  IeCokeOvenScreenDemo,
  IeCrateScreenDemo,
  IeDrillScreenDemo,
  IeEnergyBarDemo,
  IeFermenterScreenDemo,
  IeFluidProducerScreenDemo,
  IeFluidSorterScreenDemo,
  IeFluidTankDemo,
  IeItemBatcherScreenDemo,
  IeLabelDemo,
  IeMachineScreenDemo,
  IeMetalPressScreenDemo,
  IeMixerScreenDemo,
  IeModWorkbenchScreenDemo,
  IeRefineryScreenDemo,
  IeSorterScreenDemo,
  IeSpriteDemo,
  IeSqueezerScreenDemo,
  IeToolboxScreenDemo,
} from "./demos";

describe("sSR smoke (node env, 规格 §1.1)", () => {
  it("iE 全部机器屏可服务端渲染", () => {
    const html = renderToStaticMarkup(
      <>
        <IeCokeOvenScreenDemo />
        <IeBlastFurnaceScreenDemo />
        <IeAlloySmelterScreenDemo />
        <IeArcFurnaceScreenDemo />
        <IeMetalPressScreenDemo />
        <IeCapacitorHvScreenDemo />
        <IeFermenterScreenDemo />
        <IeSqueezerScreenDemo />
        <IeRefineryScreenDemo />
        <IeMixerScreenDemo />
        <IeClocheScreenDemo />
        <IeSorterScreenDemo />
        <IeFluidSorterScreenDemo />
        <IeItemBatcherScreenDemo />
        <IeCrateScreenDemo />
        <IeDrillScreenDemo />
        <IeToolboxScreenDemo />
        <IeMachineScreenDemo />
        <IeSpriteDemo />
        <IeEnergyBarDemo />
        <IeFluidTankDemo />
        <IeLabelDemo />
        <IeCircuitTableScreenDemo />
        <IeChunkLoaderScreenDemo />
        <IeAutoWorkbenchScreenDemo />
        <IeAssemblerScreenDemo />
        <IeModWorkbenchScreenDemo />
        <IeFluidProducerScreenDemo />
      </>,
    );
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
