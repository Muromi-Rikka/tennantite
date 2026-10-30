import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FermentorScreenDemo } from "./demo";
import { FermentorScreen } from "./index";

describe("fermentorScreen", () => {
  it("渲染 7 个机器槽位与 EU 表", () => {
    const { container } = render(
      <FermentorScreen energy={{ max: 2000, value: 1100 }} input={{}} output={{ count: 1 }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"machine-\"]")).toHaveLength(7);
    expect(screen.getByRole("progressbar", { name: "EU 能量" })).toHaveAttribute(
      "aria-valuenow",
      "1100",
    );
  });

  it("进度使用 arrow 贴图", () => {
    const { container } = render(<FermentorScreen progress={0.5} />);
    expect(container.querySelector("[data-ic2-progress]")).toHaveAttribute(
      "data-ic2-progress",
      "arrow",
    );
  });

  it("demo 渲染", () => {
    render(<FermentorScreenDemo />);
    expect(screen.getByText("发酵机")).toBeInTheDocument();
  });
});
