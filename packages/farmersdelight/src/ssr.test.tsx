// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  FdComfortOverlayDemo,
  FdCookingPotScreenDemo,
  FdCookingProgressDemo,
  FdHeatIndicatorDemo,
  FdHungerOverlayDemo,
  FdRecipeBookButtonDemo,
  FdSpriteDemo,
} from "./demos";

describe("sSR smoke (node env, 规格 §1.1)", () => {
  it("fARMER'S DELIGHT 组件与厨锅界面可服务端渲染", () => {
    const html = renderToStaticMarkup(
      <>
        <FdSpriteDemo />
        <FdHeatIndicatorDemo />
        <FdCookingProgressDemo />
        <FdRecipeBookButtonDemo />
        <FdHungerOverlayDemo />
        <FdComfortOverlayDemo />
        <FdCookingPotScreenDemo />
      </>,
    );
    expect(typeof html).toBe("string");
    expect(html).toContain("data-fd-machine");
    expect(html).toContain("厨锅");
  });
});
