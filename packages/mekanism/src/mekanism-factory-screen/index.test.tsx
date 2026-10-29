import type { ScreenSlot } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  MekanismEnrichingFactoryScreen,
  MekanismInjectingFactoryScreen,
  MekanismSawingFactoryScreen,
} from "./factories";

describe("mekanism factory screens", () => {
  it("renders the ultimate enriching factory with nine process columns", () => {
    const { container } = render(
      <MekanismEnrichingFactoryScreen
        energy={{ max: 10000, value: 6400 }}
        progress={{ "process-0": 0.5 }}
        slots={{ "input-0": { icon: "iron-ore" }, "output-0": { count: 2, icon: "iron-ingot" } }}
        tier="ultimate"
      />,
    );
    expect(screen.getByText("终极富集工厂")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"input-\"]")).toHaveLength(9);
    expect(container.querySelectorAll("[aria-label^=\"output-\"]")).toHaveLength(9);
    expect(screen.getAllByRole("progressbar", { name: /^process-/ })).toHaveLength(9);
    expect(screen.getByRole("progressbar", { name: "process-0" })).toHaveAttribute("aria-valuenow", "50");
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect((container.firstElementChild as HTMLElement).style.width).toBe("calc(var(--mc-gui) * 210)");
  });

  it("keeps the basic tier at three process columns on a 176 px canvas", () => {
    const { container } = render(<MekanismEnrichingFactoryScreen tier="basic" />);
    expect(container.querySelectorAll("[aria-label^=\"input-\"]")).toHaveLength(3);
    expect(container.querySelectorAll("[aria-label^=\"output-\"]")).toHaveLength(3);
    expect((container.firstElementChild as HTMLElement).style.width).toBe("calc(var(--mc-gui) * 176)");
    expect(screen.getByText("基础富集工厂")).toBeInTheDocument();
  });

  it("renders the chemical bar, dump button and extra slot for injecting factories", () => {
    const { container } = render(
      <MekanismInjectingFactoryScreen chemical={{ amount: 30000, capacity: 60000 }} tier="basic" />,
    );
    expect(screen.getByRole("progressbar", { name: "化学物质" })).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getByLabelText("倾倒化学物质")).toBeInTheDocument();
    expect(container.querySelector("[aria-label=\"extra\"]")).toBeInTheDocument();
    expect(screen.getByText("基础压射工厂")).toBeInTheDocument();
  });

  it("renders the second output row for sawing factories", () => {
    const { container } = render(<MekanismSawingFactoryScreen tier="basic" />);
    expect(container.querySelectorAll("[aria-label^=\"secondary-output-\"]")).toHaveLength(3);
    expect(screen.getByText("基础锯木工厂")).toBeInTheDocument();
  });

  it("toggles the sorting tab text and reports the change", async () => {
    const user = userEvent.setup();
    const onSortingChange = vi.fn();
    render(<MekanismEnrichingFactoryScreen onSortingChange={onSortingChange} tier="advanced" />);
    const sorting = screen.getByLabelText("sorting");
    expect(sorting).toHaveTextContent("关");
    await user.click(sorting);
    expect(sorting).toHaveTextContent("开");
    expect(onSortingChange).toHaveBeenCalledWith(true);
  });

  it("opens and closes the side config and upgrade windows", async () => {
    const user = userEvent.setup();
    render(<MekanismEnrichingFactoryScreen energy={{ max: 10, value: 5 }} tier="elite" />);
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
      <MekanismEnrichingFactoryScreen
        onRedstoneChange={onRedstoneChange}
        onSecurityChange={onSecurityChange}
        tier="basic"
      />,
    );
    await user.click(screen.getByLabelText("security"));
    expect(onSecurityChange).toHaveBeenCalledWith("private");
    await user.click(screen.getByLabelText("redstone"));
    expect(onRedstoneChange).toHaveBeenCalledWith("high");
  });

  it("forwards slot clicks with the factory role", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    const item: ScreenSlot = { icon: "iron-ingot" };
    render(<MekanismEnrichingFactoryScreen onSlotClick={onSlotClick} slots={{ "input-1": item }} tier="advanced" />);
    await user.click(screen.getByLabelText("input-1"));
    expect(onSlotClick).toHaveBeenCalledWith("input-1", item);
  });
});
