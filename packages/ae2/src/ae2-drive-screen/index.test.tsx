import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2DriveScreenDemo } from "./demo";
import { Ae2DriveScreen } from "./index";

describe("ae2DriveScreen", () => {
  it("渲染 2×5 存储槽与玩家背包", () => {
    const { container } = render(<Ae2DriveScreen items={[{ icon: "diamond" }]} />);

    expect(container.querySelectorAll("[aria-label^=\"drive-\"]").length).toBe(10);
    expect(screen.getByLabelText("drive-0")).toHaveStyle({ left: gui(70), top: gui(13) });
    expect(screen.getByLabelText("drive-0")).toHaveClass("mc-tex-ae2-slot");
    expect(screen.getByLabelText("drive-9")).toHaveStyle({ left: gui(88), top: gui(85) });

    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("优先级标签与槽位回调", async () => {
    const user = userEvent.setup();
    const onPriority = vi.fn();
    const onSlotClick = vi.fn();
    render(
      <Ae2DriveScreen
        items={[{ icon: "diamond" }]}
        onPriority={onPriority}
        onSlotClick={onSlotClick}
      />,
    );

    await user.click(screen.getByRole("button", { name: "优先级" }));
    expect(onPriority).toHaveBeenCalledOnce();

    await user.click(screen.getByLabelText("drive-0"));
    expect(onSlotClick).toHaveBeenCalledWith(0, expect.objectContaining({ icon: "diamond" }));
  });

  it("demo 渲染", () => {
    render(<Ae2DriveScreenDemo />);
    expect(screen.getByText("ME 驱动器")).toBeInTheDocument();
  });
});
