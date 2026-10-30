import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IeClocheScreenDemo } from "../demos";
import { IeClocheScreen } from "./index";

describe("ieClocheScreen", () => {
  it("渲染 7 个机器槽位、背景贴图与玩家背包", () => {
    const { container } = render(<IeClocheScreen outputs={[{}, {}, {}, {}]} soil={{}} />);
    expect(container.querySelectorAll("[aria-label^=\"cloche-\"]")).toHaveLength(7);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelector("[data-ie-sprite=\"cloche\"]")).not.toBeNull();
  });

  it("槽位框坐标 = ClocheMenu slot - 1（种子 62,34 → 61,33；输出 116,34 → 115,33）", () => {
    render(<IeClocheScreen seed={{}} />);
    expect(screen.getByLabelText("cloche-seed").style.top).toBe("calc(var(--mc-gui) * 33)");
    expect(screen.getByLabelText("cloche-output-0").style.left).toBe("calc(var(--mc-gui) * 115)");
  });

  it("水罐、能量、肥料条与生长进度渲染", () => {
    render(
      <IeClocheScreen
        energy={{ max: 32000, value: 24000 }}
        fertilizer={{ amount: 8000, max: 10000 }}
        process={0.45}
        tank={{ max: 10000, tint: "#3a5cc8", value: 6000 }}
      />,
    );
    expect(screen.getByRole("progressbar", { name: "温室水罐" })).toHaveAttribute("aria-valuenow", "60");
    expect(screen.getByRole("progressbar", { name: "温室能量" })).toHaveAttribute("aria-valuenow", "75");
    expect(screen.getByRole("progressbar", { name: "温室肥料" })).toHaveAttribute("aria-valuenow", "80");
    expect(screen.getByRole("progressbar", { name: "温室生长进度" })).toHaveAttribute("aria-valuenow", "0.45");
  });

  it("demo 渲染", () => {
    render(<IeClocheScreenDemo />);
    expect(screen.getByText("温室")).toBeInTheDocument();
  });
});
