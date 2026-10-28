import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CompressorScreenDemo } from "./demo";
import { CompressorScreen } from "./index";

describe("compressorScreen", () => {
  it("渲染 7 个机器槽位与玩家背包", () => {
    const { container } = render(<CompressorScreen input={{}} output={{}} />);
    expect(container.querySelectorAll("[aria-label^=\"machine-\"]")).toHaveLength(7);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
  });

  it("压缩进度使用原版 triangle 贴图", () => {
    const { container } = render(<CompressorScreen progress={0.6} />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.6",
    );
    expect(container.querySelector("[data-ic2-progress]")).toHaveAttribute(
      "data-ic2-progress",
      "triangle",
    );
  });

  it("demo 渲染", () => {
    render(<CompressorScreenDemo />);
    expect(screen.getByText("压缩机")).toBeInTheDocument();
  });
});
