import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProgressDemo } from "./demo";
import { Progress } from "./index";

describe("progress", () => {
  it("渲染确定进度并反映数值", () => {
    render(<Progress aria-label="经验值" value={62} />);
    const bar = screen.getByRole("progressbar", { name: "经验值" });
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("aria-valuenow", "62");
  });

  it("渲染不确定进度（无 aria-valuenow）", () => {
    render(<Progress aria-label="加载中" value={null} />);
    const bar = screen.getByRole("progressbar", { name: "加载中" });
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("应用变体纹理", () => {
    render(
      <>
        <Progress aria-label="boss" value={1} variant="boss" />
        <Progress aria-label="xp" value={1} />
      </>,
    );
    expect(
      screen.getByRole("progressbar", { name: "boss" }).querySelector(".mc-tex-boss-fill"),
    ).not.toBeNull();
    expect(
      screen.getByRole("progressbar", { name: "xp" }).querySelector(".mc-tex-xp-fill"),
    ).not.toBeNull();
  });

  it("轨道为原版 5 GUI px 高", () => {
    render(<Progress aria-label="经验值" value={50} />);
    const track = screen.getByRole("progressbar", { name: "经验值" }).querySelector(".mc-tex-xp-bg");
    expect(track).toHaveClass("h-5");
  });

  it("demo 渲染两个进度条", () => {
    render(<ProgressDemo />);
    expect(screen.getAllByRole("progressbar")).toHaveLength(2);
  });
});
