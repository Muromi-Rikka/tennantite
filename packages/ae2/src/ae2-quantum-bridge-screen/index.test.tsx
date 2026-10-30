import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2QuantumBridgeScreenDemo } from "./demo";
import { Ae2QuantumBridgeScreen } from "./index";

describe("ae2QuantumBridgeScreen", () => {
  it("渲染奇点槽与量子卡槽", () => {
    const { container } = render(
      <Ae2QuantumBridgeScreen card={{ icon: "emerald" }} singularity={{ icon: "diamond" }} />,
    );

    expect(screen.getByLabelText("qnb-singularity")).toHaveStyle({
      left: gui(80),
      top: gui(37),
    });
    expect(screen.getByLabelText("qnb-card")).toHaveStyle({
      left: gui(80),
      top: gui(55),
    });

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(83) });
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(141) });
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("未放奇点时隐藏量子卡槽", () => {
    render(<Ae2QuantumBridgeScreen cardEnabled={false} />);
    expect(screen.queryByLabelText("qnb-card")).not.toBeInTheDocument();
  });

  it("奇点槽回调", async () => {
    const user = userEvent.setup();
    const onSingularityClick = vi.fn();
    render(
      <Ae2QuantumBridgeScreen
        onSingularityClick={onSingularityClick}
        singularity={{ icon: "diamond" }}
      />,
    );

    await user.click(screen.getByLabelText("qnb-singularity"));
    expect(onSingularityClick).toHaveBeenCalledWith(expect.objectContaining({ icon: "diamond" }));
  });

  it("demo 渲染", () => {
    render(<Ae2QuantumBridgeScreenDemo />);
    expect(screen.getByText("量子链接仓")).toBeInTheDocument();
  });
});
