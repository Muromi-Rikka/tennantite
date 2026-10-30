// @vitest-environment node
// SSR 硬约束（规格 §1.1）：所有组件服务端渲染不报错、不访问浏览器 API。
// node 环境下若有组件触达 window / document / navigator 会直接抛错。
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  Ae2ChestScreen,
  Ae2CondenserScreen,
  Ae2CraftingCpuScreen,
  Ae2CraftingTerminalScreen,
  Ae2DriveScreen,
  Ae2GrindstoneScreen,
  Ae2InscriberScreen,
  Ae2InterfaceScreen,
  Ae2IoPortScreen,
  Ae2MolecularAssemblerScreen,
  Ae2PatternAccessTerminalScreen,
  Ae2PatternEncodingTerminalScreen,
  Ae2PriorityDialog,
  Ae2QuantumBridgeScreen,
  Ae2SkyChestScreen,
  Ae2SpatialIoPortScreen,
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

  it("renders Ae2PatternEncodingTerminalScreen to static markup", () => {
    for (const mode of ["crafting", "processing"] as const) {
      const html = renderToStaticMarkup(
        <Ae2PatternEncodingTerminalScreen mode={mode} />,
      );
      expect(html.length).toBeGreaterThan(0);
    }
  });

  it("renders Ae2PatternAccessTerminalScreen to static markup", () => {
    const html = renderToStaticMarkup(
      <Ae2PatternAccessTerminalScreen cpus={[{ id: "cpu-0", name: "主 CPU" }]} />,
    );
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2CraftingCpuScreen to static markup", () => {
    const html = renderToStaticMarkup(
      <Ae2CraftingCpuScreen jobs={[{ icon: { icon: "iron-ingot" }, id: "iron" }]} progress={0.4} />,
    );
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2MolecularAssemblerScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2MolecularAssemblerScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2QuantumBridgeScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2QuantumBridgeScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2SpatialIoPortScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2SpatialIoPortScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2IoPortScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2IoPortScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2InterfaceScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2InterfaceScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2CondenserScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2CondenserScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2GrindstoneScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2GrindstoneScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2SkyChestScreen to static markup", () => {
    const html = renderToStaticMarkup(<Ae2SkyChestScreen />);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders Ae2PriorityDialog to static markup", () => {
    const html = renderToStaticMarkup(<Ae2PriorityDialog priority={7} />);
    expect(html.length).toBeGreaterThan(0);
  });
});
