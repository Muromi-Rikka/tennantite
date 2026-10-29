import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { IfPotionBrewerScreen } from "./index";

describe("ifPotionBrewerScreen", () => {
  it("酿造输入 / 输出 / 水罐与向下箭头", () => {
    const { container } = render(
      <IfPotionBrewerScreen brewingInput={[{ icon: "wheat" }]} progress={0.5} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"brewingInput-\"]")).toHaveLength(6);
    expect(container.querySelectorAll("[aria-label^=\"output-\"]")).toHaveLength(3);
    expect(container.querySelector("[data-if-tank=\"water\"]")).not.toBeNull();
    expect(container.querySelector("[data-if-progress=\"arrow-down\"]")?.getAttribute("aria-valuenow")).toBe("50");
  });

  it("锁定按钮回调", () => {
    const onLockChange = vi.fn();
    render(<IfPotionBrewerScreen onLockChange={onLockChange} />);
    fireEvent.click(screen.getByRole("button", { name: "lock" }));
    expect(onLockChange).toHaveBeenCalledWith(true);
  });
});
