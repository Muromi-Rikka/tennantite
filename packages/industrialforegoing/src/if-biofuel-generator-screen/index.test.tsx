import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IfBiofuelGeneratorScreen } from "./index";

describe("ifBiofuelGeneratorScreen", () => {
  it("渲染燃油罐与青色燃烧条", () => {
    const { container } = render(<IfBiofuelGeneratorScreen burn={0.5} />);
    expect(screen.getByText("生物燃油发电机")).toBeInTheDocument();
    expect(container.querySelector("[data-if-tank=\"biofuel\"]")).not.toBeNull();
    expect(container.querySelector("[data-if-progress=\"vertical\"]")?.getAttribute("aria-valuenow")).toBe("50");
  });
});
