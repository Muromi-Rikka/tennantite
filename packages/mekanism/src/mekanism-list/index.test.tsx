import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { MekanismListRow } from "./index";

import { MekanismList } from "./index";

const ROWS: MekanismListRow[] = [
  { icon: "item/upgrade/speed", id: "speed", label: "速度升级" },
  { id: "energy", label: "能量升级" },
  { icon: "item/upgrade/filter", id: "filter", label: "过滤升级" },
  { id: "muffling", label: "消音升级" },
  { id: "anchor", label: "锚点升级" },
];

describe("mekanismList", () => {
  it("按可见行数截断渲染（数据全量注入）", () => {
    render(<MekanismList left={8} rows={ROWS} top={8} visibleRows={3} width={120} />);
    expect(screen.getByRole("option", { name: "速度升级" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "过滤升级" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "消音升级" })).not.toBeInTheDocument();
    const list = screen.getByRole("listbox");
    expect(list.dataset.mekListVariant).toBe("list");
    expect(list.style.height).toBe(`calc(var(--mc-gui) * ${3 * 12 + 2})`);
  });

  it("选中行使用 list/selected 底图与选中图标槽", () => {
    const { container } = render(
      <MekanismList
        left={8}
        rows={ROWS}
        selectedId="speed"
        top={8}
        visibleRows={3}
        width={120}
      />,
    );
    const selected = screen.getByRole("option", { name: "速度升级" });
    expect(selected.getAttribute("aria-selected")).toBe("true");
    expect(selected.querySelectorAll("[data-mek-sprite='list/selected']")).toHaveLength(1);
    expect(selected.querySelectorAll("[data-mek-sprite='list/slot_selected']")).toHaveLength(1);
    const normal = screen.getByRole("option", { name: "过滤升级" });
    expect(normal.querySelectorAll("[data-mek-sprite='list/base']")).toHaveLength(1);
    expect(normal.querySelectorAll("[data-mek-sprite='list/slot']")).toHaveLength(1);
    expect(container.querySelectorAll("[data-mek-sprite='list/hovered']")).toHaveLength(2);
    expect(container.querySelectorAll("[data-mek-sprite='list/slot_hovered']")).toHaveLength(1);
  });

  it("行点击回调携带行 id", () => {
    const onRowClick = vi.fn();
    render(<MekanismList left={8} onRowClick={onRowClick} rows={ROWS} top={8} visibleRows={3} width={120} />);
    fireEvent.click(screen.getByRole("option", { name: "过滤升级" }));
    expect(onRowClick).toHaveBeenCalledWith("filter");
  });

  it("list 变体滚动条为细槽（scroll/list_border + scroll/list_bar），把手随 scroll 移动", () => {
    const { container, rerender } = render(
      <MekanismList left={8} rows={ROWS} scroll={0} top={8} visibleRows={3} width={120} />,
    );
    expect(container.querySelectorAll("[data-mek-sprite='scroll/list_border']")).toHaveLength(1);
    const bar = container.querySelector("[data-mek-sprite='scroll/list_bar']") as HTMLElement;
    expect(bar.style.top).toBe("calc(var(--mc-gui) * 2)");
    rerender(<MekanismList left={8} rows={ROWS} scroll={1} top={8} visibleRows={3} width={120} />);
    const moved = container.querySelector("[data-mek-sprite='scroll/list_bar']") as HTMLElement;
    // 高 38：把手行程 = 38 - 4 - 4 = 30，scroll=1 → top = 2 + 30 = 32
    expect(moved.style.top).toBe(`calc(var(--mc-gui) * ${2 + 38 - 4 - 4})`);
  });

  it("filter 变体使用 list/filter/base 行与 element_holder 滚动槽", () => {
    const { container } = render(
      <MekanismList
        left={8}
        rows={ROWS}
        scroll={0.5}
        top={8}
        variant="filter"
        visibleRows={2}
        width={170}
      />,
    );
    const list = screen.getByRole("listbox");
    expect(list.dataset.mekListVariant).toBe("filter");
    expect(container.querySelectorAll("[data-mek-sprite='list/filter/base']")).toHaveLength(2);
    expect(container.querySelectorAll("[data-mek-sprite='list/filter/hovered']")).toHaveLength(2);
    expect(container.querySelectorAll("[data-mek-sprite='element_holder']")).toHaveLength(1);
    // 有溢出 → 可用把手 scroll/bar；行程 = (2*29+2) - 2 - 15 = 44，top = 1 + 0.5*44 = 23
    const bar = container.querySelector("[data-mek-sprite='scroll/bar']") as HTMLElement;
    expect(bar.style.top).toBe(`calc(var(--mc-gui) * ${1 + 0.5 * (2 * 29 + 2 - 2 - 15)})`);
  });

  it("无溢出时 filter 变体把手为 scroll/bar_inactive", () => {
    const { container } = render(
      <MekanismList left={8} rows={ROWS.slice(0, 2)} top={8} variant="filter" visibleRows={2} width={170} />,
    );
    expect(container.querySelectorAll("[data-mek-sprite='scroll/bar_inactive']")).toHaveLength(1);
    expect(container.querySelector("[data-mek-sprite='scroll/bar']")).toBeNull();
  });

  it("scroll 推进可见窗口起点", () => {
    render(<MekanismList left={8} rows={ROWS} scroll={1} top={8} visibleRows={3} width={120} />);
    expect(screen.queryByRole("option", { name: "速度升级" })).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: "锚点升级" })).toBeInTheDocument();
  });
});
