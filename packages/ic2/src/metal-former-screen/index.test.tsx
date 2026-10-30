import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MetalFormerScreenDemo } from "./demo";
import { MetalFormerScreen } from "./index";

describe("metalFormerScreen", () => {
  it("输入与放电槽落在左列（metal_former.xml）", () => {
    const { container } = render(
      <MetalFormerScreen energy={{ max: 2000, value: 1400 }} input={{}} output={{ count: 2 }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"machine-\"]")).toHaveLength(7);
    const input = screen.getByLabelText("machine-input");
    expect(input.style.left).toBe("calc(var(--mc-gui) * 16)");
    const discharge = screen.getByLabelText("machine-discharge");
    expect(discharge.style.left).toBe("calc(var(--mc-gui) * 16)");
    expect(screen.getByRole("progressbar", { name: "EU 能量" })).toBeInTheDocument();
  });

  it("进度使用 arrow 贴图并落在 xml 原点", () => {
    const { container } = render(<MetalFormerScreen progress={0.6} />);
    expect(container.querySelector("[data-ic2-progress]")).toHaveAttribute(
      "data-ic2-progress",
      "arrow",
    );
  });

  it("children 注入模式按钮", () => {
    render(
      <MetalFormerScreen title="金属成型机">
        <button aria-label="模式：滚压" type="button" />
        <button aria-label="模式：挤压" type="button" />
        <button aria-label="模式：造板" type="button" />
      </MetalFormerScreen>,
    );
    expect(screen.getByLabelText("模式：滚压")).toBeInTheDocument();
    expect(screen.getByLabelText("模式：挤压")).toBeInTheDocument();
    expect(screen.getByLabelText("模式：造板")).toBeInTheDocument();
  });

  it("demo 渲染", () => {
    render(<MetalFormerScreenDemo />);
    expect(screen.getByText("金属成型机")).toBeInTheDocument();
  });
});
