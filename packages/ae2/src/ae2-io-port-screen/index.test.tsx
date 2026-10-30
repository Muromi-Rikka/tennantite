import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2IoPortScreenDemo } from "./demo";
import { Ae2IoPortScreen } from "./index";

describe("ae2IoPortScreen", () => {
  it("渲染输入/输出元件槽、升级槽与玩家背包", () => {
    const { container } = render(
      <Ae2IoPortScreen
        inputCells={[{ icon: "iron-ingot" }]}
        outputCells={[{ icon: "gold-ingot" }]}
        upgrades={[{ icon: "emerald" }]}
      />,
    );

    expect(screen.getByLabelText("io-port-input-0")).toHaveStyle({
      left: gui(19),
      top: gui(17),
    });
    // 第二列输入：(19+18, 17+18)
    expect(screen.getByLabelText("io-port-input-3")).toHaveStyle({
      left: gui(37),
      top: gui(35),
    });
    expect(screen.getByLabelText("io-port-output-0")).toHaveStyle({
      left: gui(122),
      top: gui(17),
    });
    expect(screen.getByLabelText("io-port-output-5")).toHaveStyle({
      left: gui(140),
      top: gui(53),
    });
    expect(screen.getByLabelText("io-port-upgrade-0")).toHaveStyle({
      left: gui(187),
      top: gui(8),
    });
    expect(container.querySelectorAll("[aria-label^=\"io-port-upgrade-\"]").length).toBe(3);
    expect(container.querySelectorAll("[aria-label^=\"io-port-input-\"]").length).toBe(6);
    expect(container.querySelectorAll("[aria-label^=\"io-port-output-\"]").length).toBe(6);
    expect(screen.getByLabelText("操作模式")).toBeInTheDocument();
    expect(screen.getByLabelText("满度模式")).toBeInTheDocument();
    expect(screen.getByLabelText("红石模式")).toBeInTheDocument();

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(83) });
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(141) });
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
  });

  it("元件槽与升级槽回调", async () => {
    const user = userEvent.setup();
    const onInputCellClick = vi.fn();
    const onOutputCellClick = vi.fn();
    const onUpgradeSlotClick = vi.fn();
    render(
      <Ae2IoPortScreen
        inputCells={[{ icon: "iron-ingot" }]}
        onInputCellClick={onInputCellClick}
        onOutputCellClick={onOutputCellClick}
        onUpgradeSlotClick={onUpgradeSlotClick}
        outputCells={[{ icon: "gold-ingot" }]}
        upgrades={[{ icon: "emerald" }]}
      />,
    );

    await user.click(screen.getByLabelText("io-port-input-0"));
    expect(onInputCellClick).toHaveBeenCalledWith(0, expect.objectContaining({ icon: "iron-ingot" }));

    await user.click(screen.getByLabelText("io-port-output-0"));
    expect(onOutputCellClick).toHaveBeenCalledWith(0, expect.objectContaining({ icon: "gold-ingot" }));

    await user.click(screen.getByLabelText("io-port-upgrade-0"));
    expect(onUpgradeSlotClick).toHaveBeenCalledWith(0, expect.objectContaining({ icon: "emerald" }));
  });

  it("demo 渲染", () => {
    render(<Ae2IoPortScreenDemo />);
    expect(screen.getByText("IO 端口")).toBeInTheDocument();
  });
});
