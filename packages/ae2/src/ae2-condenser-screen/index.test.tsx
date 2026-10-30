import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2CondenserScreenDemo } from "./demo";
import { Ae2CondenserScreen } from "./index";

describe("ae2CondenserScreen", () => {
  it("渲染三个槽位、储能进度条与玩家背包", () => {
    const { container } = render(
      <Ae2CondenserScreen
        output={{ icon: "diamond" }}
        progress={0.4}
        storageCell={{ icon: "emerald" }}
        trash={{ icon: "iron-ingot" }}
      />,
    );

    for (const label of ["condenser-trash", "condenser-output", "condenser-storage-cell"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    // 槽框由 AE2 贴图烘焙，热区与 GuiCondenser 槽位坐标一致
    expect(screen.getByLabelText("condenser-trash")).toHaveStyle({
      left: gui(51),
      top: gui(52),
    });
    expect(screen.getByLabelText("condenser-output")).toHaveStyle({
      left: gui(105),
      top: gui(52),
    });
    expect(screen.getByLabelText("condenser-storage-cell")).toHaveStyle({
      left: gui(101),
      top: gui(26),
    });
    expect(container.querySelectorAll("[data-mod-sprite]").length).toBeGreaterThan(1);

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(114) });
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(172) });

    const progress = screen.getByRole("progressbar", { name: "储能进度" });
    expect(progress).toHaveAttribute("aria-valuenow", "0.4");
    expect(progress).toHaveStyle({ left: gui(120), top: gui(25) });

    expect(screen.getByLabelText("输出模式：垃圾")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("输出与模式回调", async () => {
    const user = userEvent.setup();
    const onTakeOutput = vi.fn();
    const onModeClick = vi.fn();
    render(<Ae2CondenserScreen modeLabel="能量细胞" onModeClick={onModeClick} onTakeOutput={onTakeOutput} />);

    await user.click(screen.getByLabelText("condenser-output"));
    expect(onTakeOutput).toHaveBeenCalledOnce();

    await user.click(screen.getByLabelText("输出模式：能量细胞"));
    expect(onModeClick).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<Ae2CondenserScreenDemo />);
    expect(screen.getByText("物质冷凝器")).toBeInTheDocument();
  });
});
