import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2PatternEncodingTerminalScreenDemo } from "./demo";
import { Ae2PatternEncodingTerminalScreen } from "./index";

describe("ae2PatternEncodingTerminalScreen", () => {
  it("渲染 ME 网格、编码区槽位与玩家背包（合成模式）", () => {
    const { container } = render(
      <Ae2PatternEncodingTerminalScreen
        craftGrid={[{ icon: "iron-ingot" }]}
        craftResult={{ icon: "diamond" }}
        items={Array.from({ length: 8 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
        patternIn={{ icon: "charcoal" }}
        patternOut={{ icon: "emerald" }}
        rows={4}
      />,
    );

    // 行数 4 → 高 196 + 72 = 268
    expect(screen.getByLabelText("pattern-terminal-0")).toHaveStyle({
      left: gui(7),
      top: gui(18),
    });
    // 3×3 合成格首槽：(18, 268−157)
    expect(screen.getByLabelText("pattern-craft-0")).toHaveStyle({
      left: gui(18),
      top: gui(111),
    });
    // 合成模式：中间格为结果槽 (110, 268−139)
    expect(screen.getByLabelText("pattern-craft-result")).toHaveStyle({
      left: gui(110),
      top: gui(129),
    });
    expect(screen.queryByLabelText("pattern-output-0")).not.toBeInTheDocument();
    expect(screen.getByLabelText("pattern-in")).toHaveStyle({
      left: gui(147),
      top: gui(106),
    });
    expect(screen.getByLabelText("pattern-out")).toHaveStyle({
      left: gui(147),
      top: gui(149),
    });
    expect(container.querySelectorAll("[aria-label^=\"pattern-craft-\"]").length).toBe(10);
    expect(container.querySelectorAll("[aria-label^=\"pattern-terminal-\"]").length).toBe(36);

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(185) });
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(243) });
    expect(screen.getByLabelText("切换到处理模式")).toBeInTheDocument();
    expect(screen.getByLabelText("编码图样")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("处理模式：三格输出 + 底图切换", () => {
    render(
      <Ae2PatternEncodingTerminalScreen
        mode="processing"
        outputs={[{ icon: "iron-ingot" }, { icon: "gold-ingot" }, { icon: "diamond" }]}
      />,
    );

    expect(screen.getByLabelText("pattern-output-0")).toHaveStyle({
      left: gui(110),
      top: gui(111),
    });
    expect(screen.getByLabelText("pattern-output-2")).toHaveStyle({
      left: gui(110),
      top: gui(147),
    });
    expect(screen.queryByLabelText("pattern-craft-result")).not.toBeInTheDocument();
    expect(screen.getByLabelText("切换到合成模式")).toBeInTheDocument();
  });

  it("模式切换与编码回调", async () => {
    const user = userEvent.setup();
    const onModeChange = vi.fn();
    const onEncode = vi.fn();
    const first = render(
      <Ae2PatternEncodingTerminalScreen onEncode={onEncode} onModeChange={onModeChange} />,
    );

    await user.click(screen.getByLabelText("切换到处理模式"));
    expect(onModeChange).toHaveBeenCalledWith("processing");
    first.unmount();

    render(<Ae2PatternEncodingTerminalScreen mode="processing" onModeChange={onModeChange} />);
    await user.click(screen.getByLabelText("切换到合成模式"));
    expect(onModeChange).toHaveBeenCalledWith("crafting");
  });

  it("demo 渲染", () => {
    render(<Ae2PatternEncodingTerminalScreenDemo />);
    expect(screen.getAllByText("样式编码终端").length).toBe(2);
  });
});
