import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExtractorScreenDemo } from "./demo";
import { ExtractorScreen } from "./index";

describe("extractorScreen", () => {
  it("渲染 7 个机器槽位与玩家背包", () => {
    const { container } = render(
      <ExtractorScreen energy={{ max: 2000, value: 600 }} input={{}} output={{ count: 3 }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"machine-\"]")).toHaveLength(7);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(screen.getByRole("progressbar", { name: "EU 能量" })).toHaveAttribute(
      "aria-valuenow",
      "600",
    );
  });

  it("滴落进度使用原版 drop 贴图", () => {
    const { container } = render(<ExtractorScreen progress={0.3} />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.3",
    );
    expect(container.querySelector("[data-ic2-progress]")).toHaveAttribute(
      "data-ic2-progress",
      "drop",
    );
  });

  it("demo 渲染", () => {
    render(<ExtractorScreenDemo />);
    expect(screen.getByText("提取机")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
