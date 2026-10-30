import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2PatternAccessTerminalScreenDemo } from "./demo";
import { Ae2PatternAccessTerminalScreen } from "./index";

describe("ae2PatternAccessTerminalScreen", () => {
  it("渲染 CPU 行、滚动条与选中高亮", () => {
    const { container } = render(
      <Ae2PatternAccessTerminalScreen
        cpus={[
          { detail: "存储: 2,034", id: "cpu-0", name: "主 CPU" },
          { detail: "空闲", id: "cpu-1", name: "备用 CPU" },
        ]}
        selectedId="cpu-0"
      />,
    );

    // 行块 67×23，起点 (9,19)
    const row = screen.getByLabelText("主 CPU");
    expect(row).toHaveStyle({
      height: gui(23),
      left: gui(9),
      top: gui(19),
      width: gui(67),
    });
    expect(row).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText("备用 CPU")).toHaveAttribute("aria-pressed", "false");
    // 第 6 行起点 y = 19 + 5·23
    expect(screen.getByText("存储: 2,034")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-mod-sprite]").length).toBeGreaterThan(0);
  });

  it("行点击回调", async () => {
    const user = userEvent.setup();
    const onCpuClick = vi.fn();
    render(
      <Ae2PatternAccessTerminalScreen cpus={[{ id: "cpu-0", name: "主 CPU" }]} onCpuClick={onCpuClick} />,
    );

    await user.click(screen.getByLabelText("主 CPU"));
    expect(onCpuClick).toHaveBeenCalledWith("cpu-0");
  });

  it("demo 渲染", () => {
    render(<Ae2PatternAccessTerminalScreenDemo />);
    expect(screen.getByText("主 CPU")).toBeInTheDocument();
  });
});
