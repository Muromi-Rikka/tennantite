import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExperienceBarDemo } from "./demo";
import { ExperienceBar } from "./index";

describe("experienceBar", () => {
  it("渲染等级数字与进度条", () => {
    render(<ExperienceBar level={30} progress={0.62} />);
    expect(screen.getByText("30")).toBeInTheDocument();
    const bar = screen.getByRole("progressbar", { name: "经验：等级 30" });
    expect(bar).toHaveAttribute("aria-valuenow", "0.62");
  });

  it("progress 越界值被钳制", () => {
    render(<ExperienceBar level={5} progress={1.5} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
  });

  it("demo 渲染", () => {
    render(<ExperienceBarDemo />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
