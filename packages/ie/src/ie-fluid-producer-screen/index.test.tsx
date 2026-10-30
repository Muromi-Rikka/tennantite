import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IeFluidProducerScreenDemo } from "../demos";
import { IeFluidProducerScreen } from "./index";

describe("ieFluidProducerScreen", () => {
  it("渲染 12 个槽位与玩家背包", () => {
    const { container } = render(
      <IeFluidProducerScreen cell={{}} grid={Array.from({ length: 9 }, () => ({}))} input={{}} output={{}} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"fluid-producer-\"]")).toHaveLength(12);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
  });

  // coords from fluid_producer.png pixel inspection (upstream <file> unavailable)
  it("槽位坐标取自贴图像素测量（网格内区 24,17 步距 19）", () => {
    render(<IeFluidProducerScreen grid={[{}]} />);
    expect(screen.getByLabelText("fluid-producer-grid-0").style.left).toBe("calc(var(--mc-gui) * 24)");
    expect(screen.getByLabelText("fluid-producer-grid-0").style.top).toBe("calc(var(--mc-gui) * 17)");
    expect(screen.getByLabelText("fluid-producer-grid-4").style.left).toBe("calc(var(--mc-gui) * 43)");
    expect(screen.getByLabelText("fluid-producer-grid-4").style.top).toBe("calc(var(--mc-gui) * 36)");
  });

  it("罐与能量表渲染", () => {
    render(<IeFluidProducerScreen energy={{ max: 32000, value: 17600 }} tank={{ max: 8000, tint: "#3a5cc8", value: 3200 }} />);
    expect(screen.getByRole("progressbar", { name: "流体泵站罐" })).toHaveAttribute("aria-valuenow", "40");
    expect(screen.getByRole("progressbar", { name: "流体泵站能量" })).toHaveAttribute("aria-valuenow", "55");
  });

  it("demo 渲染", () => {
    render(<IeFluidProducerScreenDemo />);
    expect(screen.getByText("流体泵站")).toBeInTheDocument();
  });
});
