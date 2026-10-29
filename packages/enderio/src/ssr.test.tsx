// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  EioAlloySmelterScreenDemo,
  EioCapacitorBankScreenDemo,
  EioEnergyBarDemo,
  EioExperienceBarDemo,
  EioGrindingBallDemo,
  EioIconButtonDemo,
  EioMachineScreenDemo,
  EioMachineStateDemo,
  EioSagMillScreenDemo,
  EioSoulBinderScreenDemo,
  EioSpriteDemo,
  EioStirlingGeneratorScreenDemo,
} from "./demos";

describe("sSR smoke (node env, 规格 §1.1)", () => {
  it("eNDER IO 组件与机器屏可服务端渲染", () => {
    const html = renderToStaticMarkup(
      <>
        <EioSpriteDemo />
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
      </>,
    );
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
