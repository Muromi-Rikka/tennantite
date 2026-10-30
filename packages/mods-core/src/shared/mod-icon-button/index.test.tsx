import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModIconButton } from "./index";

describe("modIconButton", () => {
  it("icons 按 state 选择图标", () => {
    render(
      <ModIconButton icons={[<span data-testid="first" key="a" />, <span data-testid="second" key="b" />]} label="多态" state={1} />,
    );
    expect(screen.queryByTestId("first")).toBeNull();
    expect(screen.getByTestId("second")).toBeInTheDocument();
  });

  it("backgroundHover 使用 group-hover", () => {
    const { container } = render(
      <ModIconButton backgroundHover={<span />} label="悬停" />,
    );
    expect(container.querySelector(String.raw`.group-hover\:opacity-100`)).not.toBeNull();
    expect(container.querySelector(".group")).not.toBeNull();
  });

  it("越界 state 钳制到末项", () => {
    render(
      <ModIconButton icons={[<span data-testid="first" key="a" />, <span data-testid="second" key="b" />]} label="多态" state={9} />,
    );
    expect(screen.getByTestId("second")).toBeInTheDocument();
  });
});
