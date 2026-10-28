import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExtractorScreenDemo } from "./demo";
import { ExtractorScreen } from "./index";

describe("extractorScreen", () => {
  it("渲染输入 / 输出槽位与玩家背包", () => {
    const { container } = render(<ExtractorScreen input={{}} output={{ count: 3 }} />);
    expect(container.querySelectorAll("[aria-label^=\"machine-\"]").length).toBe(2);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("处理进度反映传入值", () => {
    render(<ExtractorScreen progress={0.3} />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.3",
    );
  });

  it("demo 渲染", () => {
    render(<ExtractorScreenDemo />);
    expect(screen.getByText("提取机")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
