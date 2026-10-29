import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IfTankPanel } from "./index";

describe("ifTankPanel", () => {
  it("渲染桶槽与向下箭头进度", () => {
    const { container } = render(<IfTankPanel input={{ icon: "potion" }} progress={0.25} />);
    expect(screen.getByLabelText("fluid-input")).toBeInTheDocument();
    expect(screen.getByLabelText("fluid-output")).toBeInTheDocument();
    expect(container.querySelector("[data-if-progress]")?.getAttribute("aria-valuenow")).toBe("25");
    expect(container.querySelector("[data-if-progress-fill]")?.getAttribute("style")).toContain("inset(0 0 75% 0)");
  });
});
