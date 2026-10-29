// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
// node 环境下若有组件触达 window / document / navigator 会直接抛错。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  ThermalCacheScreenDemo,
  ThermalEnergyCellScreenDemo,
  ThermalRedstoneFurnaceIdleDemo,
  ThermalRedstoneFurnaceScreenDemo,
} from "./demos";

describe("sSR smoke (node env, 规格 §1.1)", () => {
  it("thermal 三个界面均可服务端渲染", () => {
    const html = renderToStaticMarkup(
      <>
        <ThermalRedstoneFurnaceScreenDemo />
        <ThermalRedstoneFurnaceIdleDemo />
        <ThermalEnergyCellScreenDemo />
        <ThermalCacheScreenDemo />
      </>,
    );
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
