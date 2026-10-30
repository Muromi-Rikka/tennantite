import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeAssemblerScreenDemo } from "../demos";
import { IeAssemblerScreen } from "./index";

describe("ieAssemblerScreen", () => {
  it("渲染 48 个机器槽位（27 幽灵配方 + 3 输出 + 18 存储）与 230 宽背景", () => {
    const { container } = render(
      <IeAssemblerScreen
        outputs={[{}, {}, {}]}
        patterns={[Array.from({ length: 9 }, () => ({})), Array.from({ length: 9 }, () => ({})), Array.from({ length: 9 }, () => ({}))]}
        storage={Array.from({ length: 18 }, () => ({}))}
      />,
    );
    expect(container.querySelectorAll("[aria-label^=\"assembler-\"]")).toHaveLength(48);
    const background = container.querySelector("[data-ie-sprite=\"assembler\"]") as HTMLElement;
    expect(background.style.width).toBe("calc(var(--mc-gui) * 230)");
  });

  it("槽位框坐标 = AssemblerMenu slot - 1（配方 1 首槽 67,7 → 66,6；输出 2 27+2*58=143,64 → 142,63）", () => {
    render(<IeAssemblerScreen patterns={[Array.from({ length: 9 }, () => ({}))]} />);
    expect(screen.getByLabelText("assembler-pattern-0-0").style.left).toBe("calc(var(--mc-gui) * 8)");
    expect(screen.getByLabelText("assembler-pattern-1-0").style.left).toBe("calc(var(--mc-gui) * 66)");
    expect(screen.getByLabelText("assembler-output-2").style.left).toBe("calc(var(--mc-gui) * 142)");
  });

  it("清空按钮与递归开关回调", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const onRecursiveToggle = vi.fn();
    const { container } = render(
      <IeAssemblerScreen onClear={onClear} onRecursiveToggle={onRecursiveToggle} patterns={[Array.from({ length: 9 }, () => ({})), Array.from({ length: 9 }, () => ({})), Array.from({ length: 9 }, () => ({}))]} recursive />,
    );
    expect(container.querySelectorAll("[data-ie-assembler-clear]")).toHaveLength(3);
    await user.click(screen.getByLabelText("清空配方 1"));
    expect(onClear).toHaveBeenCalledWith(1);
    await user.click(screen.getByLabelText("递归合成（开）"));
    expect(onRecursiveToggle).toHaveBeenCalledOnce();
  });

  it("罐与能量条渲染", () => {
    render(
      <IeAssemblerScreen
        energy={{ max: 32000, value: 20000 }}
        tankValues={[{ max: 8000, tint: "#3a5cc8", value: 4000 }, null, { max: 8000, tint: "#7a8f3a", value: 6000 }]}
      />,
    );
    expect(screen.getByRole("progressbar", { name: "装配器罐 1" })).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getByRole("progressbar", { name: "装配器罐 3" })).toHaveAttribute("aria-valuenow", "75");
    expect(screen.getByRole("progressbar", { name: "装配器能量" })).toHaveAttribute("aria-valuenow", "63");
  });

  it("demo 渲染", () => {
    render(<IeAssemblerScreenDemo />);
    expect(screen.getByText("装配器")).toBeInTheDocument();
  });
});
