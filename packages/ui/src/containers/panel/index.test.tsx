import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoAxeViolations } from "../../testing/a11y";
import { PanelDemo } from "./demo";
import { Panel } from "./index";

describe("panel", () => {
  it("default 变体使用窗口纹理", () => {
    render(<Panel data-testid="panel">内容</Panel>);
    expect(screen.getByTestId("panel")).toHaveClass("mc-tex-panel");
  });

  it("dark 变体使用暗底纹理", () => {
    render(<Panel data-testid="panel" variant="dark">内容</Panel>);
    expect(screen.getByTestId("panel")).toHaveClass("mc-tex-panel-dark");
  });

  it("className 合并", () => {
    render(<Panel className="w-240" data-testid="panel">内容</Panel>);
    expect(screen.getByTestId("panel")).toHaveClass("w-240");
  });

  it("demo 渲染双变体", () => {
    render(<PanelDemo />);
    expect(document.querySelector(".mc-tex-panel")).not.toBeNull();
    expect(document.querySelector(".mc-tex-panel-dark")).not.toBeNull();
  });

  it("可访问性", async () => {
    const { container } = render(
      <Panel>
        <p>内容</p>
      </Panel>,
    );
    await expectNoAxeViolations(container);
  });
});
