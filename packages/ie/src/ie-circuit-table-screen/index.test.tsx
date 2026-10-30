import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IeCircuitTableScreenDemo } from "../demos";
import { IeCircuitTableScreen } from "./index";

describe("ieCircuitTableScreen", () => {
  it("渲染 5 个机器槽位、234×182 背景贴图与玩家背包", () => {
    const { container } = render(<IeCircuitTableScreen />);
    expect(container.querySelectorAll("[aria-label^=\"circuit-table-\"]")).toHaveLength(5);
    expect(container.querySelector("[data-ie-sprite=\"circuit_table\"]")).not.toBeNull();
    const background = container.querySelector("[data-ie-sprite=\"circuit_table\"]") as HTMLElement;
    expect(background.style.width).toBe("calc(var(--mc-gui) * 234)");
  });

  it("槽位框坐标 = CircuitTableMenu slot - 1（PCB 8,14 → 7,13；输出 194,56 → 193,55）", () => {
    render(<IeCircuitTableScreen />);
    expect(screen.getByLabelText("circuit-table-pcb").style.top).toBe("calc(var(--mc-gui) * 13)");
    expect(screen.getByLabelText("circuit-table-output").style.left).toBe("calc(var(--mc-gui) * 193)");
  });

  it("操作符列表、寄存器按钮与名称框渲染", () => {
    render(
      <IeCircuitTableScreen
        inputRegisters={[0, 3]}
        name="门控逻辑"
        operators={["AND", "OR", "NOT"]}
        outputRegister={5}
        selectedOperator={0}
      />,
    );
    expect(screen.getByRole("listbox", { name: "操作符列表" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "AND" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByLabelText("输入寄存器 0").dataset.ieRegister).toBe("0");
    expect(screen.getByLabelText("输出寄存器 0").dataset.ieRegister).toBe("5");
    expect(screen.getByLabelText("电路板名称")).toHaveValue("门控逻辑");
  });

  it("能量条渲染", () => {
    render(<IeCircuitTableScreen energy={{ max: 32000, value: 18000 }} />);
    expect(screen.getByRole("progressbar", { name: "电路工作台能量" })).toHaveAttribute("aria-valuenow", "56");
  });

  it("demo 渲染", () => {
    render(<IeCircuitTableScreenDemo />);
    expect(screen.getByText("电路工作台")).toBeInTheDocument();
  });
});
