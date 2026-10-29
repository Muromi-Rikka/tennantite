// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  IeArcFurnaceScreenDemo,
  IeCapacitorHvScreenDemo,
  IeCokeOvenScreenDemo,
  IeMetalPressScreenDemo,
} from "./demos";

describe("sSR smoke (node env, 规格 §1.1)", () => {
  it("iE 机器屏可服务端渲染", () => {
    const html = renderToStaticMarkup(
      <>
        <IeCokeOvenScreenDemo />
        <IeArcFurnaceScreenDemo />
        <IeMetalPressScreenDemo />
        <IeCapacitorHvScreenDemo />
      </>,
    );
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
