import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoAxeViolations } from "../../testing/a11y";
import { ScreenPanel } from "./index";

describe("screenPanel", () => {
  it("按 GUI px 折算宽高并渲染标题", () => {
    render(
      <ScreenPanel data-testid="panel" height={166} title="物品栏" width={176}>
        <span>内容</span>
      </ScreenPanel>,
    );
    const panel = screen.getByTestId("panel");
    expect(panel).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 176)"));
    expect(panel).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 166)"));
    expect(screen.getByText("物品栏")).toBeInTheDocument();
    expect(screen.getByText("内容")).toBeInTheDocument();
  });

  it("面板纹理层不参与可访问性树", () => {
    const { container } = render(<ScreenPanel height={166} width={176} />);
    expect(container.querySelector(".mc-tex-panel")).toHaveAttribute("aria-hidden", "true");
  });

  it("可访问性", async () => {
    const { container } = render(
      <ScreenPanel height={166} title="物品栏" width={176}>
        <span>内容</span>
      </ScreenPanel>,
    );
    await expectNoAxeViolations(container);
  });
});
