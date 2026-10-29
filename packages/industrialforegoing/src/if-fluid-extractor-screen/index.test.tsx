import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IfFluidExtractorScreen } from "./index";

describe("ifFluidExtractorScreen", () => {
  it("渲染配方与区域按钮", () => {
    const { container } = render(
      <IfFluidExtractorScreen area={{ particles: false, showArea: true }} fluid={{ max: 1, tint: "#ABABAB", value: 1 }} />,
    );
    expect(screen.getByText("液体提取机")).toBeInTheDocument();
    expect(container.querySelector("[data-if-tank=\"latex\"]")).not.toBeNull();
    expect(screen.getByRole("button", { name: "area" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "particle" })).toBeInTheDocument();
  });
});
