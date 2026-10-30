import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2InterfaceScreenDemo } from "./demo";
import { Ae2InterfaceScreen } from "./index";

describe("ae2InterfaceScreen", () => {
  it("渲染配置/存储/图样槽、升级槽与玩家背包", () => {
    const { container } = render(
      <Ae2InterfaceScreen
        config={[{ icon: "iron-ingot" }]}
        patterns={[{ icon: "diamond" }]}
        storage={[{ icon: "gold-ingot" }]}
        upgrades={[{ icon: "emerald" }]}
      />,
    );

    expect(screen.getByLabelText("interface-config-0")).toHaveStyle({
      left: gui(8),
      top: gui(35),
    });
    expect(screen.getByLabelText("interface-config-8")).toHaveStyle({
      left: gui(152),
      top: gui(35),
    });
    expect(screen.getByLabelText("interface-storage-0")).toHaveStyle({
      left: gui(8),
      top: gui(53),
    });
    expect(screen.getByLabelText("interface-pattern-0")).toHaveStyle({
      left: gui(8),
      top: gui(97),
    });
    // 第 4 行末槽：(8 + 8·18, 97 + 3·18)
    expect(screen.getByLabelText("interface-pattern-35")).toHaveStyle({
      left: gui(152),
      top: gui(151),
    });
    expect(screen.getByLabelText("interface-upgrade-0")).toHaveStyle({
      left: gui(187),
      top: gui(8),
    });
    expect(container.querySelectorAll("[aria-label^=\"interface-config-\"]").length).toBe(9);
    expect(container.querySelectorAll("[aria-label^=\"interface-storage-\"]").length).toBe(9);
    expect(container.querySelectorAll("[aria-label^=\"interface-pattern-\"]").length).toBe(36);
    expect(container.querySelectorAll("[aria-label^=\"interface-upgrade-\"]").length).toBe(4);
    expect(screen.getByLabelText("优先级")).toBeInTheDocument();
    expect(screen.getByText("配置")).toBeInTheDocument();
    expect(screen.getByText("存储物品")).toBeInTheDocument();
    expect(screen.getByText("图样")).toBeInTheDocument();

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(173) });
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(231) });
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
  });

  it("样板扩展 2 行模式", () => {
    render(<Ae2InterfaceScreen patternRows={2} />);
    expect(screen.queryByLabelText("interface-pattern-35")).not.toBeInTheDocument();
    expect(screen.getByLabelText("interface-pattern-17")).toBeInTheDocument();
  });

  it("槽位与优先级回调", async () => {
    const user = userEvent.setup();
    const onPatternSlotClick = vi.fn();
    const onPriority = vi.fn();
    render(
      <Ae2InterfaceScreen
        onPatternSlotClick={onPatternSlotClick}
        onPriority={onPriority}
        patterns={[{ icon: "diamond" }]}
      />,
    );

    await user.click(screen.getByLabelText("interface-pattern-0"));
    expect(onPatternSlotClick).toHaveBeenCalledWith(0, expect.objectContaining({ icon: "diamond" }));

    await user.click(screen.getByLabelText("优先级"));
    expect(onPriority).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<Ae2InterfaceScreenDemo />);
    expect(screen.getByText("接口")).toBeInTheDocument();
  });
});
