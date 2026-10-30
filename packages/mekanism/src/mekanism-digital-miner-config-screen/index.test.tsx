import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { MekanismListRow } from "../mekanism-list/index";
import { MekanismDigitalMinerConfigScreen } from "./index";

const FILTERS: MekanismListRow[] = [
  { icon: "item/upgrade/filter", id: "iron", label: "铁矿石" },
  { id: "tag", label: "#forge:ores" },
  { icon: "item/upgrade/filter", id: "mod", label: "mekanism" },
  { id: "gem", label: "钻石" },
  { id: "extra", label: "绿宝石" },
];

describe("mekanismDigitalMinerConfigScreen", () => {
  it("renders info screen, filter list and inputs at 276×254", () => {
    const { container } = render(<MekanismDigitalMinerConfigScreen filterCount="2" filters={FILTERS} maxY="320" minY="-64" radius="10" />);
    expect(screen.getByText("数字采矿机过滤器")).toBeInTheDocument();
    expect(container.querySelector(".relative.inline-block")).toHaveStyle({ height: "calc(var(--mc-gui) * 254)", width: "calc(var(--mc-gui) * 276)" });
    expect(screen.getByText("过滤器：2")).toBeInTheDocument();
    expect(screen.getByText("半径：10")).toBeInTheDocument();
    expect(screen.getByText("最小 Y：-64")).toBeInTheDocument();
    expect(screen.getByText("最大 Y：320")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "铁矿石" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "绿宝石" })).not.toBeInTheDocument();
    expect(screen.getByRole("listbox").dataset.mekListVariant).toBe("filter");
    expect(container.querySelectorAll("[aria-label^='hotbar-']")).toHaveLength(9);
  });

  it("reports filter selection, new filter and back", async () => {
    const onFilterClick = vi.fn();
    const onNewFilter = vi.fn();
    const onBack = vi.fn();
    render(<MekanismDigitalMinerConfigScreen filters={FILTERS} onBack={onBack} onFilterClick={onFilterClick} onNewFilter={onNewFilter} />);
    await userEvent.click(screen.getByRole("option", { name: "铁矿石" }));
    expect(onFilterClick).toHaveBeenCalledWith("iron");
    await userEvent.click(screen.getByRole("button", { name: "新建过滤器" }));
    expect(onNewFilter).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByRole("button", { name: "返回" }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("reports numeric field edits", () => {
    const onRadiusChange = vi.fn();
    const onMinYChange = vi.fn();
    const onMaxYChange = vi.fn();
    render(
      <MekanismDigitalMinerConfigScreen
        maxY="256"
        minY="0"
        onMaxYChange={onMaxYChange}
        onMinYChange={onMinYChange}
        onRadiusChange={onRadiusChange}
        radius="32"
      />,
    );
    fireEvent.change(screen.getByLabelText("半径"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("最小 Y"), { target: { value: "-32" } });
    fireEvent.change(screen.getByLabelText("最大 Y"), { target: { value: "319" } });
    expect(onRadiusChange).toHaveBeenCalledWith("10");
    expect(onMinYChange).toHaveBeenCalledWith("-32");
    expect(onMaxYChange).toHaveBeenCalledWith("319");
  });

  it("toggles inverse mode and replacement requirement", async () => {
    const onInverseChange = vi.fn();
    const onToggleRequireReplacement = vi.fn();
    render(
      <MekanismDigitalMinerConfigScreen
        onInverseChange={onInverseChange}
        onToggleRequireReplacement={onToggleRequireReplacement}
        replaceTarget={{ icon: "stone-block" }}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "反向挖掘" }));
    expect(onInverseChange).toHaveBeenCalledWith(true);
    await userEvent.click(screen.getByRole("button", { name: "要求替换方块" }));
    expect(onToggleRequireReplacement).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("inverse-replace")).toBeInTheDocument();
  });
});
