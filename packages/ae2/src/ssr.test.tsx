// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
// node 环境下若有组件触达 window / document / navigator 会直接抛错。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  Ae2ChestScreen,
  Ae2CraftingTerminalScreen,
  Ae2DriveScreen,
  Ae2InscriberScreen,
  Ae2TerminalScreen,
} from "./index";

describe("ae2 ssr", () => {
  it("renders Ae2TerminalScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2TerminalScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2CraftingTerminalScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2CraftingTerminalScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2InscriberScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2InscriberScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2DriveScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2DriveScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2ChestScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2ChestScreen />);
    expect(html.length).toBeGreaterThan(0);
  });
});
