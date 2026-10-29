import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IfBioreactorScreen } from "./index";

describe("ifBioreactorScreen", () => {
  it("渲染 3×3 输入、双罐与效率条", () => {
    const { container } = render(<IfBioreactorScreen efficiency={0.5} progress={0.25} />);
    expect(screen.getByText("生物质炉")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"input-\"]")).toHaveLength(9);
    expect(container.querySelectorAll("[data-if-tank]")).toHaveLength(2);
    expect(container.querySelector("[aria-label=\"efficiency\"]")?.getAttribute("aria-valuenow")).toBe("50");
  });
});
