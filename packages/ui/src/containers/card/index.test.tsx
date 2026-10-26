import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoAxeViolations } from "../../testing/a11y";
import { CardDemo } from "./demo";
import { Card } from "./index";

describe("card", () => {
  it("渲染标题与内容", () => {
    render(<Card title="合成">内容</Card>);
    expect(screen.getByText("合成")).toBeInTheDocument();
    expect(screen.getByText("内容")).toBeInTheDocument();
  });

  it("无标题时不渲染 TitleBar", () => {
    render(<Card>内容</Card>);
    expect(screen.queryByText("undefined")).toBeNull();
  });

  it("demo 渲染", () => {
    render(<CardDemo />);
    expect(screen.getByText("合成")).toBeInTheDocument();
  });

  it("可访问性", async () => {
    const { container } = render(<Card title="箱子">内容</Card>);
    await expectNoAxeViolations(container);
  });
});
