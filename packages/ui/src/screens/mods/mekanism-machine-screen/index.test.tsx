import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MekanismEnergyCubeScreen } from "../mekanism-energy-cube-screen/index";
import {
  MekanismEnrichmentChamberScreen,
  MekanismFormulaicAssemblicatorScreen,
} from "./machines";

describe("mekanism machine screens", () => {
  it("renders machine slots, progress and the Mekanism player inventory", () => {
    const { container } = render(
      <MekanismEnrichmentChamberScreen
        energy={{ max: 10000, value: 6400 }}
        progress={{ progress: 0.5 }}
        slots={{ input: { icon: "iron-ore" }, output: { count: 2, icon: "iron-ingot" } }}
      />,
    );
    expect(screen.getByLabelText("input")).toBeInTheDocument();
    expect(screen.getByLabelText("output")).toBeInTheDocument();
    expect(container.querySelector("[aria-label=\"energy\"]")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(screen.getByRole("progressbar", { name: "progress" })).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "64");
    expect(screen.getByText("富集仓")).toBeInTheDocument();
  });

  it("centers tab icons inside the 26×18 tab", () => {
    render(<MekanismEnrichmentChamberScreen energy={{ max: 10, value: 5 }} />);
    const config = screen.getByLabelText("config");
    const icon = config.querySelector("[data-mek-sprite=\"button/configuration\"]");
    expect(icon).toBeTruthy();
    expect((icon as HTMLElement).style.left).toBe("calc(var(--mc-gui) * 4)");
    expect((icon as HTMLElement).style.top).toBe("calc(var(--mc-gui) * 0)");
  });

  it("opens and closes the side config and upgrade windows", async () => {
    const user = userEvent.setup();
    render(<MekanismEnrichmentChamberScreen energy={{ max: 10, value: 5 }} />);
    await user.click(screen.getByLabelText("config"));
    expect(screen.getByRole("dialog", { name: "配置：能量" })).toBeInTheDocument();
    await user.click(screen.getByLabelText("关闭窗口"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByLabelText("upgrade"));
    expect(screen.getByRole("dialog", { name: "升级" })).toBeInTheDocument();
  });

  it("cycles security and redstone modes with callbacks", async () => {
    const user = userEvent.setup();
    const onSecurityChange = vi.fn();
    const onRedstoneChange = vi.fn();
    render(
      <MekanismEnrichmentChamberScreen
        onRedstoneChange={onRedstoneChange}
        onSecurityChange={onSecurityChange}
        redstone="disabled"
        security="public"
      />,
    );
    await user.click(screen.getByLabelText("security"));
    expect(onSecurityChange).toHaveBeenCalledWith("private");
    await user.click(screen.getByLabelText("redstone"));
    expect(onRedstoneChange).toHaveBeenCalledWith("high");
  });

  it("renders the formulaic assemblicator at 230 GUI px with 18 grid slots", () => {
    render(<MekanismFormulaicAssemblicatorScreen energy={{ max: 10, value: 5 }} />);
    for (let index = 0; index < 9; index += 1) {
      expect(screen.getByLabelText(`input-${index}`)).toBeInTheDocument();
      expect(screen.getByLabelText(`output-${index}`)).toBeInTheDocument();
    }
    expect(screen.getByLabelText("formula")).toBeInTheDocument();
    expect(screen.getByLabelText("large-output")).toBeInTheDocument();
    expect(screen.getByLabelText("recipe-check")).toBeInTheDocument();
    expect(screen.getByLabelText("main-0").style.top).toContain("148");
    expect(screen.getByLabelText("hotbar-0").style.top).toContain("206");
  });

  it("renders the energy cube armor holder and wide gauge", () => {
    render(<MekanismEnergyCubeScreen energy={{ max: 4000000, value: 2400000 }} />);
    for (let index = 0; index < 4; index += 1) {
      expect(screen.getByLabelText(`armor-${index}`)).toBeInTheDocument();
    }
    expect(screen.getByLabelText("offhand")).toBeInTheDocument();
    expect(screen.getByLabelText("charge")).toBeInTheDocument();
    expect(screen.getByLabelText("discharge")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "60");
  });
});
