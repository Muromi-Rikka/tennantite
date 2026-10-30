import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { MekanismTeleporterFrequencyRow } from "./index";
import { MekanismTeleporterScreen } from "./index";

const FREQUENCIES: MekanismTeleporterFrequencyRow[] = [
  { color: "#59c15f", id: "home", label: "home (Steve)", owner: "Steve", security: "public" as const },
  { id: "base", label: "base (Alex)", owner: "Alex", security: "private" as const },
  { id: "hub", label: "hub (Steve)", owner: "Steve", security: "protected" as const },
  { id: "farm", label: "farm (Alex)", owner: "Alex", security: "public" as const },
];

describe("mekanismTeleporterScreen", () => {
  it("renders title, status icon and frequency list at 176×240", () => {
    const { container } = render(<MekanismTeleporterScreen frequencies={FREQUENCIES} status="ready" />);
    expect(screen.getByText("传送器")).toBeInTheDocument();
    expect(container.querySelector(".relative.inline-block")).toHaveStyle({ height: "calc(var(--mc-gui) * 240)", width: "calc(var(--mc-gui) * 176)" });
    expect(screen.getByLabelText("传送器状态：就绪")).toBeInTheDocument();
    expect(container.querySelector("[data-mek-sprite='teleporter/ready']")).toBeTruthy();
    expect(screen.getByRole("option", { name: "home (Steve)" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "farm (Alex)" })).not.toBeInTheDocument();
    expect(screen.getByText("频率：无")).toBeInTheDocument();
    expect(container.querySelector("[aria-label='energy']")).toBeTruthy();
    expect(screen.getByRole("progressbar", { name: "能量" })).toBeInTheDocument();
  });

  it("shows the current frequency details and color", () => {
    render(<MekanismTeleporterScreen currentFrequency={FREQUENCIES[0]} />);
    expect(screen.getByText("频率：home (Steve)")).toBeInTheDocument();
    expect(screen.getByText("所有者：Steve")).toBeInTheDocument();
    expect(screen.getByText("安全：公开")).toBeInTheDocument();
    expect(document.querySelector("div[style*='rgb(89, 193, 95)']")).toBeTruthy();
  });

  it("selects a frequency row and reports set/delete", async () => {
    const onFrequencySelect = vi.fn();
    const onSetFrequency = vi.fn();
    const onDeleteFrequency = vi.fn();
    render(
      <MekanismTeleporterScreen
        frequencies={FREQUENCIES}
        onDeleteFrequency={onDeleteFrequency}
        onFrequencySelect={onFrequencySelect}
        onSetFrequency={onSetFrequency}
        selectedFrequencyId="base"
      />,
    );
    await userEvent.click(screen.getByRole("option", { name: "home (Steve)" }));
    expect(onFrequencySelect).toHaveBeenCalledWith("home");
    await userEvent.click(screen.getByRole("button", { name: "设置" }));
    expect(onSetFrequency).toHaveBeenCalledWith("base (Alex)");
    await userEvent.click(screen.getByRole("button", { name: "删除" }));
    expect(onDeleteFrequency).toHaveBeenCalledTimes(1);
  });

  it("submits a new frequency name", () => {
    const onSetFrequency = vi.fn();
    render(<MekanismTeleporterScreen onSetFrequency={onSetFrequency} />);
    fireEvent.change(screen.getByLabelText("设置频率"), { target: { value: "outpost" } });
    fireEvent.click(screen.getByRole("button", { name: "确认设置" }));
    expect(onSetFrequency).toHaveBeenCalledWith("outpost");
  });

  it("switches frequency list tabs with disabled active tab", async () => {
    const onSecurityTabChange = vi.fn();
    render(<MekanismTeleporterScreen onSecurityTabChange={onSecurityTabChange} securityTab="private" />);
    expect(screen.getByRole("button", { name: "私有频率" }).className).toContain("opacity-50");
    await userEvent.click(screen.getByRole("button", { name: "公开频率" }));
    expect(onSecurityTabChange).toHaveBeenCalledWith("public");
  });

  it("opens the side config window from the tab bar", async () => {
    render(<MekanismTeleporterScreen />);
    await userEvent.click(screen.getByLabelText("config"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
