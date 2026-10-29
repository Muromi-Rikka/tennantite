// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
// node 环境下若有组件触达 window / document / navigator 会直接抛错。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  CreateCrusherScreenDemo,
  CreateFilterScreenDemo,
  CreateMillstoneScreenDemo,
  CreateSchematicTableScreenDemo,
  CreateToolboxScreenDemo,
  CreateValueSettingsPanelDemo,
} from "./demos";

describe("sSR smoke (node env, 规格 §1.1)", () => {
  it("create 五个界面可服务端渲染", () => {
    const html = renderToStaticMarkup(
      <>
        <CreateMillstoneScreenDemo />
        <CreateCrusherScreenDemo />
        <CreateFilterScreenDemo />
        <CreateToolboxScreenDemo />
        <CreateSchematicTableScreenDemo />
        <CreateValueSettingsPanelDemo />
      </>,
    );
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
