import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BossBarDemo } from "./demo";
import { BossBar } from "./index";

describe("bossBar", () => {
  it("渲染名称与进度条", () => {
    render(<BossBar name="凋灵" value={0.75} />);
    expect(screen.getByText("凋灵")).toBeInTheDocument();
    expect(
      screen.getByRole("progressbar", { name: "Boss：凋灵" }),
    ).toHaveAttribute("aria-valuenow", "0.75");
  });

  it("value 越界被钳制", () => {
    render(<BossBar name="凋灵" value={-1} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("demo 渲染两个 Boss", () => {
    render(<BossBarDemo />);
    expect(screen.getByText("末影龙")).toBeInTheDocument();
  });
});
