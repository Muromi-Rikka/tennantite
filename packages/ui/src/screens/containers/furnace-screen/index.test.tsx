import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FurnaceScreenDemo } from "./demo";
import { FurnaceScreen } from "./index";

describe("furnaceScreen", () => {
  it("渲染 3 个槽位与 2 条进度", () => {
    const { container } = render(
      <FurnaceScreen
        burnProgress={0.5}
        cookProgress={0.5}
        fuel={{ count: 3 }}
        input={{}}
        output={{ count: 2 }}
      />,
    );
    expect(container.querySelectorAll(".mc-tex-slot[aria-label]").length).toBe(3);
    expect(screen.getAllByRole("progressbar").length).toBe(2);
  });

  it("产物槽位点击回调", async () => {
    const user = userEvent.setup();
    const onTakeOutput = vi.fn();
    render(<FurnaceScreen onTakeOutput={onTakeOutput} output={{ count: 1 }} />);
    await user.click(screen.getByLabelText("furnace-output"));
    expect(onTakeOutput).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<FurnaceScreenDemo />);
    expect(screen.getByText("熔炉")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
