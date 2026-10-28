import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CompressorScreenDemo } from "./demo";
import { CompressorScreen } from "./index";

describe("compressorScreen", () => {
  it("渲染输入 / 输出槽位与玩家背包", () => {
    const { container } = render(<CompressorScreen input={{}} output={{}} />);
    expect(container.querySelectorAll("[aria-label^=\"machine-\"]").length).toBe(2);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("处理进度反映传入值", () => {
    render(<CompressorScreen progress={0.6} />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.6",
    );
  });

  it("demo 渲染", () => {
    render(<CompressorScreenDemo />);
    expect(screen.getByText("压缩机")).toBeInTheDocument();
  });
});
